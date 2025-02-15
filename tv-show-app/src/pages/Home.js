import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TvShowList from "../components/TVShowList";
import { FaTv, FaFilter, FaTimes } from "react-icons/fa";
import "../styles/Home.css";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-overlay">
          <h1 className="title">
            <FaTv className="icon" /> Discover Your Favorite{" "}
            <span>TV Shows</span>
          </h1>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>
            <FaTimes />
          </button>
          <h3>Filters</h3>
          <label>
            <input type="checkbox" /> Action
          </label>
          <label>
            <input type="checkbox" /> Drama
          </label>
          <label>
            <input type="checkbox" /> Comedy
          </label>
          <p>
            Note: This filter is for design purposes. Apply more filters and
            functionality in the future
          </p>
        </div>

        {!isSidebarOpen && (
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(true)}
          >
            <FaFilter /> <span>Filters</span>
          </button>
        )}

        <div className={`content ${isSidebarOpen ? "shifted" : ""}`}>
          <TvShowList searchTerm={searchTerm} />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Home;
