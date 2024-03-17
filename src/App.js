import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
    try {
      const response = await fetch('/api/recipes'); // Assuming backend API endpoint for fetching recipes
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRecipes = recipes.filter(recipe =>
    recipe.recipe_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Recipe Database</h1>
      <div className="search">
        <input
          type="text"
          placeholder="Search recipes..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="recipe-list">
        {filteredRecipes.map(recipe => (
          <div key={recipe.recipe_id} className="recipe-card">
            <h2>{recipe.recipe_name}</h2>
            <p><strong>Description:</strong> {recipe.description}</p>
            <p><strong>Instructions:</strong> {recipe.instructions}</p>
            <p><strong>Quantity:</strong> {recipe.quantity}</p>
            <p><strong>Type:</strong> {recipe.recipe_type}</p>
            <p><strong>Ingredient ID:</strong> {recipe.ingredient_id}</p>
            <p><strong>Category ID:</strong> {recipe.category_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
