import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  if (!user) {
    return (
      <Navigate
        to="/auth/login"
        state={{ from: location.pathname, data: location.state }}
        replace
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
