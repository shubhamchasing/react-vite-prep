import { useState, useEffect, useMemo } from "react";
import "./styles.css";
import ProductCard from "./ProductCard.jsx";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const PAGE_SIZE = 10;
const DOTS = "DOTS";

const Pagination = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch(`https://dummyjson.com/products?limit=${200}`);
      const data = await res.json();
      setProducts(data.products);
    }
    fetchProducts();
  }, []);

  const handleChangePage = (pageNum) => {
    if (pageNum === currentPage) return;
    setCurrentPage(pageNum);
  };
  const totalPage = useMemo(
    () => Math.ceil(products.length / PAGE_SIZE),
    [products]
  );

  const showProducts = useMemo(() => {
    return products.slice(
      (currentPage - 1) * PAGE_SIZE,
      currentPage * PAGE_SIZE
    );
  }, [currentPage, products]);

  const windowedPagination = useMemo(() => {
    if (totalPage <= 5) {
      return Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    const pages = [];

    // Start zone
    if (currentPage <= 3) {
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push(DOTS, totalPage);
      return pages;
    }

    // End zone
    if (currentPage >= totalPage - 2) {
      pages.push(1, DOTS);
      for (let i = totalPage - 3; i <= totalPage; i++) {
        pages.push(i);
      }
      return pages;
    }

    // Middle zone
    pages.push(1, DOTS);
    pages.push(currentPage - 1, currentPage, currentPage + 1);
    pages.push(DOTS, totalPage);
    return pages;
  }, [currentPage, totalPage]);

  if (products.length === 0) {
    return <h2>No products found</h2>;
  }

  return (
    <div className="container">
      <h1>Pagination</h1>
      <span className="pagination-bar">
        <button
          id="previous"
          className="pagination-btn"
          disabled={currentPage === 1}
          onClick={() => handleChangePage(currentPage - 1)}
        >
          <FiChevronsLeft />
        </button>
        {windowedPagination.map((pageNum, index) => {
          if (pageNum === DOTS) {
            return <span key={pageNum + index}>...</span>;
          }
          return (
            <button
              className={`pagination-btn ${
                currentPage === pageNum ? "active" : ""
              }`}
              key={pageNum}
              onClick={() => handleChangePage(pageNum)}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          id="next"
          className="pagination-btn"
          disabled={currentPage === totalPage}
          onClick={() => handleChangePage(currentPage + 1)}
        >
          <FiChevronsRight />
        </button>
      </span>
      <div className="card-container">
        {showProducts?.map((product) => (
          <ProductCard
            id={product.id}
            key={product.id}
            image={product.thumbnail}
            title={product.title}
          />
        ))}
      </div>
    </div>
  );
};
export default Pagination;
