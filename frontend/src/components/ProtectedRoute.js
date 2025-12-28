import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // لو مفيش token يبعت المستخدم للـ login
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
