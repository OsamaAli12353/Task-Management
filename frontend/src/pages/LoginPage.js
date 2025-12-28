import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/api/login", // URL صحيح
        { email, password },
        {
          headers: { "Content-Type": "application/json" }, // مهم
        }
      );

      const token = response.data.token;
      localStorage.setItem("token", token);

      // توجه لصفحة المهام بعد تسجيل الدخول
      window.location.href = "/tasks";
    } catch (err) {
      setError("Login failed. Check credentials.");
      console.error(err.response?.data || err.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: "#fff",
          padding: "30px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          gap: "15px",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          style={{
            padding: "10px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <p style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#007bff", textDecoration: "none" }}>
            Register here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
