import React, { useState, Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { FaTv, FaFilter, FaTimes } from "react-icons/fa";
import "../styles/Home.css";

const TvShowList = lazy(() => import("../components/TVShowList"));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-overlay">
          <h1 className="title">
            <FaTv className="icon" aria-hidden="true" /> Discover Your Favorite{" "}
            <span>TV Shows</span>
          </h1>
        </div>
      </header>

      <div className="main-content">
        {/* Sidebar */}
        <aside
          className={`sidebar ${isSidebarOpen ? "open" : ""}`}
          aria-label="Filter options"
        >
          <button
            className="close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close filter panel"
          >
            <FaTimes aria-hidden="true" />
          </button>
          <h2>Filters</h2>
          <label>
            <input type="checkbox" aria-label="Filter by Action genre" /> Action
          </label>
          <label>
            <input type="checkbox" aria-label="Filter by Drama genre" /> Drama
          </label>
          <label>
            <input type="checkbox" aria-label="Filter by Comedy genre" /> Comedy
          </label>
          <p>
            Note: This filter is for design purposes. Apply more filters and
            functionality in the future
          </p>
        </aside>

        {!isSidebarOpen && (
          <button
            className="sidebar-toggle"
            onClick={() => setIsSidebarOpen(true)}
            aria-label="Open filter panel"
          >
            <FaFilter aria-hidden="true" /> <span>Filters</span>
          </button>
        )}

        <main className={`content ${isSidebarOpen ? "shifted" : ""}`}>
          <h2 className="visually-hidden">TV Show List</h2>{" "}
          <Suspense fallback={<div>Loading TV Shows...</div>}>
            <TvShowList searchTerm={searchTerm} />
          </Suspense>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Home;
