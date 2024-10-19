import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./pagination.scss";

const Pagination = ({ totalItems, itemsPerPage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const currentPage = parseInt(params.get("page")) || 1;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    params.set("page", page);
    navigate({ search: params.toString() });
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            className={
              "pagination__pages " + (i === currentPage ? "active" : "")
            }
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      // Always show the first page
      pages.push(
        <button
          key={1}
          className={
            "pagination__pages " + (1 === currentPage ? " active" : "")
          }
          onClick={() => handlePageChange(1)}
        >
          1
        </button>
      );

      // Show dots
      if (currentPage > 2) {
        pages.push(<span key="dots1">...</span>);
      }

      // Show the middle pages around the current page
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(
          <button
            key={i}
            className={
              "pagination__pages " + (i === currentPage ? "active" : "")
            }
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      }

      // Show dots
      if (currentPage < totalPages - 1) {
        pages.push(<span key="dots2">...</span>);
      }

      // Always show the last page
      pages.push(
        <button
          key={totalPages}
          className={
            "pagination__pages " + (totalPages === currentPage ? "active" : "")
          }
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button
        className="pagination__prev pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Back
      </button>
      {renderPageNumbers()}
      <button
        className="pagination__next pagination__button"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
