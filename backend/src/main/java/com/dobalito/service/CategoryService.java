package com.dobalito.service;

import com.dobalito.entity.Category;
import com.dobalito.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    /**
     * Получить все категории
     */
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }
    
    /**
     * Получить все активные категории
     */
    public List<Category> getActiveCategories() {
        return categoryRepository.findByIsActiveTrue();
    }
    
    /**
     * Получить категорию по ID
     */
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }
    
    /**
     * Получить категорию по имени
     */
    public Optional<Category> getCategoryByName(String name) {
        return categoryRepository.findByName(name);
    }
    
    /**
     * Создать новую категорию
     */
    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }
    
    /**
     * Обновить категорию
     */
    public Category updateCategory(Long id, Category categoryDetails) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setName(categoryDetails.getName());
            category.setDescription(categoryDetails.getDescription());
            category.setIcon(categoryDetails.getIcon());
            category.setColor(categoryDetails.getColor());
            if (categoryDetails.getIsActive() != null) {
                category.setIsActive(categoryDetails.getIsActive());
            }
            return categoryRepository.save(category);
        }
        return null;
    }
    
    /**
     * Удалить категорию (мягкое удаление - деактивация)
     */
    public boolean deactivateCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setIsActive(false);
            categoryRepository.save(category);
            return true;
        }
        return false;
    }
    
    /**
     * Активировать категорию
     */
    public boolean activateCategory(Long id) {
        Optional<Category> optionalCategory = categoryRepository.findById(id);
        if (optionalCategory.isPresent()) {
            Category category = optionalCategory.get();
            category.setIsActive(true);
            categoryRepository.save(category);
            return true;
        }
        return false;
    }
    
    /**
     * Полностью удалить категорию из базы данных
     */
    public boolean deleteCategory(Long id) {
        if (categoryRepository.existsById(id)) {
            categoryRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    /**
     * Поиск категорий по имени или описанию
     */
    public List<Category> searchCategories(String searchTerm) {
        return categoryRepository.findByNameOrDescriptionContaining(searchTerm);
    }
    
    /**
     * Поиск активных категорий по имени или описанию
     */
    public List<Category> searchActiveCategories(String searchTerm) {
        return categoryRepository.findActiveByNameOrDescriptionContaining(searchTerm);
    }
    
    /**
     * Проверить существование категории по имени
     */
    public boolean categoryExistsByName(String name) {
        return categoryRepository.existsByName(name);
    }
    
    /**
     * Получить категории с иконками
     */
    public List<Category> getCategoriesWithIcons() {
        return categoryRepository.findCategoriesWithIcons();
    }
    
    /**
     * Получить категории по цвету
     */
    public List<Category> getCategoriesByColor(String color) {
        return categoryRepository.findByColor(color);
    }
}

