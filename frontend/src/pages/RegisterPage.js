import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/register", {
        name,
        email,
        password,
      });

      setSuccess("Registration successful! You can now login.");
      setError("");
      setName("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setError("Registration failed. Email may already exist.");
      setSuccess("");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundColor: "#f5f5f5"
    }}>
      <form onSubmit={handleRegister} style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        width: "300px",
        display: "flex",
        flexDirection: "column",
        gap: "15px"
      }}>
        <h2 style={{ textAlign: "center" }}>Register</h2>

        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
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

        <button type="submit" style={{
          padding: "10px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#28a745",
          color: "#fff",
          cursor: "pointer"
        }}>
          Register
        </button>

        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: "green", textAlign: "center" }}>{success}</p>}

        {/* زر للتنقل للـ Login */}
        <p style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#007bff", textDecoration: "none" }}>
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
