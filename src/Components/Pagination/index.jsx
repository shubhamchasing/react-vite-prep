import { useState, useEffect, useMemo } from "react";
import "./styles.css";
import ProductCard from "./ProductCard.jsx";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";

const PAGE_SIZE = 10;

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
        {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
          <button
            className={`pagination-btn ${
              currentPage === pageNum ? "active" : ""
            }`}
            key={pageNum}
            onClick={() => handleChangePage(pageNum)}
          >
            {pageNum}
          </button>
        ))}
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
