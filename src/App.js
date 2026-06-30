import React, { useState, useEffect } from 'react';
import './App.css';
import { recipes as initialRecipes } from './data';
import RecipeCard from './components/RecipeCard';
import './components/RecipeCard.css';

function App() {
  const [recipes, setRecipes] = useState(initialRecipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecipe, setNewRecipe] = useState({
    name: '',
    image: '',
    calories: '',
    priceINR: '',
    category: '',
    description: '',
    ingredients: '',
    nutrition: { protein: '', carbs: '', fat: '' },
    dietary: []
  });
  const [cart, setCart] = useState([]);


  // Load recipes from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('recipes');
    if (saved) {
      try {
        setRecipes(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse recipes from localStorage', e);
        setRecipes(initialRecipes);
      }
    } else {
      setRecipes(initialRecipes);
    }
  }, []);

  // Save recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  }, [recipes]);

  // Handlers for search and filter
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Toggle add form
  const toggleAddForm = () => {
    setShowAddForm(!showAddForm);
    if (!showAddForm) {
      // reset form
      setNewRecipe({
        name: '',
        image: '',
        calories: '',
        priceINR: '',
        category: '',
        description: '',
        ingredients: '',
        nutrition: { protein: '', carbs: '', fat: '' },
        dietary: []
      });
    }
  };

  // Handle input changes for add form (non-nutrition)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecipe(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle nutrition field changes
  const handleNutritionChange = (field, e) => {
    setNewRecipe(prev => ({
      ...prev,
      nutrition: {
        ...prev.nutrition,
        [field]: e.target.value
      }
    }));
  };

  // Handle submit of add form
  const handleAddFormSubmit = (e) => {
    e.preventDefault();
    // Basic validation
    if (!newRecipe.name || !newRecipe.image || !newRecipe.category) {
      alert('Please fill in required fields: name, image URL, category');
      return;
    }
    const recipe = {
      id: Date.now(),
      name: newRecipe.name,
      image: newRecipe.image,
      calories: parseInt(newRecipe.calories) || 0,
      priceINR: parseInt(newRecipe.priceINR) || 0,
      category: newRecipe.category,
      description: newRecipe.description,
      ingredients: newRecipe.ingredients
        .split(',')
        .map(i => i.trim())
        .filter(i => i.length > 0),
      nutrition: {
        protein: parseFloat(newRecipe.nutrition.protein) || 0,
        carbs: parseFloat(newRecipe.nutrition.carbs) || 0,
        fat: parseFloat(newRecipe.nutrition.fat) || 0
      },
      dietary: newRecipe.dietary
    };
    setRecipes(prev => [...prev, recipe]);
    setShowAddForm(false);
    // reset form
    setNewRecipe({
      name: '',
      image: '',
      calories: '',
      priceINR: '',
      category: '',
      description: '',
      ingredients: '',
      nutrition: { protein: '', carbs: '', fat: '' },
      dietary: []
    });
  };

  // Cart functions
  const addToCart = (id) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) {
        return prev.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => {
      const recipe = recipes.find(r => r.id === item.id);
      return sum + (recipe ? recipe.priceINR * item.quantity : 0);
    }, 0);
  };

  // Filter recipes based on search and category
  const filteredRecipes = recipes.filter(recipe => {
    const matchesSearch =
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.ingredients.some(ing =>
        ing.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === 'All' || recipe.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = [
    'All',
    ...new Set(recipes.map(r => r.category))
  ].sort();

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <h1>Food Menu</h1>
          <div className="cart-wrapper">
            <span className="cart-icon">🛒</span>
            <span className="cart-count">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            <span className="cart-total">₹{getCartTotal()}</span>
          </div>
        </div>
      </header>
      <main>
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search by name or ingredient..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="category-select"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button
            className="add-btn"
            onClick={toggleAddForm}
          >
            + Add Recipe
          </button>
        </div>

        <div className="recipe-grid">
          {filteredRecipes.length === 0 ? (
            <p className="no-recipes">No recipes match your filters.</p>
          ) : (
            filteredRecipes.map(recipe => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onSelect={setSelectedRecipe}
                inCart={!!cart.find(item => item.id === recipe.id)}
                cartQuantity={cart.find(item => item.id === recipe.id)?.quantity || 0}
                onAddToCart={addToCart}
                onRemoveFromCart={removeFromCart}
                onUpdateQuantity={updateQuantity}
              />
            ))
          )}
        </div>

        {/* Recipe Detail Modal */}
        {selectedRecipe && (
          <div className="recipe-detail">
            <button onClick={() => setSelectedRecipe(null)} className="close-btn">
              ×
            </button>
            <div className="detail-content">
              <img src={selectedRecipe.image} alt={selectedRecipe.name} />
              <div>
                <h2>{selectedRecipe.name}</h2>
                <div className="detail-meta">
                  <div className="meta-left">
                    <span className="category-tag">{selectedRecipe.category}</span>
                    {selectedRecipe.dietary.map((tag, idx) => (
                      <span key={idx} className="dietary-badge">{tag}</span>
                    ))}
                  </div>
                  <div className="meta-right">
                    <span className="price">₹{selectedRecipe.priceINR}</span>
                    <span className="calories">{selectedRecipe.calories} kcal</span>
                  </div>
                </div>
                <div className="nutrition-info">
                  <h3>Nutrition (per serving)</h3>
                  <p>
                    Protein: {selectedRecipe.nutrition.protein}g&nbsp;|&nbsp;
                    Carbs: {selectedRecipe.nutrition.carbs}g&nbsp;|&nbsp;
                    Fat: {selectedRecipe.nutrition.fat}g
                  </p>
                </div>
                <h3 className="subheading">Description</h3>
                <p className="description-text">{selectedRecipe.description}</p>
                <h3 className="subheading">Ingredients</h3>
                <ul className="ingredients-list">
                  {selectedRecipe.ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
                <div className="modal-footer">
                  <div className="quantity-selector">
                    <button onClick={() => updateQuantity(selectedRecipe.id, -1)}>
                      -
                    </button>
                    <span>{cart.find(item => item.id === selectedRecipe.id)?.quantity || 1}</span>
                    <button onClick={() => updateQuantity(selectedRecipe.id, +1)}>
                      +
                    </button>
                  </div>
                  <button
                    className="add-to-cart-btn"
                    onClick={() => addToCart(selectedRecipe.id)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
          )
        }

        {/* Add Recipe Form Modal */}
        {showAddForm && (
          <div className="recipe-detail">
            <button onClick={toggleAddForm} className="close-btn">
              ×
            </button>
            <div className="detail-content" style={{ maxWidth: '500px' }}>
              <h2>Add New Recipe</h2>
              <form onSubmit={handleAddFormSubmit} className="add-recipe-form">
                <div className="form-group">
                  <label>Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={newRecipe.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Image URL:</label>
                  <input
                    type="text"
                    name="image"
                    value={newRecipe.image}
                    onChange={handleInputChange}
                    placeholder="e.g., https://example.com/image.jpg"
                  />
                </div>
                <div className="form-group">
                  <label>Category:</label>
                  <select
                    name="category"
                    value={newRecipe.category}
                    onChange={handleInputChange}
                  >
                    <option value="">Select category</option>
                    {categories
                      .filter(c => c !== 'All')
                      .map(cat => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Price (₹):</label>
                  <input
                    type="number"
                    name="priceINR"
                    value={newRecipe.priceINR}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Calories:</label>
                  <input
                    type="number"
                    name="calories"
                    value={newRecipe.calories}
                    onChange={handleInputChange}
                    min="0"
                  />
                </div>
                <div className="form-group">
                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={newRecipe.description}
                    onChange={handleInputChange}
                    rows="3"
                  />
                </div>
                <div className="form-group">
                  <label>Ingredients (comma separated):</label>
                  <input
                    type="text"
                    name="ingredients"
                    value={newRecipe.ingredients}
                    onChange={handleInputChange}
                    placeholder="e.g., flour, sugar, eggs"
                  />
                </div>
                <fieldset className="form-group">
                  <legend>Nutrition (per serving)</legend>
                  <div>
                    <label>
                      Protein (g):
                      <input
                        type="number"
                        value={newRecipe.nutrition.protein}
                        onChange={e => handleNutritionChange('protein', e)}
                        step="0.1"
                        min="0"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Carbs (g):
                      <input
                        type="number"
                        value={newRecipe.nutrition.carbs}
                        onChange={e => handleNutritionChange('carbs', e)}
                        step="0.1"
                        min="0"
                      />
                    </label>
                  </div>
                  <div>
                    <label>
                      Fat (g):
                      <input
                        type="number"
                        value={newRecipe.nutrition.fat}
                        onChange={e => handleNutritionChange('fat', e)}
                        step="0.1"
                        min="0"
                      />
                    </label>
                  </div>
                </fieldset>
                <div className="form-group">
                  <label>Dietary tags (comma separated):</label>
                  <input
                    type="text"
                    placeholder="e.g., Vegetarian, Vegan"
                    onChange={e => {
                      const vals = e.target.value
                        .split(',')
                        .map(v => v.trim())
                        .filter(v => v.length);
                      setNewRecipe(prev => ({ ...prev, dietary: vals }));
                    }}
                  />
                </div>
                <button type="submit" className="save-btn">
                  Save Recipe
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={toggleAddForm}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;