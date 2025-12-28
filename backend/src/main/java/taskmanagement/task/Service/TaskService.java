package taskmanagement.task.Service;

import org.springframework.stereotype.Service;
import taskmanagement.task.DTO.TaskDTO;
import taskmanagement.task.Entity.Task;
import taskmanagement.task.Entity.TaskStatus;
import taskmanagement.task.Repository.TaskRepository;
import taskmanagement.task.Repository.UserRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public TaskDTO addTask(Task task) {
        if (task.getStatus() == null) {
            task.setStatus(TaskStatus.PENDING); // default status
        }

        if (task.getCreatedAt() == null) {
            task.setCreatedAt(LocalDateTime.now());
        }

        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }

    public TaskDTO updateTaskStatus(Long taskId, String status, String email) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Not authorized");
        }

        task.setStatus(TaskStatus.valueOf(status.toUpperCase())); // PENDING, COMPLETED, etc.
        return convertToDTO(taskRepository.save(task));
    }

    public void deleteTask(Long taskId, String email) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        if (!task.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Not authorized");
        }

        taskRepository.delete(task);
    }

    public List<TaskDTO> getUserTasks(String email) {
        return taskRepository.findByUserEmail(email) // لازم يكون موجود في TaskRepository
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus() != null ? task.getStatus().name() : "PENDING");
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUserId(task.getUser().getId());
        return dto;
    }
}
