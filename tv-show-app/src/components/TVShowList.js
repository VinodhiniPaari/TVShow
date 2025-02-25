import React, { useContext, useEffect, useMemo } from "react";
import debounce from "lodash.debounce";
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
  }, [showAll, page, loading]);

  const debouncedFilterChange = useMemo(
    () =>
      debounce((value) => {
        dispatch({ type: "SET_FILTER", payload: value });
      }, 500),
    []
  );

  return (
    <div className="container">
      {/* Hide search, sort, and auto-scroll if no data */}
      {(tvShows.length > 0 || loading) && (
        <div className="tvshow-header">
          <label htmlFor="search-tv-shows" className="visually-hidden">
            Search TV Shows
          </label>
          <input
            id="search-tv-shows"
            type="text"
            placeholder="Search TV Shows..."
            value={filter}
            onChange={(e) => debouncedFilterChange(e.target.value)}
            className="search-input"
            aria-label="Search TV Shows"
          />

          <label htmlFor="sort-by" className="visually-hidden">
            Sort TV Shows
          </label>
          <select
            id="sort-by"
            className="sort-dropdown"
            value={sortBy}
            onChange={(e) =>
              dispatch({ type: "SET_SORT", payload: e.target.value })
            }
            aria-label="Sort TV Shows"
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
                aria-checked={showAll}
                aria-label="Enable Auto Scroll"
              />
              <span className="slider" aria-hidden="true"></span>
            </label>
            <span className="toggle-label">
              {showAll ? "Auto Scroll Enabled" : "Enable Auto Scroll"}
            </span>
          </div>
        </div>
      )}

      <div
        className={`tv-show-list-container ${
          showAll ? "auto-scroll-enabled" : ""
        }`}
        role="region"
        aria-live="polite"
        aria-label="TV Show List"
      >
        {loading && page === 0 ? (
          <p role="status">Loading...</p>
        ) : error ? (
          <p className="error" role="alert">
            Error: {error}
          </p>
        ) : tvShows.length > 0 ? (
          <div className="row tv-show-list">
            {tvShows.map((show) => (
              <TVShowCard key={show.id} show={show} />
            ))}
          </div>
        ) : (
          <p role="status">No TV Shows found</p>
        )}
      </div>

      {/* Hide pagination if no TV shows */}
      {!showAll && tvShows.length > 0 && (
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
