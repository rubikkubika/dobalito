package com.dobalito.controller;

import com.dobalito.dto.TaskDto;
import com.dobalito.entity.Task;
import com.dobalito.entity.TaskStatus;
import com.dobalito.service.TaskService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/tasks")
@CrossOrigin(origins = "*")
public class TaskController {
    
    @Autowired
    private TaskService taskService;
    
    // Get current user ID from authentication
    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("Пользователь не аутентифицирован");
        }
        
        // Пытаемся получить пользователя из principal
        if (authentication.getPrincipal() instanceof com.dobalito.entity.User) {
            com.dobalito.entity.User user = (com.dobalito.entity.User) authentication.getPrincipal();
            return user.getId();
        }
        // Если в principal строка (phone), получаем пользователя из details
        else if (authentication.getDetails() instanceof com.dobalito.entity.User) {
            com.dobalito.entity.User user = (com.dobalito.entity.User) authentication.getDetails();
            return user.getId();
        }
        
        throw new RuntimeException("Не удалось получить ID пользователя из аутентификации");
    }
    
    // Create a new task
    @PostMapping
    public ResponseEntity<?> createTask(@Valid @RequestBody TaskDto taskDto) {
        try {
            Long creatorId = getCurrentUserId();
            Task task = taskService.createTask(taskDto, creatorId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Задание успешно создано");
            response.put("task", task);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при создании задания: " + e.getMessage());
            
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get task by ID
    @GetMapping("/{id}")
    public ResponseEntity<?> getTaskById(@PathVariable Long id) {
        try {
            Optional<Task> task = taskService.getTaskById(id);
            if (task.isPresent()) {
                return ResponseEntity.ok(task.get());
            } else {
                Map<String, Object> response = new HashMap<>();
                response.put("success", false);
                response.put("message", "Задание не найдено");
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении задания: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get all open tasks (for executors)
    @GetMapping("/open")
    public ResponseEntity<?> getOpenTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        try {
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);
            
            Page<Task> tasks = taskService.getOpenTasksWithPagination(pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("tasks", tasks.getContent());
            response.put("totalElements", tasks.getTotalElements());
            response.put("totalPages", tasks.getTotalPages());
            response.put("currentPage", tasks.getNumber());
            response.put("size", tasks.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении открытых заданий: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get my tasks (created by current user as author) - simplified version
    @GetMapping("/my")
    public ResponseEntity<?> getMyTasks() {
        try {
            Long userId = getCurrentUserId();
            List<Task> tasks = taskService.getTasksByCreator(userId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("tasks", tasks);
            response.put("count", tasks.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении моих заданий: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get tasks assigned to me (as executor)
    @GetMapping("/assigned")
    public ResponseEntity<?> getAssignedTasks(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        try {
            Long userId = getCurrentUserId();
            Sort sort = sortDir.equalsIgnoreCase("desc") ? 
                Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
            Pageable pageable = PageRequest.of(page, size, sort);
            
            Page<Task> tasks = taskService.getTasksByExecutorWithPagination(userId, pageable);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("tasks", tasks.getContent());
            response.put("totalElements", tasks.getTotalElements());
            response.put("totalPages", tasks.getTotalPages());
            response.put("currentPage", tasks.getNumber());
            response.put("size", tasks.getSize());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении назначенных заданий: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get tasks by status
    @GetMapping("/status/{status}")
    public ResponseEntity<?> getTasksByStatus(@PathVariable TaskStatus status) {
        try {
            List<Task> tasks = taskService.getTasksByStatus(status);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("tasks", tasks);
            response.put("count", tasks.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении заданий по статусу: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get tasks by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<?> getTasksByCategory(@PathVariable Long categoryId) {
        try {
            List<Task> tasks = taskService.getTasksByCategory(categoryId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("tasks", tasks);
            response.put("count", tasks.size());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении заданий по категории: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Update task
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable Long id, @Valid @RequestBody TaskDto taskDto) {
        try {
            Task task = taskService.updateTask(id, taskDto);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Задание успешно обновлено");
            response.put("task", task);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при обновлении задания: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Assign executor to task
    @PostMapping("/{id}/assign")
    public ResponseEntity<?> assignExecutor(@PathVariable Long id, @RequestParam Long executorId) {
        try {
            Task task = taskService.assignExecutor(id, executorId);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Исполнитель успешно назначен");
            response.put("task", task);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при назначении исполнителя: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Update task status
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateTaskStatus(@PathVariable Long id, @RequestParam TaskStatus status) {
        try {
            Task task = taskService.updateTaskStatus(id, status);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Статус задания успешно обновлен");
            response.put("task", task);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при обновлении статуса: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Delete task
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id) {
        try {
            taskService.deleteTask(id);
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Задание успешно удалено");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при удалении задания: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
    
    // Get task statistics
    @GetMapping("/stats")
    public ResponseEntity<?> getTaskStats() {
        try {
            Long userId = getCurrentUserId();
            
            Map<String, Object> stats = new HashMap<>();
            stats.put("openTasks", taskService.countTasksByCreatorAndStatus(userId, TaskStatus.OPEN));
            stats.put("inProgressTasks", taskService.countTasksByCreatorAndStatus(userId, TaskStatus.IN_PROGRESS));
            stats.put("completedTasks", taskService.countTasksByCreatorAndStatus(userId, TaskStatus.COMPLETED));
            stats.put("cancelledTasks", taskService.countTasksByCreatorAndStatus(userId, TaskStatus.CANCELLED));
            stats.put("totalOpenTasks", taskService.countOpenTasks());
            
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("stats", stats);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", "Ошибка при получении статистики: " + e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }
}
