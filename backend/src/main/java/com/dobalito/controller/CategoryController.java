package com.dobalito.controller;

import com.dobalito.dto.CategoryCreateRequest;
import com.dobalito.dto.CategoryResponse;
import com.dobalito.entity.Category;
import com.dobalito.exception.ResourceNotFoundException;
import com.dobalito.exception.ResourceAlreadyExistsException;
import com.dobalito.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/categories")
@CrossOrigin(origins = "*")
public class CategoryController {
    
    @Autowired
    private CategoryService categoryService;
    
    /**
     * Получить все категории
     */
    @GetMapping
    public ResponseEntity<List<CategoryResponse>> getAllCategories(
            @RequestParam(value = "lang", defaultValue = "ru") String language) {
        List<Category> categories = categoryService.getAllCategories();
        List<CategoryResponse> responses = categories.stream()
            .map(category -> CategoryResponse.from(category, language))
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    /**
     * Получить все активные категории
     */
    @GetMapping("/active")
    public ResponseEntity<List<CategoryResponse>> getActiveCategories(
            @RequestParam(value = "lang", defaultValue = "ru") String language) {
        List<Category> categories = categoryService.getActiveCategories();
        List<CategoryResponse> responses = categories.stream()
            .map(category -> CategoryResponse.from(category, language))
            .collect(Collectors.toList());
        return ResponseEntity.ok(responses);
    }
    
    /**
     * Получить категорию по ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<CategoryResponse> getCategoryById(
            @PathVariable Long id,
            @RequestParam(value = "lang", defaultValue = "ru") String language) {
        Category category = categoryService.getCategoryById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Категория", id));
        return ResponseEntity.ok(CategoryResponse.from(category, language));
    }
    
    /**
     * Получить категорию по имени
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<CategoryResponse> getCategoryByName(@PathVariable String name) {
        Category category = categoryService.getCategoryByName(name)
            .orElseThrow(() -> new ResourceNotFoundException("Категория", name));
        return ResponseEntity.ok(CategoryResponse.from(category));
    }
    
    /**
     * Создать новую категорию
     */
    @PostMapping
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryCreateRequest request) {
        // Проверяем, не существует ли уже категория с таким именем
        if (categoryService.categoryExistsByName(request.getName())) {
            throw new ResourceAlreadyExistsException("Категория", request.getName());
        }
        
        Category category = new Category();
        category.setName(request.getName());
        category.setEnglishName(request.getEnglishName());
        category.setDescription(request.getDescription());
        category.setIcon(request.getIcon());
        category.setColor(request.getColor());
        category.setIsActive(request.getIsActive());
        
        Category createdCategory = categoryService.createCategory(category);
        return ResponseEntity.status(HttpStatus.CREATED).body(CategoryResponse.from(createdCategory));
    }
    
    /**
     * Обновить категорию
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCategory(@PathVariable Long id, @RequestBody Category categoryDetails) {
        Category updatedCategory = categoryService.updateCategory(id, categoryDetails);
        if (updatedCategory != null) {
            return ResponseEntity.ok(updatedCategory);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Деактивировать категорию
     */
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateCategory(@PathVariable Long id) {
        boolean deactivated = categoryService.deactivateCategory(id);
        if (deactivated) {
            return ResponseEntity.ok(Map.of("message", "Категория успешно деактивирована"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Активировать категорию
     */
    @PutMapping("/{id}/activate")
    public ResponseEntity<?> activateCategory(@PathVariable Long id) {
        boolean activated = categoryService.activateCategory(id);
        if (activated) {
            return ResponseEntity.ok(Map.of("message", "Категория успешно активирована"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Удалить категорию
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCategory(@PathVariable Long id) {
        boolean deleted = categoryService.deleteCategory(id);
        if (deleted) {
            return ResponseEntity.ok(Map.of("message", "Категория успешно удалена"));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Поиск категорий
     */
    @GetMapping("/search")
    public ResponseEntity<List<Category>> searchCategories(@RequestParam String q) {
        List<Category> categories = categoryService.searchCategories(q);
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Поиск активных категорий
     */
    @GetMapping("/search/active")
    public ResponseEntity<List<Category>> searchActiveCategories(@RequestParam String q) {
        List<Category> categories = categoryService.searchActiveCategories(q);
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Получить категории с иконками
     */
    @GetMapping("/with-icons")
    public ResponseEntity<List<Category>> getCategoriesWithIcons() {
        List<Category> categories = categoryService.getCategoriesWithIcons();
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Получить категории по цвету
     */
    @GetMapping("/color/{color}")
    public ResponseEntity<List<Category>> getCategoriesByColor(@PathVariable String color) {
        List<Category> categories = categoryService.getCategoriesByColor(color);
        return ResponseEntity.ok(categories);
    }
}
