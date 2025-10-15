package com.dobalito.service;

import com.dobalito.dto.TaskDto;
import com.dobalito.entity.Category;
import com.dobalito.entity.Task;
import com.dobalito.entity.TaskStatus;
import com.dobalito.entity.User;
import com.dobalito.repository.CategoryRepository;
import com.dobalito.repository.TaskRepository;
import com.dobalito.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TaskService {
    
    @Autowired
    private TaskRepository taskRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    // Create a new task
    public Task createTask(TaskDto taskDto, Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Автор задания не найден"));
        
        Category category = categoryRepository.findById(taskDto.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Категория не найдена"));
        
        Task task = new Task();
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStartDate(taskDto.getStartDate());
        task.setEndDate(taskDto.getEndDate());
        task.setCreator(creator); // Устанавливаем автора задания
        task.setCategory(category);
        task.setStatus(TaskStatus.OPEN);
        
        return taskRepository.save(task);
    }
    
    // Get task by ID
    @Transactional(readOnly = true)
    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }
    
    // Get all tasks
    @Transactional(readOnly = true)
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }
    
    // Get tasks by creator (author)
    @Transactional(readOnly = true)
    public List<Task> getTasksByCreator(Long creatorId) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Автор задания не найден"));
        return taskRepository.findByCreatorOrderByCreatedAtDesc(creator);
    }
    
    // Get tasks by executor
    @Transactional(readOnly = true)
    public List<Task> getTasksByExecutor(Long executorId) {
        User executor = userRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Исполнитель не найден"));
        return taskRepository.findByExecutorOrderByCreatedAtDesc(executor);
    }
    
    // Get open tasks (for executors to see)
    @Transactional(readOnly = true)
    public List<Task> getOpenTasks() {
        return taskRepository.findByStatusAndExecutorIsNullOrderByCreatedAtDesc(TaskStatus.OPEN);
    }
    
    // Get tasks by status
    @Transactional(readOnly = true)
    public List<Task> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatusOrderByCreatedAtDesc(status);
    }
    
    // Get tasks by category
    @Transactional(readOnly = true)
    public List<Task> getTasksByCategory(Long categoryId) {
        return taskRepository.findByCategoryIdOrderByCreatedAtDesc(categoryId);
    }
    
    // Get tasks with pagination
    @Transactional(readOnly = true)
    public Page<Task> getTasksWithPagination(Pageable pageable) {
        return taskRepository.findAll(pageable);
    }
    
    // Get open tasks with pagination
    @Transactional(readOnly = true)
    public Page<Task> getOpenTasksWithPagination(Pageable pageable) {
        return taskRepository.findByStatusAndExecutorIsNullOrderByCreatedAtDesc(TaskStatus.OPEN, pageable);
    }
    
    // Get tasks by creator with pagination (optimized version)
    @Transactional(readOnly = true)
    public Page<Task> getTasksByCreatorWithPagination(Long creatorId, Pageable pageable) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        
        // Используем нативную пагинацию Spring Data - запрос к БД только нужных записей
        return taskRepository.findByCreatorOrderByCreatedAtDesc(creator, pageable);
    }
    
    // Get tasks by executor with pagination
    @Transactional(readOnly = true)
    public Page<Task> getTasksByExecutorWithPagination(Long executorId, Pageable pageable) {
        User executor = userRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Исполнитель не найден"));
        return taskRepository.findByExecutor(executor, pageable);
    }
    
    // Get open tasks by creator with pagination (OPEN + IN_PROGRESS)
    @Transactional(readOnly = true)
    public Page<Task> getOpenTasksByCreatorWithPagination(Long creatorId, Pageable pageable) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        List<TaskStatus> openStatuses = List.of(TaskStatus.OPEN, TaskStatus.IN_PROGRESS);
        return taskRepository.findByCreatorAndStatusIn(creator, openStatuses, pageable);
    }
    
    // Get closed tasks by creator with pagination (COMPLETED + CANCELLED)
    @Transactional(readOnly = true)
    public Page<Task> getClosedTasksByCreatorWithPagination(Long creatorId, Pageable pageable) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        List<TaskStatus> closedStatuses = List.of(TaskStatus.COMPLETED, TaskStatus.CANCELLED);
        return taskRepository.findByCreatorAndStatusIn(creator, closedStatuses, pageable);
    }
    
    // Get tasks by creator and specific status with pagination
    @Transactional(readOnly = true)
    public Page<Task> getTasksByCreatorAndStatusWithPagination(Long creatorId, TaskStatus status, Pageable pageable) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        return taskRepository.findByCreatorAndStatusOrderByCreatedAtDesc(creator, status, pageable);
    }
    
    // Update task
    public Task updateTask(Long id, TaskDto taskDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Задание не найдено"));
        
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setStartDate(taskDto.getStartDate());
        task.setEndDate(taskDto.getEndDate());
        
        if (taskDto.getCategoryId() != null) {
            Category category = categoryRepository.findById(taskDto.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Категория не найдена"));
            task.setCategory(category);
        }
        
        return taskRepository.save(task);
    }
    
    // Assign executor to task
    public Task assignExecutor(Long taskId, Long executorId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Задание не найдено"));
        
        User executor = userRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Исполнитель не найден"));
        
        // Проверяем, что исполнитель не является автором задания
        if (task.getCreator().getId().equals(executorId)) {
            throw new RuntimeException("Автор задания не может быть его исполнителем");
        }
        
        task.setExecutor(executor); // Назначаем исполнителя
        task.setStatus(TaskStatus.IN_PROGRESS);
        
        return taskRepository.save(task);
    }
    
    // Update task status
    public Task updateTaskStatus(Long id, TaskStatus status) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Задание не найдено"));
        
        task.setStatus(status);
        
        return taskRepository.save(task);
    }
    
    // Delete task
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Задание не найдено"));
        
        taskRepository.delete(task);
    }
    
    // Count tasks by creator and status
    @Transactional(readOnly = true)
    public long countTasksByCreatorAndStatus(Long creatorId, TaskStatus status) {
        User creator = userRepository.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("Пользователь не найден"));
        return taskRepository.countByCreatorAndStatus(creator, status);
    }
    
    // Count tasks by executor and status
    @Transactional(readOnly = true)
    public long countTasksByExecutorAndStatus(Long executorId, TaskStatus status) {
        User executor = userRepository.findById(executorId)
                .orElseThrow(() -> new RuntimeException("Исполнитель не найден"));
        return taskRepository.countByExecutorAndStatus(executor, status);
    }
    
    // Count open tasks
    @Transactional(readOnly = true)
    public long countOpenTasks() {
        return taskRepository.countByStatusAndExecutorIsNull(TaskStatus.OPEN);
    }
}
