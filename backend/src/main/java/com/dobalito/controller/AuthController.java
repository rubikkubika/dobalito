package com.dobalito.controller;

import com.dobalito.config.JwtUtil;
import com.dobalito.config.PhoneAuthenticationToken;
import com.dobalito.entity.User;
import com.dobalito.service.UserService;
import com.dobalito.service.PhoneVerificationService;
import com.dobalito.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PhoneVerificationService phoneVerificationService;
    
    @Autowired
    private SmsService smsService;
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    private final ObjectMapper objectMapper = new ObjectMapper();
    
    /**
     * Тестовый endpoint
     */
    @GetMapping("/test")
    public ResponseEntity<?> test() {
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "AuthController работает"
        ));
    }
    
    /**
     * Тестовый endpoint для JSON
     */
    @PostMapping("/test-json")
    public ResponseEntity<?> testJson(@RequestBody String data) {
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "JSON работает",
            "received", data
        ));
    }
    
    /**
     * Простой тестовый endpoint без JSON
     */
    @PostMapping("/test-simple")
    public ResponseEntity<?> testSimple() {
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Простой POST работает"
        ));
    }
    
    /**
     * Тестовый endpoint для проверки верификации кода
     */
    @PostMapping("/test-verify")
    public ResponseEntity<?> testVerify(@RequestParam String phone, @RequestParam String code, @RequestParam(required = false) String name) {
        try {
            // Нормализуем номер телефона
            String normalizedPhone = phoneVerificationService.normalizePhone(phone);
            
            // Проверяем код
            boolean isValidCode = phoneVerificationService.verifyCode(normalizedPhone, code);
            
            if (!isValidCode) {
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Неверный или истекший код"
                ));
            }
            
            // Создаем или обновляем пользователя
            User user = userService.createOrUpdateUserByPhone(normalizedPhone, name);
            
            // Возвращаем данные пользователя
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Успешная авторизация");
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "phone", user.getPhone(),
                "email", user.getEmail(),
                "avatar", user.getAvatar() != null ? user.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Простой тест логина
     */
    @PostMapping("/simple-login")
    public ResponseEntity<?> simpleLogin(@RequestParam String email, @RequestParam String password) {
        try {
            // Находим пользователя по email
            Optional<User> userOptional = userService.getUserByEmail(email);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Пользователь не найден"
                ));
            }
            
            User user = userOptional.get();
            
            // Проверяем пароль
            if (!user.getPassword().equals(password)) {
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Неверный пароль"
                ));
            }
            
            // Возвращаем данные пользователя (без пароля)
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Успешная авторизация");
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "avatar", user.getAvatar() != null ? user.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Авторизация пользователя через form-data
     */
    @PostMapping("/login-form")
    public ResponseEntity<?> loginForm(@RequestParam String email, @RequestParam String password) {
        try {
            // Находим пользователя по email
            Optional<User> userOptional = userService.getUserByEmail(email);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Пользователь не найден"
                ));
            }
            
            User user = userOptional.get();
            
            // Проверяем пароль
            if (!user.getPassword().equals(password)) {
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Неверный пароль"
                ));
            }
            
            // Возвращаем данные пользователя (без пароля)
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Успешная авторизация");
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "avatar", user.getAvatar() != null ? user.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Регистрация нового пользователя
     */
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {
        try {
            // Проверяем, существует ли пользователь с таким email
            if (userService.getUserByEmail(registerRequest.getEmail()).isPresent()) {
                return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Пользователь с таким email уже существует"
                ));
            }
            
            // Создаем нового пользователя
            User newUser = new User(
                registerRequest.getName(),
                registerRequest.getEmail(),
                registerRequest.getPassword()
            );
            
            User savedUser = userService.createUser(newUser);
            
            // Возвращаем данные пользователя (без пароля)
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Пользователь успешно зарегистрирован");
            response.put("user", Map.of(
                "id", savedUser.getId(),
                "name", savedUser.getName(),
                "email", savedUser.getEmail(),
                "avatar", savedUser.getAvatar() != null ? savedUser.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Получение текущего пользователя (требует JWT токен)
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            
            if (authentication == null || !authentication.isAuthenticated()) {
                return ResponseEntity.status(401).body(Map.of(
                    "success", false,
                    "message", "Пользователь не аутентифицирован"
                ));
            }
            
            User user = (User) authentication.getPrincipal();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "phone", user.getPhone(),
                "email", user.getEmail(),
                "avatar", user.getAvatar() != null ? user.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Получение текущего пользователя по email (legacy endpoint)
     */
    @GetMapping("/me-by-email")
    public ResponseEntity<?> getCurrentUserByEmail(@RequestParam String email) {
        try {
            Optional<User> userOptional = userService.getUserByEmail(email);
            
            if (userOptional.isEmpty()) {
                return ResponseEntity.status(404).body(Map.of(
                    "success", false,
                    "message", "Пользователь не найден"
                ));
            }
            
            User user = userOptional.get();
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "avatar", user.getAvatar() != null ? user.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Выход из системы
     */
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // Очищаем JWT cookie
        Cookie jwtCookie = new Cookie("jwt_token", "");
        jwtCookie.setHttpOnly(true);
        jwtCookie.setSecure(false);
        jwtCookie.setPath("/");
        jwtCookie.setMaxAge(0); // Удаляем cookie
        response.addCookie(jwtCookie);
        
        logger.info("=== ВЫХОД ИЗ СИСТЕМЫ ===");
        logger.info("JWT cookie очищен");
        logger.info("=====================");
        
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "Успешный выход из системы"
        ));
    }
    
    /**
     * Отправка кода верификации на номер телефона
     */
    @PostMapping("/send-verification-code")
    public ResponseEntity<?> sendVerificationCode(@RequestBody String phoneJson) {
        try {
            // Парсим JSON
            Map<String, String> request = objectMapper.readValue(phoneJson, Map.class);
            String phone = request.get("phone");
            
            if (phone == null || phone.trim().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Номер телефона обязателен"
                ));
            }
            
            // Нормализуем номер телефона
            String normalizedPhone = phoneVerificationService.normalizePhone(phone);
            
            // Проверяем формат номера
            if (!phoneVerificationService.isValidPhoneFormat(normalizedPhone)) {
                return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Неверный формат номера телефона"
                ));
            }
            
            // Генерируем код верификации
            var verificationCode = phoneVerificationService.generateVerificationCode(normalizedPhone);
            
            // Для тестирования возвращаем код в ответе
            logger.info("=== ТЕСТОВЫЙ РЕЖИМ ===");
            logger.info("Номер телефона: {}", normalizedPhone);
            logger.info("Код верификации: {}", verificationCode.getCode());
            logger.info("Код действителен до: {}", verificationCode.getExpiresAt());
            logger.info("===================");
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Код верификации отправлен на номер " + normalizedPhone,
                "phone", normalizedPhone,
                "code", verificationCode.getCode(), // Возвращаем код для тестирования
                "expiresAt", verificationCode.getExpiresAt(),
                "expiresInMinutes", 10
            ));
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Верификация кода и авторизация пользователя через Spring Security
     */
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody String verifyJson, HttpServletResponse response) {
        try {
            // Парсим JSON
            Map<String, String> request = objectMapper.readValue(verifyJson, Map.class);
            String phone = request.get("phone");
            String code = request.get("code");
            String name = request.get("name"); // Опционально для регистрации
            
            if (phone == null || phone.trim().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Номер телефона обязателен"
                ));
            }
            
            if (code == null || code.trim().isEmpty()) {
                return ResponseEntity.status(400).body(Map.of(
                    "success", false,
                    "message", "Код верификации обязателен"
                ));
            }
            
            // Нормализуем номер телефона
            String normalizedPhone = phoneVerificationService.normalizePhone(phone);
            
            // Создаем PhoneAuthenticationToken
            PhoneAuthenticationToken authToken = new PhoneAuthenticationToken(normalizedPhone, code, name);
            
            // Аутентифицируем через Spring Security
            Authentication authentication = authenticationManager.authenticate(authToken);
            
            // Получаем пользователя из деталей аутентификации
            User user = (User) authentication.getDetails();
            
            // Генерируем JWT токен
            String jwtToken = jwtUtil.generateToken(normalizedPhone, user.getId(), user.getName());
            
            // Устанавливаем HttpOnly cookie
            Cookie jwtCookie = new Cookie("jwt_token", jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setSecure(false); // false для localhost, true для HTTPS в продакшене
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge(30); // 30 секунд для тестирования
            response.addCookie(jwtCookie);
            
            logger.info("=== УСПЕШНАЯ АВТОРИЗАЦИЯ ===");
            logger.info("Пользователь: {} ({})", user.getName(), normalizedPhone);
            logger.info("JWT токен установлен в HttpOnly cookie");
            logger.info("=============================");
            
            // Возвращаем данные пользователя БЕЗ токена в JSON
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("success", true);
            responseBody.put("message", "Успешная авторизация");
            responseBody.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "phone", user.getPhone(),
                "email", user.getEmail(),
                "avatar", user.getAvatar() != null ? user.getAvatar() : ""
            ));
            
            return ResponseEntity.ok(responseBody);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(401).body(Map.of(
                "success", false,
                "message", "Ошибка авторизации: " + e.getMessage()
            ));
        }
    }
    
    /**
     * Проверка статуса кода верификации
     */
    @GetMapping("/check-code-status")
    public ResponseEntity<?> checkCodeStatus(@RequestParam String phone) {
        try {
            String normalizedPhone = phoneVerificationService.normalizePhone(phone);
            
            boolean hasActiveCode = phoneVerificationService.hasActiveCode(normalizedPhone);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("hasActiveCode", hasActiveCode);
            
            if (hasActiveCode) {
                var activeCode = phoneVerificationService.getActiveCode(normalizedPhone);
                if (activeCode.isPresent()) {
                    response.put("expiresAt", activeCode.get().getExpiresAt());
                    response.put("attemptsLeft", 3 - activeCode.get().getAttempts());
                }
            }
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of(
                "success", false,
                "message", "Ошибка сервера: " + e.getMessage()
            ));
        }
    }
    
    // DTO классы для запросов
    public static class LoginRequest {
        private String email;
        private String password;
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getPassword() {
            return password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
    }
    
    public static class SendCodeRequest {
        private String phone;
        
        public String getPhone() {
            return phone;
        }
        
        public void setPhone(String phone) {
            this.phone = phone;
        }
    }
    
    public static class VerifyCodeRequest {
        private String phone;
        private String code;
        private String name;
        
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
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
    }
    
    public static class RegisterRequest {
        private String name;
        private String email;
        private String password;
        
        public String getName() {
            return name;
        }
        
        public void setName(String name) {
            this.name = name;
        }
        
        public String getEmail() {
            return email;
        }
        
        public void setEmail(String email) {
            this.email = email;
        }
        
        public String getPassword() {
            return password;
        }
        
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
