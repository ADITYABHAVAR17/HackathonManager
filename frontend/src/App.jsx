import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AdminDashboard from "./pages/Admin/Dashboard";
import UserDashboard from "./pages/User/UserDashboard";
import JudgeDashboard from "./pages/Judge/JudgeDashboard";
import { Navigate } from "react-router-dom";
import Home from "./pages/common/Home";
import ProblemCard from "./pages/common/ProductCard";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Auth Routes */}
          <Route path="/home" element={<Home/>} />
         
          <Route path="/problems/:id" element={<ProblemCard />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["judge"]} />}>
            <Route path="/judge/*" element={<JudgeDashboard />} />
          </Route>

          <Route
            element={
              <ProtectedRoute allowedRoles={["team", "admin", "judge"]} />
            }
          >
            <Route path="/user/*" element={<UserDashboard />} />
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/auth/login" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
