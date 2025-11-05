// StarRating.js

import React, { useState } from "react";

function StarRating() {
  // Step 1: Create state variables
  // use `rating` to store the selected rating, and `setRating` to update it

  const [rating, setRating] = useState(0);

  const handleSetRating = (star) => setRating(star);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Star Rating</h1>
      <h3>by NamasteDev</h3>

      {/* Step 2: Render 5 stars using a loop ★★★★★ */}
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            onClick={() => handleSetRating(star)}
            style={{
              cursor: "pointer",
              fontSize: "30px",
              color: `${star <= rating ? "gold" : "grey"}`,
            }}
          >
            ★
          </span>
        ))}
      </div>

      {/* Step 3: Update rating when a star is clicked */}
      {/* Step 4: Style stars based on rating */}

      {/* Step 5: Display current rating */}

      <p>Current Rating: {rating}</p>

      {/* Step 6: Add a Reset button to clear the rating */}
      <button
        type="button"
        style={{ margin: "1rem", padding: "0.5rem 1rem" }}
        onClick={() => setRating(0)}
      >
        Reset Rating
      </button>
    </div>
  );
}

export default StarRating;
