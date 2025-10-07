package com.dobalito.controller;

import com.dobalito.service.CategoryService;
import com.dobalito.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private CategoryService categoryService;
    
    @Autowired
    private UserService userService;
    
    /**
     * Получить статистику системы
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        long totalUsers = userService.getAllUsers().size();
        long totalCategories = categoryService.getAllCategories().size();
        long activeCategories = categoryService.getActiveCategories().size();
        long usersWithAvatars = userService.getAllUsers().stream()
            .filter(user -> user.getAvatar() != null && !user.getAvatar().isEmpty())
            .count();
        
        return ResponseEntity.ok(Map.of(
            "totalUsers", totalUsers,
            "totalCategories", totalCategories,
            "activeCategories", activeCategories,
            "inactiveCategories", totalCategories - activeCategories,
            "usersWithAvatars", usersWithAvatars,
            "usersWithoutAvatars", totalUsers - usersWithAvatars,
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    /**
     * Получить информацию о системе
     */
    @GetMapping("/system-info")
    public ResponseEntity<Map<String, Object>> getSystemInfo() {
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;
        long maxMemory = runtime.maxMemory();
        
        return ResponseEntity.ok(Map.of(
            "javaVersion", System.getProperty("java.version"),
            "osName", System.getProperty("os.name"),
            "osVersion", System.getProperty("os.version"),
            "totalMemory", totalMemory,
            "freeMemory", freeMemory,
            "usedMemory", usedMemory,
            "maxMemory", maxMemory,
            "availableProcessors", runtime.availableProcessors(),
            "uptime", System.currentTimeMillis() - System.getProperty("java.class.path").hashCode(),
            "timestamp", System.currentTimeMillis()
        ));
    }
}

