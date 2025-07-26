import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProblemList from "../../components/Admin/ProblemList";
import CreateProblem from "../../components/Admin/CreateProblem";
import Navbar from "../../components/Admin/Navbar";
import Sidebar from "../../components/Admin/Sidebar";
import ProblemCard from "../../components/Admin/ProblemCard"
import api from "../../services/api";
import "./Dashboard.css";

const AdminDashboard = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchProblems();
  }, []);

  const fetchProblems = async () => {
    try {
      const response = await api.get("/problems");
      setProblems(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching problems:", error);
      setLoading(false);
    }
  };

  const handleCreateProblem = async (problemData) => {
    try {
      const response = await api.post("/problems", problemData);
      setProblems([response.data.problem, ...problems]);
      return { success: true };
    } catch (error) {
      console.error("Error creating problem:", error);
      return { success: false, error: error.response?.data?.message || "Failed to create problem" };
    }
  };

  const handleDeleteProblem = async (id) => {
    try {
      await api.delete(`/problems/${id}`);
      setProblems(problems.filter(problem => problem._id !== id));
      return { success: true };
    } catch (error) {
      console.error("Error deleting problem:", error);
      return { success: false, error: error.response?.data?.message || "Failed to delete problem" };
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="admin-dashboard">
      <Navbar 
        onToggleSidebar={toggleSidebar} 
        isSidebarOpen={sidebarOpen}
      />
      
      <Sidebar 
        isOpen={sidebarOpen} 
        onClose={closeSidebar}
      />

      <main className={`admin-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="content-wrapper">
          <Routes>
            <Route
              path="/problems"
              element={
                <ProblemList
                  problems={problems}
                  loading={loading}
                  onDelete={handleDeleteProblem}
                />
              }
            />
            <Route
              path="/create-problem"
              element={
                <CreateProblem
                  onCreate={handleCreateProblem}
                  existingProblems={problems}
                />
              }
            />
            <Route
              path="/problems/:id"
              element={
                <ProblemCard/>
              }
            />
            <Route index element={<Navigate to="/admin/problems" replace />} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;