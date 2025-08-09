import React, { createContext, useContext, useEffect, useState } from "react";
import { authDataContext } from "./AuthContext.jsx";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  let { serverUrl } = useContext(authDataContext);
  let [userData, setUserData] = useState(null);
  let [loading, setLoading] = useState(true);
  let [error, setError] = useState(null);

  const getCurrentUser = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log("Fetching current user from:", serverUrl + "/api/user/currentuser");
      
      let result = await axios.get(serverUrl + "/api/user/currentuser", {
        withCredentials: true,
      });
      
      console.log("Current user response:", result.data);
      setUserData(result.data);
      
    } catch (error) {
      console.error("getCurrentUser error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      
      setUserData(null);
      setError(error.response?.data?.message || "Failed to fetch user data");
      
      // Check if it's a 401 error
      if (error.response?.status === 401) {
        console.log("User not authenticated - 401 error");
      }
    } finally {
      setLoading(false);
    }
  };

  // Login function to be used after successful authentication
  const loginUser = async (loginData) => {
    try {
      console.log("Attempting login...");
      
      const response = await axios.post(serverUrl + "/api/auth/login", loginData, {
        withCredentials: true,
      });
      
      console.log("Login successful:", response.data);
      setUserData(response.data);
      setError(null);
      
      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      setError(error.response?.data?.message || "Login failed");
      throw error;
    }
  };

  // Logout function
  const logoutUser = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, {
        withCredentials: true,
      });
      
      setUserData(null);
      setError(null);
      console.log("Logout successful");
      
    } catch (error) {
      console.error("Logout error:", error);
      // Even if logout fails on server, clear local state
      setUserData(null);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  // Add axios response interceptor to handle 401 globally
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && userData) {
          console.log("Token expired or invalid - logging out");
          setUserData(null);
          setError("Session expired. Please login again.");
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => axios.interceptors.response.eject(interceptor);
  }, [userData]);

  let value = {
    userData,
    setUserData,
    loading,
    error,
    getCurrentUser,
    loginUser,
    logoutUser,
  };

  return (
    <div>
      <userDataContext.Provider value={value}>
        {children}
      </userDataContext.Provider>
    </div>
  );
}

export default UserContext;