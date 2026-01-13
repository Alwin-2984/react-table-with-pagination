import React, { memo, useMemo } from "react";

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  handlePageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pagination?: boolean;
}

const PaginationInner: React.FC<PaginationProps> = ({
  totalPages = 1,
  currentPage = 1,
  handlePageChange,
  pageSize,
  onPageSizeChange,
  pagination,
}) => {
  // Memoize page numbers calculation to avoid recalculating on every render
  const pageNumbers = useMemo((): (number | string)[] => {
    const pages: (number | string)[] = [];
    const totalPagesToShow = 3;
    const ellipsis = "...";

    if (totalPages <= totalPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= totalPagesToShow + 1; i++) {
          pages.push(i);
        }
        pages.push(ellipsis);
      } else if (currentPage >= totalPages - 2) {
        pages.push(ellipsis);
        for (let i = totalPages - totalPagesToShow; i < totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push(ellipsis);
      }

      if (totalPages > 1) {
        pages.push(totalPages);
      }
    }

    return pages;
  }, [totalPages, currentPage]);

  return (
    <>
      {pagination && (
        <div className="tstc-pagination">
          {/* Left side - Items per page selector */}
          <div className="tstc-pagination-controls">
            <span className="tstc-pagination-label">Rows per page:</span>
            <select
              value={pageSize}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onPageSizeChange(Number(e.target.value))
              }
              className="tstc-pagination-select"
            >
              {[5, 7, 10, 15, 20, 50, 100, 1000, 10000].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Right side - Pagination controls */}
          <div className="tstc-pagination-info">
            {/* Page info */}
            <span className="tstc-pagination-label">
              Page {currentPage} of {totalPages}
            </span>

            {/* Navigation */}
            <nav className="tstc-pagination-nav" aria-label="Pagination">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="tstc-pagination-button"
                aria-label="First Page"
              >
                <svg
                  className="tstc-pagination-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Previous */}
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="tstc-pagination-button"
                aria-label="Previous Page"
              >
                <svg
                  className="tstc-pagination-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              {/* Page Numbers */}
              {pageNumbers.map((page, index) => {
                const isActive = currentPage === page;
                const isEllipsis = page === "...";
                const pageClasses = isActive
                  ? "tstc-pagination-page tstc-pagination-page-active"
                  : isEllipsis
                  ? "tstc-pagination-page tstc-pagination-page-ellipsis"
                  : "tstc-pagination-page tstc-pagination-page-inactive";

                return (
                  <button
                    key={index}
                    onClick={() =>
                      typeof page === "number" && handlePageChange(page)
                    }
                    disabled={isEllipsis}
                    className={pageClasses}
                  >
                    {page}
                  </button>
                );
              })}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="tstc-pagination-button"
                aria-label="Next Page"
              >
                <svg
                  className="tstc-pagination-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Last Page */}
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="tstc-pagination-button"
                aria-label="Last Page"
              >
                <svg
                  className="tstc-pagination-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

// Memoize to prevent unnecessary re-renders when props haven't changed
const Pagination = memo(PaginationInner);

export default Pagination;
