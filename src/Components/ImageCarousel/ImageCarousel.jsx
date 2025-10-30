import { useState } from "react";

const ImageCarousel = ({ images = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goTo = (index) => {
    const total = images.length;
    const newIndex = index < 0 ? total - 1 : index % total;
    setCurrentIndex(newIndex);
  };

  if (!images.length)
    return <p style={{ textAlign: "center" }}>No images available.</p>;

  return (
    <div className="carousel">
      <div className="image-container">
        <img
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          // width="600px"
          // height="400px"
          loading="lazy"
          className="carousel-image"
        />
        <button
          type="button"
          id="Previous"
          className="prev-btn"
          onClick={() => {
            goTo(currentIndex - 1);
          }}
        >
          prev
        </button>
        <button
          type="button"
          id="Next"
          className="next-btn"
          onClick={() => {
            goTo(currentIndex + 1);
          }}
        >
          next
        </button>
      </div>
      <div className="dot-list">
        {images.map((item, index) => (
          <button
            type="button"
            key={item.src}
            id={`pageButton-${index}`}
            onClick={() => {
              goTo(index);
            }}
            className={`dot ${currentIndex === index ? "active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
