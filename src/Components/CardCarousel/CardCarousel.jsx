import React, { useState } from "react";
import "./styles.css";

function CardCarousel({ cards }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnClick = (index) => {
    setCurrentIndex(index);
  };

  if(!cards || cards.length === 0) return <p>No cards available</p>

  return (
    <div>
      {/* write code here */}
      {cards?.map(
        (card, index) =>
          currentIndex === index && (
            <div key={index}>
              <h2>{card.title}</h2>
              <p>{card.description} </p>
            </div>
          )
      )}

      <footer>
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => {
            handleOnClick(currentIndex - 1);
          }}
        >
          Previous
        </button>
        {`${currentIndex + 1} of ${cards.length}`}
        <button
          type="button"
          disabled={currentIndex === cards.length - 1}
          onClick={() => {
            handleOnClick(currentIndex + 1);
          }}
        >
          Next
        </button>
      </footer>
    </div>
  );
}

export default CardCarousel;
