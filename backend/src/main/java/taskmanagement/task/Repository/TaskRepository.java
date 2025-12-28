package taskmanagement.task.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import taskmanagement.task.Entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByUserId(Long userId);
    List<Task> findByUserEmail(String email);

}

