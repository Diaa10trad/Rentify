import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    // Check if a token and user exists in localStorage
    const token = localStorage.getItem("token");
    const userString = localStorage.getItem("user");

    // Only parse the user if userString is not null or undefined
    let user = null;
    if (userString) {
      try {
        user = JSON.parse(userString);
      } catch (error) {
        console.error("Error parsing user JSON:", error);
        // Handle corrupted JSON by clearing the user from localStorage
        localStorage.removeItem("user");
      }
    }

    // If both token and user are valid, set the auth state
    if (token && user) {
      setAuth({
        isAuthenticated: true,
        user,
        token,
      });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setAuth({
      isAuthenticated: true,
      user,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuth({
      isAuthenticated: false,
      user: null,
      token: null,
    });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//custom hook for easy access to the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
