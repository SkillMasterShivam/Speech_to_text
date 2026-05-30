import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { loginUser, registerUser, getMe } from '../../../services/api';

const AuthContext = createContext(null);

const TOKEN_KEY = 'speechflow_token';
const USER_KEY = 'speechflow_user';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const isAuthenticated = currentUser !== null;

  // On mount, verify stored token with the backend
  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getMe();
        const user = res.data;
        setCurrentUser(user);
        localStorage.setItem(USER_KEY, JSON.stringify(user));
      } catch (err) {
        // Token invalid or expired — clear everything
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = useCallback(async (email, password) => {
    try {
      setError(null);

      if (!email || !password) {
        throw new Error('Email and password are required.');
      }

      const res = await loginUser(email, password);

      // Store token and user data
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
      setCurrentUser(res.data);

      return res.data;
    } catch (err) {
      setError(err.message || 'Login failed.');
      throw err;
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      setError(null);

      if (!name || !email || !password) {
        throw new Error('Name, email, and password are all required.');
      }

      const res = await registerUser(name, email, password);

      // Store token and user data
      localStorage.setItem(TOKEN_KEY, res.token);
      localStorage.setItem(USER_KEY, JSON.stringify(res.data));
      setCurrentUser(res.data);

      return res.data;
    } catch (err) {
      setError(err.message || 'Registration failed.');
      throw err;
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setCurrentUser(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value = {
    currentUser,
    loading,
    error,
    isAuthenticated,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.');
  }
  return context;
}
