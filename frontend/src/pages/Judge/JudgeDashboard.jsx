import { useAuth } from "../../context/AuthContext";

const JudgeDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Judge Dashboard</h1>
      <p>
        Welcome, {user?.name} ({user?.role})
      </p>
      <button onClick={logout}>Logout</button>
      {/* Admin specific content here */}
    </div>
  );
};

export default JudgeDashboard;
