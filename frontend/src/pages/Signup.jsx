import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { LoadingSpinner } from "../components/Loading";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // To store validation errors
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();

  const validate = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "Name is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return; // Stop submission if errors exist
    }

    setBtnLoading(true); //starts loading
    // If no errors, proceed with axios

    // axios
    //   .post("http://localhost:3001/api/user/signup", { name, email, password })
    //   .then((result) => {
    //     console.log(result);
    //     navigate("/login");
    //   })
    //   .catch((err) => console.log(err));
    // setBtnLoading(false);

    try {
      const result = await axios.post("http://localhost:3001/api/user/signup", {
        name,
        email,
        password,
      });
      console.log(result);
      navigate("/login"); // redirect after successful signup
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Something went wrong!");
    } finally {
      setBtnLoading(false); // ensures button stops loading in both success/failure
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#d2e69bff" }}
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
            SignUp 🌸
          </h2>

          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`form-control rounded-pill ${
                errors.name ? "is-invalid" : ""
              }`}
              placeholder="Enter your name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`form-control rounded-pill ${
                errors.email ? "is-invalid" : ""
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <div className="invalid-feedback">{errors.email}</div>
            )}
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
              className={`form-control rounded-pill ${
                errors.password ? "is-invalid" : ""
              }`}
              placeholder="Enter password"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>

          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "#adcc58ff",
              color: "white",
              borderRadius: "30px",
            }}
          >
            {btnLoading ? <LoadingSpinner /> : "Create Account"}
          </button>
        </form>

        <p className="mt-3">Already Have an Account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
