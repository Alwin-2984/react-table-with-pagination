import React from "react";

interface PaginationProps {
  totalPages?: number;
  currentPage?: number;
  handlePageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  pagination?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalPages = 1,
  currentPage = 1,
  handlePageChange,
  pageSize,
  onPageSizeChange,
  pagination,
}) => {
  const getPageNumbers = (): (number | string)[] => {
    const pageNumbers: (number | string)[] = [];
    const totalPagesToShow = 3;
    const ellipsis = "...";

    if (totalPages <= totalPagesToShow + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);

      if (currentPage <= 3) {
        for (let i = 2; i <= totalPagesToShow + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(ellipsis);
        for (let i = totalPages - totalPagesToShow; i < totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(ellipsis);
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(ellipsis);
      }

      if (totalPages > 1) {
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      {pagination && (
        <div className="flex w-full min-w-[443px] items-center justify-between rounded-b-lg bg-white px-4 py-3 dark:bg-gray-800">
          {/* Left side - Items per page selector */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500 max-sm:hidden dark:text-gray-400">
              Rows per page:
            </span>
            <select
              value={pageSize}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                onPageSizeChange(Number(e.target.value))
              }
              className="block w-20 rounded-md border-gray-200 bg-white text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-400"
            >
              {[5, 7, 10, 15, 20, 50, 100, 1000, 10000].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Right side - Pagination controls */}
          <div className="flex items-center gap-4">
            {/* Page info */}
            <span className="text-sm text-gray-500 max-sm:hidden dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>

            {/* Navigation */}
            <nav className="flex items-center gap-1" aria-label="Pagination">
              {/* First Page */}
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="First Page"
              >
                <svg
                  className="h-5 w-5"
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
                className="p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="Previous Page"
              >
                <svg
                  className="h-5 w-5"
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
              {pageNumbers.map((page, index) => (
                <button
                  key={index}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                  disabled={page === "..."}
                  className={`flex h-8 min-w-[32px] items-center justify-center rounded text-sm font-medium transition-colors ${
                    currentPage === page
                      ? "bg-blue-500 text-white dark:bg-blue-600"
                      : page === "..."
                      ? "cursor-default text-gray-400 dark:text-gray-500"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  } ${page === "..." ? "cursor-default" : "cursor-pointer"} `}
                >
                  {page}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="Next Page"
              >
                <svg
                  className="h-5 w-5"
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
                className="p-1 text-gray-400 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50 dark:text-gray-500 dark:hover:text-gray-300"
                aria-label="Last Page"
              >
                <svg
                  className="h-5 w-5"
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

export default Pagination;




