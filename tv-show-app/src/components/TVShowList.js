import React, { useContext, useEffect } from "react";
import TVShowCard from "./TVShowCard";
import Pagination from "./Pagination";
import { TVShowContext } from "../context/TVShowContext";
import "../styles/TVShowList.css";

const TVShowList = () => {
  const { state, dispatch } = useContext(TVShowContext);
  const { tvShows, page, totalPages, loading, error, filter, sortBy, showAll } =
    state;

  useEffect(() => {
    if (!showAll || loading) return;
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const currentScroll = window.innerHeight + window.scrollY;

      if (currentScroll >= scrollHeight - 20) {
        dispatch({ type: "SET_PAGE", payload: page + 1 });
      }
    };
    const checkAndLoad = () => {
      if (document.documentElement.scrollHeight <= window.innerHeight) {
        dispatch({ type: "SET_PAGE", payload: page + 1 });
      }
    };
    window.addEventListener("scroll", handleScroll);
    requestAnimationFrame(checkAndLoad);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAll, page, dispatch, loading]);

  return (
    <div className="container">
      <div className="tvshow-header">
        <input
          type="text"
          placeholder="Search TV Shows..."
          value={filter}
          onChange={(e) =>
            dispatch({ type: "SET_FILTER", payload: e.target.value })
          }
          className="search-input"
        />
        <select
          className="sort-dropdown"
          value={sortBy}
          onChange={(e) =>
            dispatch({ type: "SET_SORT", payload: e.target.value })
          }
        >
          <option value="name">Sort by Name</option>
          <option value="rating">Sort by Rating</option>
          <option value="premiered">Sort by Date</option>
        </select>

        <div className="toggle-container">
          <label className="toggle-switch">
            <input
              type="checkbox"
              checked={showAll}
              onChange={() =>
                dispatch({ type: "SET_SHOW_ALL", payload: !showAll })
              }
            />
            <span className="slider"></span>
          </label>
          <span className="toggle-label">
            {showAll ? "Auto Scroll Enabled" : "Enable Auto Scroll"}
          </span>
        </div>
      </div>

      <div
        className={`tv-show-list-container ${
          showAll ? "auto-scroll-enabled" : ""
        }`}
      >
        {loading && page === 0 ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="error">Error: {error}</p>
        ) : tvShows.length > 0 ? (
          <div className="row tv-show-list">
            {tvShows.map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        ) : (
          <p>No TV Shows found</p>
        )}
      </div>

      {!showAll && (
        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={(newPage) =>
            dispatch({ type: "SET_PAGE", payload: newPage })
          }
        />
      )}
    </div>
  );
};

export default TVShowList;
