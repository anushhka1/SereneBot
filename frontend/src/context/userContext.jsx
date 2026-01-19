import { createContext, useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Login user function
  async function loginUser(email, password, navigate) {
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/user/login", // fixed port
        { email, password }
      );

      // Save token and user in localStorage
      localStorage.setItem("token", data.token);
      setUser(data.user);

      toast.success("Login successful!");
      navigate("/chat"); // redirect after login
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    }
  }

  // Fetch logged-in user
  async function fetchUser() {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);
      setLoading(false); // stop loading when no token
      return;
    }

    try {
      const { data } = await axios.get("http://localhost:3001/api/user/me", {
        // fixed port
        headers: { Authorization: `Bearer ${token}` },
        params: { t: Date.now() },
      });
      setUser(data);
    } catch (error) {
      console.log("Fetch user failed:", error);
      setUser(null);
    } finally {
      setLoading(false); // always stop loading after fetch
    }
  }

  // Auto-fetch user on app load
  useEffect(() => {
    fetchUser();
  }, []);

  const isAuth = !!user;

  const logoutHandler = (navigate) => {
    // localStorage.clear();
    localStorage.removeItem("token");

    setUser(null);
    navigate("/login");
    toast.success("Logged out succesfully!");
  };
  return (
    <UserContext.Provider
      value={{ loginUser, user, isAuth, loading, logoutHandler }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const UserData = () => useContext(UserContext);
