export const getPageNumbers = (currentPage, totalPages, maxPagesToShow = 5) => {
    if (totalPages <= maxPagesToShow) return Array.from({ length: totalPages }, (_, i) => i);
  
    const pages = [0];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages - 2, currentPage + 1);
  
    if (currentPage <= 1) end = 3;
    if (currentPage >= totalPages - 2) start = totalPages - 4;
  
    if (start > 1) pages.push(-1); 
    pages.push(...Array.from({ length: end - start + 1 }, (_, i) => start + i));
    if (end < totalPages - 2) pages.push(-2); 
    pages.push(totalPages - 1);
  
    return pages;
  };
  