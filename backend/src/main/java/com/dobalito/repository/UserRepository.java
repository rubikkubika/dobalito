package com.dobalito.repository;

import com.dobalito.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Найти пользователя по email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Найти пользователя по номеру телефона
     */
    Optional<User> findByPhone(String phone);
    
    /**
     * Проверить существование пользователя по email
     */
    boolean existsByEmail(String email);
    
    /**
     * Проверить существование пользователя по номеру телефона
     */
    boolean existsByPhone(String phone);
    
    /**
     * Найти пользователей по имени (поиск по частичному совпадению)
     */
    List<User> findByNameContainingIgnoreCase(String name);
    
    /**
     * Найти пользователей с аватарками
     */
    @Query("SELECT u FROM User u WHERE u.avatar IS NOT NULL AND u.avatar != ''")
    List<User> findUsersWithAvatars();
    
    /**
     * Найти пользователей без аватарок
     */
    @Query("SELECT u FROM User u WHERE u.avatar IS NULL OR u.avatar = ''")
    List<User> findUsersWithoutAvatars();
    
    /**
     * Найти пользователей по частичному совпадению имени или email
     */
    @Query("SELECT u FROM User u WHERE " +
           "LOWER(u.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(u.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<User> findByNameOrEmailContaining(@Param("searchTerm") String searchTerm);
    
    /**
     * Найти пользователей по категории
     */
    @Query("SELECT DISTINCT u FROM User u JOIN u.categories c WHERE c.id = :categoryId")
    List<User> findByCategoryId(@Param("categoryId") Long categoryId);
    
    /**
     * Найти пользователей по названию категории
     */
    @Query("SELECT DISTINCT u FROM User u JOIN u.categories c WHERE c.name = :categoryName")
    List<User> findByCategoryName(@Param("categoryName") String categoryName);
    
    /**
     * Найти всех пользователей (исполнителей)
     */
    @Query("SELECT u FROM User u")
    List<User> findAllUsers();
}

