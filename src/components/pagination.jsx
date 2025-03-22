import { useMemo } from "react";
import { getPageNumbers } from "../utils/getPageNumbers";
import { NavigationButton } from "./ui/navigation-button";



export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = useMemo(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages]);

  if (totalPages === 0) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <NavigationButton onClick={() => onPageChange(Math.max(0, currentPage - 1))} disabled={currentPage === 0} ariaLabel="Previous page">
        &laquo;
      </NavigationButton>

      {pageNumbers.map((pageNumber) => (
        pageNumber < 0 ? (
          <span key={`ellipsis-${pageNumber}`} className="px-3 py-2">...</span>
        ) : (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-2 rounded-md ${currentPage === pageNumber ? "bg-teal-600 text-white" : "bg-gray-100 hover:bg-gray-200"}`}
            aria-label={`Page ${pageNumber + 1}`}
            aria-current={currentPage === pageNumber ? "page" : undefined}
          >
            {pageNumber + 1}
          </button>
        )
      ))}

      <NavigationButton onClick={() => onPageChange(Math.min(totalPages - 1, currentPage + 1))} disabled={currentPage === totalPages - 1} ariaLabel="Next page">
        &raquo;
      </NavigationButton>
    </div>
  );
}
