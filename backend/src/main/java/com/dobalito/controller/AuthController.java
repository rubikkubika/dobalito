package com.dobalito.controller;

import com.dobalito.dto.LoginRequest;
import com.dobalito.entity.User;
import com.dobalito.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin(origins = "*")
public class AuthController {
    
    @Autowired
    private UserService userService;
    
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
    public ResponseEntity<?> testJson(@RequestBody Map<String, Object> data) {
        return ResponseEntity.ok(Map.of(
            "success", true,
            "message", "JSON работает",
            "received", data
        ));
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
