package taskmanagement.task.Controller;

import taskmanagement.task.DTO.TaskDTO;
import taskmanagement.task.DTO.TaskRequest;
import taskmanagement.task.Entity.Task;
import taskmanagement.task.Entity.User;
import taskmanagement.task.Repository.UserRepository;
import taskmanagement.task.Service.TaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;


@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000")
public class TaskController {

    private final TaskService taskService;
    private final UserRepository userRepository;

    public TaskController(TaskService taskService, UserRepository userRepository) {
        this.taskService = taskService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<TaskDTO> addTask(@RequestBody Task task, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElseThrow();
        task.setUser(user);
        TaskDTO dto = taskService.addTask(task);
        return ResponseEntity.ok(dto);
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> list(Principal principal) {
        return ResponseEntity.ok(taskService.getUserTasks(principal.getName()));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<TaskDTO> updateStatus(@PathVariable Long id,
                                                @RequestParam("status") String status,
                                                Principal principal) {
        TaskDTO updated = taskService.updateTaskStatus(id, status, principal.getName());
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id, Principal principal) {
        taskService.deleteTask(id, principal.getName());
        return ResponseEntity.ok("Task deleted");
    }
}

