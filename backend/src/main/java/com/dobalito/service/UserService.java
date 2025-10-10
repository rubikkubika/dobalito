package com.dobalito.service;

import com.dobalito.entity.User;
import com.dobalito.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    private static final String UPLOAD_DIR = "uploads/avatars/";
    
    /**
     * Получить всех пользователей
     */
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    /**
     * Получить пользователя по ID
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    /**
     * Получить пользователя по email
     */
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Получить пользователя по номеру телефона
     */
    public Optional<User> getUserByPhone(String phone) {
        return userRepository.findByPhone(phone);
    }
    
    /**
     * Создать нового пользователя
     */
    public User createUser(User user) {
        return userRepository.save(user);
    }
    
    /**
     * Создать или обновить пользователя по номеру телефона
     */
    public User createOrUpdateUserByPhone(String phone, String name) {
        Optional<User> existingUser = userRepository.findByPhone(phone);
        
        if (existingUser.isPresent()) {
            // Обновляем существующего пользователя
            User user = existingUser.get();
            if (name != null && !name.trim().isEmpty()) {
                user.setName(name);
            }
            return userRepository.save(user);
        } else {
            // Создаем нового пользователя
            User newUser = new User();
            newUser.setPhone(phone);
            newUser.setName(name != null ? name : "Пользователь");
            // Генерируем временный email на основе телефона
            newUser.setEmail("temp_" + phone + "@dobalito.local");
            newUser.setPassword("phone_auth"); // Временный пароль
            return userRepository.save(newUser);
        }
    }
    
    /**
     * Обновить пользователя
     */
    public User updateUser(Long id, User userDetails) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            if (userDetails.getAvatar() != null) {
                user.setAvatar(userDetails.getAvatar());
            }
            return userRepository.save(user);
        }
        return null;
    }
    
    /**
     * Удалить пользователя
     */
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Поиск пользователей по имени или email
     */
    public List<User> searchUsers(String searchTerm) {
        return userRepository.findByNameOrEmailContaining(searchTerm);
    }
    
    /**
     * Загрузить аватарку пользователя
     */
    public String uploadAvatar(Long userId, MultipartFile file) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (!optionalUser.isPresent()) {
            throw new RuntimeException("Пользователь не найден");
        }
        
        // Создаем директорию для загрузки, если она не существует
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Генерируем уникальное имя файла
        String originalFilename = file.getOriginalFilename();
        String fileExtension = originalFilename != null && originalFilename.contains(".") 
            ? originalFilename.substring(originalFilename.lastIndexOf("."))
            : "";
        String filename = UUID.randomUUID().toString() + fileExtension;
        
        // Сохраняем файл
        Path filePath = uploadPath.resolve(filename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Обновляем аватарку пользователя
        User user = optionalUser.get();
        String avatarUrl = "/api/v1/users/avatar/" + filename;
        user.setAvatar(avatarUrl);
        userRepository.save(user);
        
        return avatarUrl;
    }
    
    /**
     * Удалить аватарку пользователя
     */
    public boolean deleteAvatar(Long userId) {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setAvatar(null);
            userRepository.save(user);
            return true;
        }
        return false;
    }
    
    /**
     * Получить путь к файлу аватарки
     */
    public Path getAvatarPath(String filename) {
        return Paths.get(UPLOAD_DIR + filename);
    }
    
    /**
     * Получить пользователей по категории
     */
    public List<User> getUsersByCategory(Long categoryId) {
        return userRepository.findByCategoryId(categoryId);
    }
    
    /**
     * Получить пользователей по названию категории
     */
    public List<User> getUsersByCategoryName(String categoryName) {
        return userRepository.findByCategoryName(categoryName);
    }
    
    /**
     * Получить всех исполнителей (пользователей)
     */
    public List<User> getAllExecutors() {
        return userRepository.findAllUsers();
    }
}

