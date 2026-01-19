import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/Loading";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setError("");
    setBtnLoading(true);

    try {
      const res = await axios.post("http://localhost:3001/api/user/login", {
        email,
        password,
      });

      // Check if response has token
      if (res.data.token) {
        // Save token in localStorage
        localStorage.setItem("token", res.data.token);
        console.log("Saved token:", localStorage.getItem("token"));

        // Navigate to chat
        window.location.href = "/chat";
        // navigate("/chat");
      } else {
        // Show error message from backend
        setError(res.data.message || "Login failed");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setBtnLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#aee3e9" }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "20px",
          backgroundColor: "#fefefe",
        }}
      >
        <form onSubmit={submitHandler}>
          <h2 className="text-center mb-4" style={{ color: "#2f4f4f" }}>
            Login 🌸
          </h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control rounded-pill"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control rounded-pill"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#6dbcb6",
              color: "white",
              borderRadius: "30px",
            }}
          >
            {btnLoading ? <LoadingSpinner /> : "Submit"}
          </button>
        </form>

        <p className="mt-3 text-center">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
