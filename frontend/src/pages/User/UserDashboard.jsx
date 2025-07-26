import { useAuth } from "../../context/AuthContext";
import React from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const { user, logout } = useAuth();
  const { id } = useParams();
      const navigate = useNavigate();
    const location = useLocation();
    const problem = location.state?.problem;
    console.log("User Dashboard - Problem:", problem);

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>Welcome, {user?.name || "User"}!</p>
      <p>Your role: {user?.role || "N/A"}</p>
      <p>Problem ID: {problem?._id || "N/A"}</p>  
    </div>
  );
};

export default UserDashboard;
