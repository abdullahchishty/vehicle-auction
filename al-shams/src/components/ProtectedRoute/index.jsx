import React from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// if you provide For other than customer and admin or provide nothing then its not a protected route
const ProtectedRoute = ({ element, For }) => {
  // if For is customer
  if (For === "customer") {
    const { token } = useSelector((state) => state.auth);
    if (!token.accessToken) {
      return <Navigate to="/login" replace />;
    }
  }

  // if For is admin
  else if (For === "admin") {
    const { token } = useSelector((state) => state.adminAuth);
    if (!token.accessToken) {
      return <Navigate to="/admin-a1b2c3/login" replace />;
    }
  }
  
  return element;
};

export default ProtectedRoute;
