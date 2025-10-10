package com.dobalito.service;

import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class SmsService {
    
    private static final Logger logger = LoggerFactory.getLogger(SmsService.class);
    
    /**
     * Отправляет SMS с кодом верификации
     * Пока это имитация - в реальности здесь будет вызов внешнего API
     */
    public boolean sendVerificationCode(String phone, String code) {
        try {
            // Имитация отправки SMS
            logger.info("=== SMS ОТПРАВКА (ИМИТАЦИЯ) ===");
            logger.info("Номер телефона: {}", phone);
            logger.info("Код верификации: {}", code);
            logger.info("Сообщение: Ваш код для входа в doBalito: {}", code);
            logger.info("Код действителен 10 минут");
            logger.info("================================");
            
            // Имитируем задержку отправки
            Thread.sleep(100);
            
            // В реальности здесь будет:
            // 1. Вызов внешнего SMS API
            // 2. Обработка ответа
            // 3. Логирование результата
            
            return true;
            
        } catch (Exception e) {
            logger.error("Ошибка при отправке SMS на номер {}: {}", phone, e.getMessage());
            return false;
        }
    }
    
    /**
     * Проверяет доступность SMS сервиса
     */
    public boolean isServiceAvailable() {
        // Имитация проверки доступности сервиса
        return true;
    }
    
    /**
     * Получает статус последней отправки SMS
     */
    public String getLastSmsStatus(String phone) {
        // Имитация получения статуса
        return "delivered";
    }
    
    /**
     * В будущем здесь будет реальная интеграция с SMS API
     * Пример структуры для будущей реализации:
     */
    /*
    public boolean sendSmsViaApi(String phone, String message) {
        try {
            // Создание HTTP клиента
            RestTemplate restTemplate = new RestTemplate();
            
            // Подготовка запроса
            SmsRequest request = new SmsRequest();
            request.setPhone(phone);
            request.setMessage(message);
            request.setApiKey(smsApiKey);
            
            // Отправка запроса
            ResponseEntity<SmsResponse> response = restTemplate.postForEntity(
                smsApiUrl, 
                request, 
                SmsResponse.class
            );
            
            // Обработка ответа
            return response.getStatusCode().is2xxSuccessful() && 
                   response.getBody().isSuccess();
                   
        } catch (Exception e) {
            logger.error("Ошибка отправки SMS через API: {}", e.getMessage());
            return false;
        }
    }
    */
}
