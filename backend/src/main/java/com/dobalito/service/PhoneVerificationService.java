package com.dobalito.service;

import com.dobalito.entity.PhoneVerificationCode;
import com.dobalito.repository.PhoneVerificationCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class PhoneVerificationService {
    
    @Autowired
    private PhoneVerificationCodeRepository codeRepository;
    
    private static final int CODE_LENGTH = 6;
    private static final int CODE_EXPIRY_MINUTES = 10;
    private static final int MAX_ATTEMPTS_PER_HOUR = 5;
    
    /**
     * Генерирует и сохраняет код верификации для номера телефона
     */
    public PhoneVerificationCode generateVerificationCode(String phone) {
        // Проверяем лимит попыток за час
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        Long attemptsInLastHour = codeRepository.countAttemptsInLastHour(phone, oneHourAgo);
        
        if (attemptsInLastHour >= MAX_ATTEMPTS_PER_HOUR) {
            throw new RuntimeException("Превышен лимит попыток. Попробуйте позже.");
        }
        
        // Деактивируем предыдущие коды для этого номера
        deactivatePreviousCodes(phone);
        
        // Генерируем новый код
        String code = generateRandomCode();
        
        // Создаем и сохраняем код
        PhoneVerificationCode verificationCode = new PhoneVerificationCode(phone, code);
        verificationCode.setExpiresAt(LocalDateTime.now().plusMinutes(CODE_EXPIRY_MINUTES));
        
        return codeRepository.save(verificationCode);
    }
    
    /**
     * Проверяет код верификации
     */
    public boolean verifyCode(String phone, String code) {
        LocalDateTime now = LocalDateTime.now();
        Optional<PhoneVerificationCode> codeOptional = codeRepository.findByPhoneAndCode(phone, code, now);
        
        if (codeOptional.isEmpty()) {
            return false;
        }
        
        PhoneVerificationCode verificationCode = codeOptional.get();
        
        // Проверяем валидность кода
        if (!verificationCode.isValid()) {
            // Увеличиваем счетчик попыток
            verificationCode.incrementAttempts();
            codeRepository.save(verificationCode);
            return false;
        }
        
        // Помечаем код как использованный
        verificationCode.setIsUsed(true);
        codeRepository.save(verificationCode);
        
        return true;
    }
    
    /**
     * Проверяет, есть ли активный код для номера телефона
     */
    public boolean hasActiveCode(String phone) {
        LocalDateTime now = LocalDateTime.now();
        Optional<PhoneVerificationCode> activeCode = codeRepository.findActiveCodeByPhone(phone, now);
        return activeCode.isPresent();
    }
    
    /**
     * Получает активный код для номера телефона
     */
    public Optional<PhoneVerificationCode> getActiveCode(String phone) {
        LocalDateTime now = LocalDateTime.now();
        return codeRepository.findActiveCodeByPhone(phone, now);
    }
    
    /**
     * Очищает истекшие коды
     */
    public void cleanupExpiredCodes() {
        LocalDateTime now = LocalDateTime.now();
        codeRepository.deleteExpiredCodes(now);
    }
    
    /**
     * Генерирует случайный 6-значный код
     */
    private String generateRandomCode() {
        Random random = new Random();
        StringBuilder code = new StringBuilder();
        
        for (int i = 0; i < CODE_LENGTH; i++) {
            code.append(random.nextInt(10));
        }
        
        return code.toString();
    }
    
    /**
     * Деактивирует предыдущие коды для номера телефона
     */
    private void deactivatePreviousCodes(String phone) {
        List<PhoneVerificationCode> previousCodes = codeRepository.findByPhoneOrderByCreatedAtDesc(phone);
        
        for (PhoneVerificationCode code : previousCodes) {
            if (!code.getIsUsed()) {
                code.setIsUsed(true);
                codeRepository.save(code);
            }
        }
    }
    
    /**
     * Проверяет формат номера телефона
     */
    public boolean isValidPhoneFormat(String phone) {
        if (phone == null || phone.trim().isEmpty()) {
            return false;
        }
        
        // Убираем все нецифровые символы
        String cleanPhone = phone.replaceAll("[^0-9]", "");
        
        // Проверяем длину (от 10 до 15 цифр)
        return cleanPhone.length() >= 10 && cleanPhone.length() <= 15;
    }
    
    /**
     * Нормализует номер телефона (убирает все символы кроме цифр)
     */
    public String normalizePhone(String phone) {
        if (phone == null) {
            return null;
        }
        return phone.replaceAll("[^0-9]", "");
    }
}
