package com.dobalito.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class CategoryCreateRequest {
    
    @NotBlank(message = "Название категории обязательно")
    @Size(max = 100, message = "Название категории не должно превышать 100 символов")
    private String name;
    
    @NotBlank(message = "Английское название категории обязательно")
    @Size(max = 100, message = "Английское название категории не должно превышать 100 символов")
    private String englishName;
    
    @Size(max = 500, message = "Описание не должно превышать 500 символов")
    private String description;
    
    @Size(max = 100, message = "Иконка не должна превышать 100 символов")
    private String icon;
    
    @Size(max = 7, message = "Цвет должен быть в формате hex (#RRGGBB)")
    private String color;
    
    private Boolean isActive = true;
    
    // Constructors
    public CategoryCreateRequest() {}
    
    public CategoryCreateRequest(String name, String englishName, String description, String icon, String color) {
        this.name = name;
        this.englishName = englishName;
        this.description = description;
        this.icon = icon;
        this.color = color;
    }
    
    // Getters and Setters
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
}
