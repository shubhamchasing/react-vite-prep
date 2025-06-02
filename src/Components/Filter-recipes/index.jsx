import { useMemo, useState } from "react";
import "./styles.css";
import recipesData from "./recipesData";

// const ratingList = ["4.0+", "4.3+", "4.5+", "4.7+", "4.9"];
const ratingList = [
  { rating: "4.0+", value: 4.0 },
  { rating: "4.3+", value: 4.3 },
  { rating: "4.5+", value: 4.5 },
  { rating: "4.7+", value: 4.7 },
  { rating: "4.9", value: 4.9 },
];

const RecipeFilterApp = () => {
  const [recipeList, setRecipeList] = useState(recipesData);
  const [selectRating, setSelectRating] = useState("4.0+");
  const [totalCartItems, setTotalCartItems] = useState(0);

  const avgRating = useMemo(() => {
    const totalRating = recipeList.reduce(
      (acc, curr) => acc + parseFloat(curr.rating),
      0
    );
    return (totalRating / (recipeList.length || 1)).toFixed(2);
  }, [recipeList]);

  const totalRecipe = recipeList.length;

  const handleSelectRating = (e) => {
    setSelectRating(e.target.value);
    const value = parseFloat(e.target.value);
    const filteredRecipeList = recipesData.filter(
      (recipe) => recipe.rating >= value
    );
    setRecipeList(filteredRecipeList);
  };

  const handleAddToCart = () => {
    setTotalCartItems((prev) => ++prev);
  };

  return (
    <div>
      <h1>🍽️ Recipe Explorer</h1>
      <div className="app-container">
        <div className="filter-cart-section">
          <div className="filter">
            <label htmlFor="ratingFilter">Filter by Rating: </label>
            <select
              name="ratingFilter"
              id="ratingFilter"
              value={selectRating}
              onChange={handleSelectRating}
            >
              {ratingList.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.rating}
                </option>
              ))}
            </select>
          </div>
          <div className="cart-items">{`Cart items: ${totalCartItems}`}</div>
        </div>
        <div className="avg-rating">
          Average Rating: {avgRating} ({totalRecipe} recipes)
        </div>
        <div className="recipe-cards-container">
          {recipeList.map((recipe) => {
            return (
              <div key={recipe.id} className="recipe-card">
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="recipe-img"
                />
                <h4>{recipe.name}</h4>
                <p>🍴 Cuisine: {recipe.cuisine}</p>
                <p>
                  ⭐ Rating: {recipe.rating} ({recipe.reviewCount} reviews)
                </p>
                <button className="add-to-cart-btn" onClick={handleAddToCart}>
                  Add to cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RecipeFilterApp;
