import { useMemo } from "react";

const MAX_PAGES_TO_SHOW = 5;

const getPageNumbers = (currentPage, totalPages) => {
  const pages = [];
  if (totalPages <= MAX_PAGES_TO_SHOW) {
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    pages.push(0);
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages - 2, currentPage + 1);
    if (currentPage <= 1) {
      end = 3;
    } else if (currentPage >= totalPages - 2) {
      start = totalPages - 4;
    }
    if (start > 1) {
      pages.push(-1);
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    if (end < totalPages - 2) {
      pages.push(-2); 
    }
    pages.push(totalPages - 1);
  }
  return pages;
};

const NavigationButton = ({ onClick, disabled, children, ariaLabel }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className="px-3 py-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
    aria-label={ariaLabel}
  >
    {children}
  </button>
);

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = useMemo(
    () => getPageNumbers(currentPage, totalPages),
    [currentPage, totalPages]
  );

  const renderPageButton = (pageNumber) => {
    if (pageNumber < 0) {
      return (
        <span key={`ellipsis-${pageNumber}`} className="px-3 py-2">
          ...
        </span>
      );
    }
    return (
      <button
        key={pageNumber}
        onClick={() => onPageChange(pageNumber)}
        className={`px-3 py-2 rounded-md ${
          currentPage === pageNumber ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"
        }`}
        aria-label={`Page ${pageNumber + 1}`}
        aria-current={currentPage === pageNumber ? "page" : undefined}
      >
        {pageNumber + 1}
      </button>
    );
  };

  if (totalPages === 0) {
    return null; 
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <NavigationButton
        onClick={() => onPageChange(Math.max(0, currentPage - 1))}
        disabled={currentPage === 0}
        ariaLabel="Previous page"
      >
        &laquo;
      </NavigationButton>

      {pageNumbers.map((pageNumber) => renderPageButton(pageNumber))}

      <NavigationButton
        onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))}
        disabled={currentPage === totalPages - 1}
        ariaLabel="Next page"
      >
        &raquo;
      </NavigationButton>
    </div>
  );
}