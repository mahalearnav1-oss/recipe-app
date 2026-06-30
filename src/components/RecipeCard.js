import React from 'react';
import './RecipeCard.css';

const RecipeCard = ({ recipe, onSelect, inCart, cartQuantity, onAddToCart }) => {
  const handleClick = () => {
    onSelect(recipe);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevent triggering the card select
    onAddToCart(recipe.id);
  };

  return (
    <div className="recipe-card" onClick={handleClick}>
      <img src={recipe.image} alt={recipe.name} />
      <div className="recipe-info">
        <h3>{recipe.name}</h3>
        <span className="category-tag">{recipe.category}</span>
        <p className="price">₹{recipe.priceINR}</p>
        <p className="calories">{recipe.calories} kcal</p>
        {inCart ? (
          <div className="cart-status">
            <span>In cart: {cartQuantity}</span>
          </div>
        ) : (
          <button className="add-btn" onClick={handleAddClick}>
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default RecipeCard;