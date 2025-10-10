package com.dobalito.repository;

import com.dobalito.entity.PhoneVerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface PhoneVerificationCodeRepository extends JpaRepository<PhoneVerificationCode, Long> {
    
    /**
     * Найти активный код по номеру телефона
     */
    @Query("SELECT pvc FROM PhoneVerificationCode pvc WHERE pvc.phone = :phone AND pvc.isUsed = false AND pvc.expiresAt > :now AND pvc.attempts < 3 ORDER BY pvc.createdAt DESC")
    Optional<PhoneVerificationCode> findActiveCodeByPhone(@Param("phone") String phone, @Param("now") LocalDateTime now);
    
    /**
     * Найти код по номеру телефона и самому коду
     */
    @Query("SELECT pvc FROM PhoneVerificationCode pvc WHERE pvc.phone = :phone AND pvc.code = :code AND pvc.isUsed = false AND pvc.expiresAt > :now AND pvc.attempts < 3")
    Optional<PhoneVerificationCode> findByPhoneAndCode(@Param("phone") String phone, @Param("code") String code, @Param("now") LocalDateTime now);
    
    /**
     * Найти все коды для номера телефона (для очистки старых)
     */
    List<PhoneVerificationCode> findByPhoneOrderByCreatedAtDesc(String phone);
    
    /**
     * Удалить истекшие коды
     */
    @Query("DELETE FROM PhoneVerificationCode pvc WHERE pvc.expiresAt < :now")
    void deleteExpiredCodes(@Param("now") LocalDateTime now);
    
    /**
     * Подсчитать количество попыток за последний час
     */
    @Query("SELECT COUNT(pvc) FROM PhoneVerificationCode pvc WHERE pvc.phone = :phone AND pvc.createdAt > :oneHourAgo")
    Long countAttemptsInLastHour(@Param("phone") String phone, @Param("oneHourAgo") LocalDateTime oneHourAgo);
}
