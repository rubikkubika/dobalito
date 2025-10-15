package com.dobalito.dto;

import com.dobalito.entity.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Future;

import java.time.LocalDateTime;

public class TaskDto {
    
    private Long id;
    
    @NotBlank(message = "Название задания не может быть пустым")
    private String title;
    
    private String description;
    
    @NotNull(message = "Дата начала обязательна")
    private LocalDateTime startDate;
    
    @NotNull(message = "Дата окончания обязательна")
    @Future(message = "Дата окончания должна быть в будущем")
    private LocalDateTime endDate;
    
    private TaskStatus status;
    
    private Long creatorId; // ID автора задания
    private String creatorName; // Имя автора задания
    
    private Long executorId; // ID исполнителя задания
    private String executorName; // Имя исполнителя задания
    
    private Long categoryId;
    private String categoryName;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public TaskDto() {}
    
    public TaskDto(String title, String description, LocalDateTime startDate, LocalDateTime endDate) {
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public LocalDateTime getStartDate() {
        return startDate;
    }
    
    public void setStartDate(LocalDateTime startDate) {
        this.startDate = startDate;
    }
    
    public LocalDateTime getEndDate() {
        return endDate;
    }
    
    public void setEndDate(LocalDateTime endDate) {
        this.endDate = endDate;
    }
    
    public TaskStatus getStatus() {
        return status;
    }
    
    public void setStatus(TaskStatus status) {
        this.status = status;
    }
    
    public Long getCreatorId() {
        return creatorId;
    }
    
    public void setCreatorId(Long creatorId) {
        this.creatorId = creatorId;
    }
    
    public String getCreatorName() {
        return creatorName;
    }
    
    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }
    
    public Long getExecutorId() {
        return executorId;
    }
    
    public void setExecutorId(Long executorId) {
        this.executorId = executorId;
    }
    
    public String getExecutorName() {
        return executorName;
    }
    
    public void setExecutorName(String executorName) {
        this.executorName = executorName;
    }
    
    public Long getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }
    
    public String getCategoryName() {
        return categoryName;
    }
    
    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "TaskDto{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", startDate=" + startDate +
                ", endDate=" + endDate +
                ", status=" + status +
                ", creatorId=" + creatorId +
                ", executorId=" + executorId +
                ", categoryId=" + categoryId +
                '}';
    }
}
