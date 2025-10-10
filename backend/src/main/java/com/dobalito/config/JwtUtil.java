package com.dobalito.config;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {
    
    @Value("${jwt.secret:dobalito-secret-key-for-jwt-token-generation}")
    private String secret;
    
    @Value("${jwt.expiration:86400000}") // 24 часа по умолчанию
    private Long expiration;
    
    private SecretKey getSigningKey() {
        return Keys.hmacShaKeyFor(secret.getBytes());
    }
    
    /**
     * Генерирует JWT токен для пользователя
     */
    public String generateToken(String phone, Long userId, String name) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("phone", phone);
        claims.put("userId", userId);
        claims.put("name", name);
        claims.put("type", "phone_auth");
        
        return createToken(claims, phone);
    }
    
    /**
     * Создает JWT токен с claims
     */
    private String createToken(Map<String, Object> claims, String subject) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + expiration);
        
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
    
    /**
     * Извлекает username (phone) из токена
     */
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }
    
    /**
     * Извлекает userId из токена
     */
    public Long getUserIdFromToken(String token) {
        return getClaimFromToken(token, claims -> claims.get("userId", Long.class));
    }
    
    /**
     * Извлекает имя пользователя из токена
     */
    public String getNameFromToken(String token) {
        return getClaimFromToken(token, claims -> claims.get("name", String.class));
    }
    
    /**
     * Извлекает дату истечения токена
     */
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }
    
    /**
     * Извлекает claim из токена
     */
    public <T> T getClaimFromToken(String token, ClaimsResolver<T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.resolve(claims);
    }
    
    /**
     * Извлекает все claims из токена
     */
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    /**
     * Проверяет, истек ли токен
     */
    public Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }
    
    /**
     * Валидирует токен
     */
    public Boolean validateToken(String token, String phone) {
        try {
            final String tokenPhone = getUsernameFromToken(token);
            return (tokenPhone.equals(phone) && !isTokenExpired(token));
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    /**
     * Проверяет валидность токена без проверки subject
     */
    public Boolean validateToken(String token) {
        try {
            return !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }
    
    /**
     * Интерфейс для извлечения claims
     */
    @FunctionalInterface
    public interface ClaimsResolver<T> {
        T resolve(Claims claims);
    }
}
