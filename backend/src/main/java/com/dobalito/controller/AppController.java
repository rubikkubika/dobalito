package com.dobalito.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "*")
public class AppController {
    
    @GetMapping("/health")
    public ResponseEntity<?> health() {
        return ResponseEntity.ok(Map.of(
            "status", "UP",
            "message", "Dobalito API is running",
            "timestamp", System.currentTimeMillis()
        ));
    }
    
    @GetMapping("/info")
    public ResponseEntity<?> info() {
        return ResponseEntity.ok(Map.of(
            "name", "Dobalito",
            "version", "1.0.0",
            "description", "React web application with Spring Boot backend",
            "platforms", new String[]{"Android", "iOS", "Web"}
        ));
    }
    
    @GetMapping("/info/commit")
    public ResponseEntity<?> commitInfo() {
        return ResponseEntity.ok(Map.of(
            "commit", "m8k3n"
        ));
    }
}