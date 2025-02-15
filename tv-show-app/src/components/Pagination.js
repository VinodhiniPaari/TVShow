import React, { useContext } from "react";
import { TVShowContext } from "../context/TVShowContext";
import "../styles/Pagination.css";

const Pagination = () => {
  const { state, dispatch } = useContext(TVShowContext);
  const { page, totalPages, totalRecords, pageSize } = state;

  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      dispatch({ type: "SET_PAGE", payload: newPage });
    }
  };

  return (
    <div className="pagination-container">
      {/* Page Size Selector */}
      <div className="page-size-selector">
        <label>Show</label>
        <select
          value={pageSize}
          onChange={(e) =>
            dispatch({ type: "SET_PAGE_SIZE", payload: Number(e.target.value) })
          }
        >
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span> per page</span>
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={() => handlePageChange(0)} disabled={page === 0}>
          «
        </button>
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 0}
        >
          ‹
        </button>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`pagination-button ${page === index ? "active" : ""}`}
            onClick={() => handlePageChange(index)}
          >
            {index + 1}
          </button>
        )).slice(Math.max(0, page - 2), Math.min(totalPages, page + 3))}

        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={page >= totalPages - 1}
        >
          ›
        </button>
        <button
          onClick={() => handlePageChange(totalPages - 1)}
          disabled={page >= totalPages - 1}
        >
          »
        </button>

        {/* Manual Page Input */}
        <input
          type="number"
          min="1"
          max={totalPages}
          value={page + 1}
          onChange={(e) => handlePageChange(Number(e.target.value) - 1)}
          className="page-input"
        />
        <span>
          {" "}
          of {totalPages} pages | {totalRecords} records
        </span>
      </div>
    </div>
  );
};

export default Pagination;
