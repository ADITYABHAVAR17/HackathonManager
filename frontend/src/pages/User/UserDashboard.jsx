import { useAuth } from "../../context/AuthContext";

const UserDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>User Dashboard</h1>
      <p>
        Welcome, {user?.name} ({user?.role})
      </p>
      <button onClick={logout}>Logout</button>
      {/* User specific content here */}
    </div>
  );
};

export default UserDashboard;
