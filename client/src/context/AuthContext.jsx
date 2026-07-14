import {
  createContext,
  useContext,
  useEffect,
  useState
} from "react";

import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser
} from "../services/authService.js"

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const register = async (userData) => {
    await registerService(userData);
  };

  const login = async (userData) => {
    const response = await loginService(userData);
    setUser(response.data.user);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
