package com.dobalito.dto;

import com.dobalito.entity.Category;

import java.time.LocalDateTime;

public class CategoryResponse {
    
    private Long id;
    private String name;
    private String englishName;
    private String description;
    private String icon;
    private String color;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructors
    public CategoryResponse() {}
    
    public CategoryResponse(Category category) {
        this.id = category.getId();
        this.name = category.getName();
        this.englishName = category.getEnglishName();
        this.description = category.getDescription();
        this.icon = category.getIcon();
        this.color = category.getColor();
        this.isActive = category.getIsActive();
        this.createdAt = category.getCreatedAt();
        this.updatedAt = category.getUpdatedAt();
    }
    
    // Static factory method with language support
    public static CategoryResponse from(Category category, String language) {
        CategoryResponse response = new CategoryResponse(category);
        if ("en".equals(language)) {
            response.name = category.getEnglishName();
        }
        return response;
    }
    
    // Static factory method (default Russian)
    public static CategoryResponse from(Category category) {
        return new CategoryResponse(category);
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEnglishName() {
        return englishName;
    }
    
    public void setEnglishName(String englishName) {
        this.englishName = englishName;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getIcon() {
        return icon;
    }
    
    public void setIcon(String icon) {
        this.icon = icon;
    }
    
    public String getColor() {
        return color;
    }
    
    public void setColor(String color) {
        this.color = color;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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
}
