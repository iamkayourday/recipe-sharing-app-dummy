import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import AddRecipeForm from './AddRecipeForm';
import SearchBar from './SearchBar';
import FavoritesList from './FavoritesList';
import RecommendationsList from './RecommendationsList';

const RecipeList = () => {
  const [showAddForm, setShowAddForm] = useState(false); // Toggle state for showing the form
  const recipes = useRecipeStore(state => state.recipes);

  const { searchTerm, filterRecipes, filteredRecipes } = useRecipeStore((state) => ({
    searchTerm: state.searchTerm,
    filterRecipes: state.filterRecipes,
    filteredRecipes: state.filteredRecipes,
  }));

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  // Toggle function to show or hide the form
  const toggleAddForm = () => {
    setShowAddForm(prevState => !prevState);
  };


  return (
    <div >
      <SearchBar />
      {/* Button to toggle the Add Recipe Form */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <button onClick={toggleAddForm} style={{
          backgroundColor: '#646cff',
          color: '#fff',
          border: 'none',
          padding: '10px 15px',
          borderRadius: '5px',
          cursor: 'pointer',
        }}>
          {showAddForm ? 'Close Form' : 'Add new Recipe'}
        </button>
      </div>
      <h1 style={{
        textAlign: 'center',
        color: '#646cff',
        fontSize: "30px"
      }}>Recipe List</h1>

      {/* Conditionally render the Add Recipe Form */}
      {showAddForm && <AddRecipeForm />}
      <div className='display'>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div className='list' key={recipe.id}>
            
              <h2 className='title' style={{ color: "slategray" }}>{recipe.title}</h2>

              {/* Display the recipe's image */}
              
                {recipe.image ? (
                  <img src={recipe.image} alt={recipe.title} style={{ width: '150px',height:"150px"  }} />
                ) : (
                  <img  src="https://via.placeholder.com/150" alt="recipe img" />
                )}
                <p style={{ height: 'auto', width:"500px" }}>Description: {recipe.description}</p>
                <Link to={`/recipe/${recipe.id}`}>View Details for {recipe.title}</Link>
            </div>
          
        ))
      ) : (
        <p className='no'>No recipes found.</p>
      )}
</div>
      <FavoritesList />
      <RecommendationsList />
    </div>
  );
};

export default RecipeList;