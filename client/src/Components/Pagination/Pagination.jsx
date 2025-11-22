// import styles from "./Pagination.module.css";

// const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
//   return (
//     <>
//       {totalPages > 1 && (
//         <div className={styles.pagination}>
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//           >
//             Prev
//           </button>

//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               className={currentPage === index + 1 ? styles.activePage : ""}
//               onClick={() => handlePageChange(index + 1)}
//             >
//               {index + 1}
//             </button>
//           ))}

//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </>
//   );
// };

// export default Pagination;

import styles from "./Pagination.module.css";

const Pagination = ({ totalPages, currentPage, handlePageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 3;

    if (currentPage > 2) pages.push(1);

    if (currentPage > 3) pages.push("...");

    for (
      let i = Math.max(1, currentPage - 1);
      i <= Math.min(totalPages, currentPage + 1);
      i++
    ) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) pages.push("...");
    if (currentPage < totalPages - 1) pages.push(totalPages);

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      >
        Prev
      </button>

      {pages.map((page, index) =>
        page === "..." ? (
          <span key={index} className={styles.ellipsis}>
            ...
          </span>
        ) : (
          <button
            key={index}
            className={currentPage === page ? styles.activePage : ""}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
