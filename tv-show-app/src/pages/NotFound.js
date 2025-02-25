import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px" }}
      role="alert"
      aria-live="assertive"
    >
      <h1 tabIndex="0">404 - Page Not Found</h1>
      <p tabIndex="0">Oops! The page you are looking for does not exist.</p>
      <button
        onClick={() => navigate("/")}
        style={{ padding: "10px 20px", cursor: "pointer" }}
        aria-label="Go back to the homepage"
      >
        Go Home
      </button>
    </div>
  );
};

export default NotFound;
