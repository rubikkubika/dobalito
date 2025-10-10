package com.dobalito.config;

import com.dobalito.entity.User;
import com.dobalito.service.PhoneVerificationService;
import com.dobalito.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * AuthenticationProvider для авторизации по номеру телефона
 */
@Component
public class PhoneAuthenticationProvider implements AuthenticationProvider {
    
    @Autowired
    private PhoneVerificationService phoneVerificationService;
    
    @Autowired
    private UserService userService;
    
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        if (!(authentication instanceof PhoneAuthenticationToken)) {
            return null;
        }
        
        PhoneAuthenticationToken phoneToken = (PhoneAuthenticationToken) authentication;
        String phone = phoneToken.getPhone();
        String code = phoneToken.getCode();
        String name = phoneToken.getName();
        
        try {
            // Проверяем код верификации
            boolean isValidCode = phoneVerificationService.verifyCode(phone, code);
            
            if (!isValidCode) {
                throw new BadCredentialsException("Неверный или истекший код верификации");
            }
            
            // Создаем или обновляем пользователя
            User user = userService.createOrUpdateUserByPhone(phone, name);
            
            // Создаем authorities (пока просто ROLE_USER)
            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
            
            // Создаем аутентифицированный токен
            PhoneAuthenticationToken authenticatedToken = new PhoneAuthenticationToken(
                phone, code, name, authorities
            );
            
            // Устанавливаем детали аутентификации
            authenticatedToken.setDetails(user);
            
            return authenticatedToken;
            
        } catch (Exception e) {
            throw new BadCredentialsException("Ошибка аутентификации: " + e.getMessage());
        }
    }
    
    @Override
    public boolean supports(Class<?> authentication) {
        return PhoneAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
