package com.dobalito.repository;

import com.dobalito.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    /**
     * Найти категорию по имени
     */
    Optional<Category> findByName(String name);
    
    /**
     * Проверить существование категории по имени
     */
    boolean existsByName(String name);
    
    /**
     * Найти все активные категории
     */
    List<Category> findByIsActiveTrue();
    
    /**
     * Найти все неактивные категории
     */
    List<Category> findByIsActiveFalse();
    
    /**
     * Найти категории по частичному совпадению имени
     */
    List<Category> findByNameContainingIgnoreCase(String name);
    
    /**
     * Найти категории по частичному совпадению описания
     */
    List<Category> findByDescriptionContainingIgnoreCase(String description);
    
    /**
     * Найти категории по частичному совпадению имени или описания
     */
    @Query("SELECT c FROM Category c WHERE " +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Category> findByNameOrDescriptionContaining(@Param("searchTerm") String searchTerm);
    
    /**
     * Найти активные категории по частичному совпадению имени или описания
     */
    @Query("SELECT c FROM Category c WHERE c.isActive = true AND (" +
           "LOWER(c.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    List<Category> findActiveByNameOrDescriptionContaining(@Param("searchTerm") String searchTerm);
    
    /**
     * Найти категории по цвету
     */
    List<Category> findByColor(String color);
    
    /**
     * Найти категории с иконками
     */
    @Query("SELECT c FROM Category c WHERE c.icon IS NOT NULL AND c.icon != ''")
    List<Category> findCategoriesWithIcons();
}

