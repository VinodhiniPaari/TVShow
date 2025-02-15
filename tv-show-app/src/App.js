import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { TVShowProvider } from "./context/TVShowContext"; // State management
import AppRoutes from "./Routes"; // Import centralized routes

const App = () => {
  return (
    <TVShowProvider>
      <Router>
        <div className="app-container">
          <AppRoutes />
        </div>
      </Router>
    </TVShowProvider>
  );
};

export default App;
