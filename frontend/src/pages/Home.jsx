import React from "react";
import icon from "../assets/icon.png";
import icon1 from "../assets/icon1.png";
import heroImg from "../assets/heroImg.png";
import { Link } from "react-router-dom";
import "../index.css";
const Home = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg sticky-top"
        style={{ backgroundColor: "#f2c2d4ff" }}
      >
        <div className="container">
          <Link to="/" className="navbar-brand d-flex align-items-center">
            <img src={icon} alt="icon" />
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
          >
            <span className="navbar-toggler-icon">
              <img
                src={icon1}
                alt="RoboIcon"
                style={{ width: "40px", height: "40px" }}
              />
            </span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul
              className="fw-bold navbar-nav mx-auto d-flex gap-4"
              style={{ gap: "20px" }}
            >
              <li className="nav-item ms-3">
                <Link to="/" className="nav-link hover-link">
                  Home
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/journal" className="nav-link hover-link">
                  Journal
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/resources" className="nav-link hover-link">
                  Resources
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/signup" className="nav-link hover-link">
                  SignUp
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link to="/login" className="nav-link hover-link">
                  Login
                </Link>
              </li>
            </ul>
            <Link
              to="/login"
              className="nav-link btn btn-success text-white rounded-pill ms-auto"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
      {/* 
      <div
        className="d-flex align-items-center justify-content-between vh-100 p-5 hero-section"
        style={{ backgroundColor: "#ecd1f8ff" }}
      >
        <div className="col-md-6">
          <h1 style={{ color: "#2f4f4f" }}>Welcome to SereneBot</h1>
          <p style={{ color: "#380b0bff", fontSize: "1.2rem" }}>
            Your friendly mental health companion. Chat, Write journal , relax,
            and feel better every day.
          </p>
        </div>
        <div className="col-md-6 text-center">
          <img
            src={heroImg}
            className="heroRobo"
            alt="heroImage"
            style={{ maxWidth: "300px" }}
          />
        </div>
      </div> */}
      {/* Hero Section */}
      <div className="d-flex align-items-center justify-content-between flex-wrap p-5 hero-section">
        <div className="col-md-6 hero-text">
          <h1 className="hero-title">
            Welcome to <span>SereneBot</span>
          </h1>
          <p className="hero-subtitle">
            Your friendly mental health companion. <br />
            Chat, write journals, relax, and feel better every day 🌼
          </p>
          <Link
            to="/signup"
            className="btn btn-success fw-bold rounded-pill mt-3 "
          >
            <b>Start Your Journey</b>
          </Link>
        </div>

        <div className="col-md-6 text-center">
          <img src={heroImg} className="heroRobo" alt="heroImage" />
        </div>
      </div>

      {/* Footer Section */}
      <footer
        className="text-center py-4 sticky-top"
        style={{
          backgroundColor: "#f2c2d4ff",
          color: "#4b0082",
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <p className="mb-0">
          🌸 Made with calmness by <strong>Anushka Mishra</strong> 🌸
        </p>
      </footer>
    </div>
  );
};

export default Home;
