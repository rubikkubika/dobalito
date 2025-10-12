package com.dobalito.controller;

import com.dobalito.entity.User;
import com.dobalito.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * Получить всех пользователей
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    /**
     * Получить пользователя по ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Создать нового пользователя
     */
    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user) {
        User createdUser = userService.createUser(user);
        return ResponseEntity.ok(createdUser);
    }
    
    /**
     * Обновить пользователя
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody User userDetails) {
        User updatedUser = userService.updateUser(id, userDetails);
        if (updatedUser != null) {
            return ResponseEntity.ok(updatedUser);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Удалить пользователя
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Пользователь успешно удален"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Поиск пользователей
     */
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsers(@RequestParam String q) {
        List<User> users = userService.searchUsers(q);
        return ResponseEntity.ok(users);
    }
    
    /**
     * Загрузить аватарку
     */
    @PostMapping("/{id}/avatar")
    public ResponseEntity<?> uploadAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        try {
            String avatarUrl = userService.uploadAvatar(id, file);
            return ResponseEntity.ok(Map.of(
                "message", "Аватарка успешно загружена",
                "avatarUrl", avatarUrl
            ));
        } catch (IOException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", "Ошибка при загрузке файла: " + e.getMessage()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of(
                "error", e.getMessage()
            ));
        }
    }
    
    /**
     * Удалить аватарку
     */
    @DeleteMapping("/{id}/avatar")
    public ResponseEntity<?> deleteAvatar(@PathVariable Long id) {
        boolean deleted = userService.deleteAvatar(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Аватарка успешно удалена"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Получить аватарку по имени файла
     */
    @GetMapping("/avatar/{filename}")
    public ResponseEntity<Resource> getAvatar(@PathVariable String filename) {
        try {
            Path filePath = userService.getAvatarPath(filename);
            Resource resource = new UrlResource(filePath.toUri());
            
            if (resource.exists() && resource.isReadable()) {
                // Определяем Content-Type по расширению файла
                MediaType contentType = getContentTypeFromFilename(filename);
                
                return ResponseEntity.ok()
                    .contentType(contentType)
                    .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                    .header(HttpHeaders.CACHE_CONTROL, "public, max-age=3600") // Кеширование на 1 час
                    .body(resource);
            } else {
                // Логируем отсутствие файла для диагностики
                System.out.println("Avatar file not found: " + filePath);
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            // Некорректное имя файла
            System.out.println("Invalid filename: " + filename + ", error: " + e.getMessage());
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            // Другие ошибки
            System.out.println("Error serving avatar: " + filename + ", error: " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Определяет Content-Type по расширению файла
     */
    private MediaType getContentTypeFromFilename(String filename) {
        if (filename == null) {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
        
        String extension = filename.toLowerCase();
        if (extension.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (extension.endsWith(".jpg") || extension.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else if (extension.endsWith(".gif")) {
            return MediaType.IMAGE_GIF;
        } else if (extension.endsWith(".webp")) {
            return MediaType.parseMediaType("image/webp");
        } else if (extension.endsWith(".svg")) {
            return MediaType.parseMediaType("image/svg+xml");
        } else {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
    
    /**
     * Получить профиль пользователя (для совместимости)
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        // Возвращаем первого пользователя как пример
        List<User> users = userService.getAllUsers();
        if (!users.isEmpty()) {
            return ResponseEntity.ok(users.get(0));
        } else {
            // Создаем тестового пользователя
            User testUser = new User("John Doe", "john.doe@example.com", "https://via.placeholder.com/150");
            User createdUser = userService.createUser(testUser);
            return ResponseEntity.ok(createdUser);
        }
    }
    
    /**
     * Обновить профиль пользователя (для совместимости)
     */
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> profileData) {
        return ResponseEntity.ok(Map.of(
            "message", "Profile updated successfully",
            "updatedFields", profileData.keySet()
        ));
    }
    
    /**
     * Получить всех исполнителей (пользователей)
     */
    @GetMapping("/executors")
    public ResponseEntity<List<User>> getExecutors() {
        List<User> users = userService.getAllExecutors();
        return ResponseEntity.ok(users);
    }
    
    /**
     * Получить пользователей по категории
     */
    @GetMapping("/by-category/{categoryId}")
    public ResponseEntity<List<User>> getUsersByCategory(@PathVariable Long categoryId) {
        List<User> users = userService.getUsersByCategory(categoryId);
        return ResponseEntity.ok(users);
    }
    
    /**
     * Получить пользователей по названию категории
     */
    @GetMapping("/by-category-name/{categoryName}")
    public ResponseEntity<List<User>> getUsersByCategoryName(@PathVariable String categoryName) {
        List<User> users = userService.getUsersByCategoryName(categoryName);
        return ResponseEntity.ok(users);
    }
}
