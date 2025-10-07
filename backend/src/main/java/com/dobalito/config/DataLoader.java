package com.dobalito.config;

import com.dobalito.entity.Category;
import com.dobalito.entity.User;
import com.dobalito.repository.CategoryRepository;
import com.dobalito.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataLoader implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Создаем тестовых пользователей, если их еще нет
        if (userRepository.count() == 0) {
            createTestUsers();
        }
        
        // Создаем тестовые категории, если их еще нет
        if (categoryRepository.count() == 0) {
            createTestCategories();
        }
    }
    
    private void createTestUsers() {
        // Создаем несколько тестовых пользователей
        User user1 = new User("Иван Петров", "ivan.petrov@example.com", "https://via.placeholder.com/150/FF6B6B/FFFFFF?text=IP");
        User user2 = new User("Мария Сидорова", "maria.sidorova@example.com", "https://via.placeholder.com/150/4ECDC4/FFFFFF?text=MS");
        User user3 = new User("Алексей Козлов", "alexey.kozlov@example.com", null); // Без аватарки
        User user4 = new User("Елена Волкова", "elena.volkova@example.com", "https://via.placeholder.com/150/45B7D1/FFFFFF?text=EV");
        User user5 = new User("Дмитрий Новиков", "dmitry.novikov@example.com", null); // Без аватарки
        
        userRepository.save(user1);
        userRepository.save(user2);
        userRepository.save(user3);
        userRepository.save(user4);
        userRepository.save(user5);
        
        System.out.println("Создано " + userRepository.count() + " тестовых пользователей");
    }
    
    private void createTestCategories() {
        // Создаем категорию Серфинг
        Category surfingCategory = new Category(
            "Серфинг",
            "Surfing",
            "Услуги и товары для серфинга: доски, гидрокостюмы, уроки серфинга, аренда оборудования",
            null,
            "#00B4DB"
        );
        
        // Создаем категорию Аренда байка
        Category bikeRentalCategory = new Category(
            "Аренда байка",
            "Bike Rental",
            "Аренда велосипедов, мотоциклов и другого двухколесного транспорта",
            null,
            "#FF6B6B"
        );
        
        // Создаем категорию Туризм
        Category tourismCategory = new Category(
            "Туризм",
            "Tourism",
            "Туристические услуги: экскурсии, гиды, туры, путеводители",
            null,
            "#4ECDC4"
        );
        
        categoryRepository.save(surfingCategory);
        categoryRepository.save(bikeRentalCategory);
        categoryRepository.save(tourismCategory);
        
        System.out.println("Создано " + categoryRepository.count() + " тестовых категорий");
    }
}
