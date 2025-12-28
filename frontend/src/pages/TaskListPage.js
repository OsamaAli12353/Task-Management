import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080/api/tasks";

const TaskListPage = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  // لو مفيش token ارجع للـ login
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // جلب المهام
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(BASE_URL, config);
        setTasks(res.data);
      } catch (err) {
        setError("Failed to fetch tasks");
      }
    };

    fetchTasks();
  }, [token]);

  // إضافة task
  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(BASE_URL, { title, description }, config);
      setTitle("");
      setDescription("");
      const res = await axios.get(BASE_URL, config);
      setTasks(res.data);
    } catch (err) {
      setError("Failed to add task");
    }
  };

  // تحديث status
  const handleUpdateStatus = async (id) => {
    try {
      const task = tasks.find((t) => t.id === id);
      const nextStatus =
        task.status.toUpperCase() === "PENDING"
          ? "IN_PROGRESS"
          : task.status.toUpperCase() === "IN_PROGRESS"
          ? "DONE"
          : "PENDING";

      await axios.patch(`${BASE_URL}/${id}/status?status=${nextStatus}`, {}, config);

      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, status: nextStatus } : t))
      );
    } catch (err) {
      setError("Failed to update status");
    }
  };

  // حذف task
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/${id}`, config);
      setTasks((prev) => prev.filter((t) => t.id !== id));
    } catch (err) {
      setError("Failed to delete task");
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h2>My Tasks</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: "6px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#dc3545",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      <form
        onSubmit={handleAddTask}
        style={{ marginBottom: "20px", display: "flex", gap: "10px" }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Add
        </button>
      </form>

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdateStatus={handleUpdateStatus}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default TaskListPage;
