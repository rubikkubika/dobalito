package com.dobalito.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        return ResponseEntity.ok(Map.of(
            "id", 1,
            "name", "John Doe",
            "email", "john.doe@example.com",
            "avatar", "https://via.placeholder.com/150",
            "memberSince", "2024-01-01"
        ));
    }
    
    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> profileData) {
        return ResponseEntity.ok(Map.of(
            "message", "Profile updated successfully",
            "updatedFields", profileData.keySet()
        ));
    }
}
