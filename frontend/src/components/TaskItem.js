import React from "react";

const TaskItem = ({ task, onUpdateStatus, onDelete }) => {
  // تحديد لون الحالة
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "#ffc107"; // أصفر
      case "in_progress":
        return "#17a2b8"; // أزرق
      case "done":
        return "#28a745"; // أخضر
      default:
        return "#6c757d"; // رمادي
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      marginBottom: "10px",
      backgroundColor: "#fff"
    }}>
      <div>
        <h4 style={{ margin: 0 }}>{task.title}</h4>
        <p style={{ margin: "4px 0" }}>{task.description}</p>
        <span style={{
          padding: "2px 8px",
          borderRadius: "4px",
          backgroundColor: getStatusColor(task.status),
          color: "#fff",
          fontSize: "12px"
        }}>
          {task.status.replace("_", " ")}
        </span>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button
          onClick={() => onUpdateStatus(task.id)}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Update Status
        </button>

        <button
          onClick={() => onDelete(task.id)}
          style={{
            padding: "6px 10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#dc3545",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskItem;
