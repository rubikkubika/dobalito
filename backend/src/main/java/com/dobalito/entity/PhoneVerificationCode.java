package com.dobalito.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "phone_verification_codes")
public class PhoneVerificationCode {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "phone", nullable = false, length = 20)
    private String phone;
    
    @Column(name = "code", nullable = false, length = 6)
    private String code;
    
    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;
    
    @Column(name = "is_used", nullable = false)
    private Boolean isUsed = false;
    
    @Column(name = "attempts", nullable = false)
    private Integer attempts = 0;
    
    // Constructors
    public PhoneVerificationCode() {
        this.createdAt = LocalDateTime.now();
        this.isUsed = false;
        this.attempts = 0;
    }
    
    public PhoneVerificationCode(String phone, String code) {
        this();
        this.phone = phone;
        this.code = code;
        this.expiresAt = LocalDateTime.now().plusMinutes(10); // Код действует 10 минут
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
    
    public String getCode() {
        return code;
    }
    
    public void setCode(String code) {
        this.code = code;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getExpiresAt() {
        return expiresAt;
    }
    
    public void setExpiresAt(LocalDateTime expiresAt) {
        this.expiresAt = expiresAt;
    }
    
    public Boolean getIsUsed() {
        return isUsed;
    }
    
    public void setIsUsed(Boolean isUsed) {
        this.isUsed = isUsed;
    }
    
    public Integer getAttempts() {
        return attempts;
    }
    
    public void setAttempts(Integer attempts) {
        this.attempts = attempts;
    }
    
    // Helper methods
    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiresAt);
    }
    
    public void incrementAttempts() {
        this.attempts++;
    }
    
    public boolean isValid() {
        return !isUsed && !isExpired() && attempts < 3; // Максимум 3 попытки
    }
    
    @Override
    public String toString() {
        return "PhoneVerificationCode{" +
                "id=" + id +
                ", phone='" + phone + '\'' +
                ", code='" + code + '\'' +
                ", createdAt=" + createdAt +
                ", expiresAt=" + expiresAt +
                ", isUsed=" + isUsed +
                ", attempts=" + attempts +
                '}';
    }
}
