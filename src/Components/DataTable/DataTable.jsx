import { useState } from "react";
import "./styles.css";

function DataTable({ data }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const totalPages = Math.ceil(data.length / pageSize);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to first page on page size change
  };

  const StartIndex = (currentPage - 1) * pageSize;
  const currentData = data.slice(StartIndex, StartIndex + pageSize);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      {/* Implement table with pagination here */}
      <h2>Data Table</h2>
      {data.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <>
          <table
            border="1"
            cellPadding="5"
            // cellSpacing="0"
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentData.map((item) => (
                <tr key={item.id}>
                  {headers.map((header) => (
                    <td key={header} style={{ padding: "10px" }}>
                      {item[header]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Previous
              </button>

              <span style={{ margin: "0 10px" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>

            <div>
              <label>Items per page: </label>
              <select value={pageSize} onChange={handlePageSizeChange}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DataTable;
