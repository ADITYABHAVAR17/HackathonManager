import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import * as authService from "../services/a";
import * as authService from "../services/authService";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        if (token) {
          // Verify token and get user data
          const userData = await authService.verifyToken(token);
          setUser(userData);
        }
      } catch (error) {
        console.error("Authentication error:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [token]);

  const login = async (credentials) => {
    try {
      const { user, token } = await authService.login(credentials);
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      console.log(user);
      // Redirect based on role
      switch (user.role) {
        case "admin":
          navigate("/admin");
          break;
        case "judge":
          navigate("/judge");
        case "team":
          navigate("/home");
          break;
        default:
          navigate("/unathorized");
      }
    } catch (error) {
      throw error;
    }
  };

  const register = async (userData) => {
    try {
      const { user, token } = await authService.register(userData);
      setUser(user);
      setToken(token);
      localStorage.setItem("token", token);
      navigate("/user"); // Default redirect after registration
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
