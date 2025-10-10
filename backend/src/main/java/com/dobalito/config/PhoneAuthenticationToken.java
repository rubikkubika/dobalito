package com.dobalito.config;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * Authentication token для авторизации по номеру телефона
 */
public class PhoneAuthenticationToken extends AbstractAuthenticationToken {
    
    private final String phone;
    private final String code;
    private final String name; // Опционально для регистрации
    
    /**
     * Конструктор для аутентификации (до проверки кода)
     */
    public PhoneAuthenticationToken(String phone, String code, String name) {
        super(null);
        this.phone = phone;
        this.code = code;
        this.name = name;
        setAuthenticated(false);
    }
    
    /**
     * Конструктор для аутентифицированного пользователя
     */
    public PhoneAuthenticationToken(String phone, String code, String name, 
                                  Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.phone = phone;
        this.code = code;
        this.name = name;
        setAuthenticated(true);
    }
    
    @Override
    public Object getCredentials() {
        return code;
    }
    
    @Override
    public Object getPrincipal() {
        return phone;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public String getCode() {
        return code;
    }
    
    public String getName() {
        return name;
    }
}
