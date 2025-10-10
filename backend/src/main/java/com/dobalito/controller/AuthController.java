package com.dobalito.controller;

import com.dobalito.entity.User;
import com.dobalito.service.UserService;
import com.dobalito.service.PhoneVerificationService;
import com.dobalito.service.SmsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private PhoneVerificationService phoneVerificationService;
    
    @Autowired
    private SmsService smsService;
    
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
     * Получение текущего пользователя
     */
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestParam String email) {
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
    public ResponseEntity<?> logout() {
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
            
            // Отправляем SMS
            boolean smsSent = smsService.sendVerificationCode(normalizedPhone, verificationCode.getCode());
            
            if (!smsSent) {
                return ResponseEntity.status(500).body(Map.of(
                    "success", false,
                    "message", "Ошибка отправки SMS"
                ));
            }
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Код верификации отправлен на номер " + normalizedPhone,
                "phone", normalizedPhone,
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
     * Верификация кода и авторизация пользователя
     */
    @PostMapping("/verify-code")
    public ResponseEntity<?> verifyCode(@RequestBody String verifyJson) {
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
