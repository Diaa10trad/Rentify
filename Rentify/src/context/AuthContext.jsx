import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    id: null,
    token: null,
  });

  const [loading, setLoading] = useState(true); // Loading state to delay rendering

  useEffect(() => {
    // Check if a token and user exist in localStorage
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    console.log("Token in localStorage:", token); // Check if the token is being retrieved correctly
    console.log("User in localStorage:", id); // Check if the user data is being retrieved correctly

    if (token && id) {
      setAuth({
        isAuthenticated: true,
        id,
        token,
      });
    } else {
      console.log("No token or user found in localStorage."); // Log when no token or user is found
    }
    setLoading(false); // Loading is complete after the initial check
  }, []);

  const login = (token, id) => {
    localStorage.setItem("token", token);
    localStorage.setItem("id", JSON.stringify(id));
    setAuth({
      isAuthenticated: true,
      id,
      token,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    setAuth({
      isAuthenticated: false,
      id: null,
      token: null,
    });
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator until auth state is restored
  }

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access to the AuthContext
export function useAuth() {
  return useContext(AuthContext);
}
