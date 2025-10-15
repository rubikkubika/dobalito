package com.dobalito.repository;

import com.dobalito.entity.Task;
import com.dobalito.entity.TaskStatus;
import com.dobalito.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    
    // Find tasks by creator
    List<Task> findByCreatorOrderByCreatedAtDesc(User creator);
    
    // Find tasks by executor
    List<Task> findByExecutorOrderByCreatedAtDesc(User executor);
    
    // Find tasks by status
    List<Task> findByStatusOrderByCreatedAtDesc(TaskStatus status);
    
    // Find tasks by category
    List<Task> findByCategoryIdOrderByCreatedAtDesc(Long categoryId);
    
    // Find open tasks (for executors to see)
    List<Task> findByStatusAndExecutorIsNullOrderByCreatedAtDesc(TaskStatus status);
    
    // Find tasks by creator and status
    List<Task> findByCreatorAndStatusOrderByCreatedAtDesc(User creator, TaskStatus status);
    
    // Find tasks by executor and status
    List<Task> findByExecutorAndStatusOrderByCreatedAtDesc(User executor, TaskStatus status);
    
    // Find tasks with pagination
    Page<Task> findByStatusOrderByCreatedAtDesc(TaskStatus status, Pageable pageable);
    
    // Find open tasks with pagination (with eager loading для избежания N+1)
    @EntityGraph(attributePaths = {"creator", "category"})
    Page<Task> findByStatusAndExecutorIsNullOrderByCreatedAtDesc(TaskStatus status, Pageable pageable);
    
    // Find tasks by creator with pagination
    @Query("SELECT t FROM Task t WHERE t.creator = :creator ORDER BY t.createdAt DESC")
    Page<Task> findByCreator(@Param("creator") User creator, Pageable pageable);
    
    // Find tasks by creator with pagination - method name version (with eager loading)
    @EntityGraph(attributePaths = {"creator", "executor", "category"})
    Page<Task> findByCreatorOrderByCreatedAtDesc(User creator, Pageable pageable);
    
    // Find tasks by executor with pagination (with eager loading)
    @EntityGraph(attributePaths = {"creator", "executor", "category"})
    @Query("SELECT t FROM Task t WHERE t.executor = :executor ORDER BY t.createdAt DESC")
    Page<Task> findByExecutor(@Param("executor") User executor, Pageable pageable);
    
    // Find tasks by date range
    @Query("SELECT t FROM Task t WHERE t.startDate >= :startDate AND t.endDate <= :endDate ORDER BY t.createdAt DESC")
    List<Task> findByDateRange(@Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Find tasks by creator and date range
    @Query("SELECT t FROM Task t WHERE t.creator = :creator AND t.startDate >= :startDate AND t.endDate <= :endDate ORDER BY t.createdAt DESC")
    List<Task> findByCreatorAndDateRange(@Param("creator") User creator, @Param("startDate") LocalDateTime startDate, @Param("endDate") LocalDateTime endDate);
    
    // Count tasks by creator and status
    long countByCreatorAndStatus(User creator, TaskStatus status);
    
    // Count tasks by executor and status
    long countByExecutorAndStatus(User executor, TaskStatus status);
    
    // Count open tasks
    long countByStatusAndExecutorIsNull(TaskStatus status);
    
    // Find open tasks by creator with pagination (with eager loading)
    @EntityGraph(attributePaths = {"creator", "executor", "category"})
    Page<Task> findByCreatorAndStatusOrderByCreatedAtDesc(User creator, TaskStatus status, Pageable pageable);
    
    // Find tasks by creator and status in list (OPEN + IN_PROGRESS for "open tasks")
    @EntityGraph(attributePaths = {"creator", "executor", "category"})
    @Query("SELECT t FROM Task t WHERE t.creator = :creator AND t.status IN :statuses ORDER BY t.createdAt DESC")
    Page<Task> findByCreatorAndStatusIn(@Param("creator") User creator, @Param("statuses") List<TaskStatus> statuses, Pageable pageable);
}
