import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';
import AddRecipeForm from './AddRecipeForm';
import SearchBar from './SearchBar';
import FavoritesList from './FavoritesList';
import RecommendationsList from './RecommendationsList';

const RecipeList = () => {
  const recipes = useRecipeStore(state => state.recipes);

  const { searchTerm, filterRecipes, filteredRecipes } = useRecipeStore((state) => ({
    searchTerm: state.searchTerm,
    filterRecipes: state.filterRecipes,
    filteredRecipes: state.filteredRecipes,
  }));

  useEffect(() => {
    filterRecipes();
  }, [searchTerm, filterRecipes]);

  return (
    <div>
      <SearchBar />
      <AddRecipeForm />
      <h1 style={{
          textAlign:'center',
          color:'#646cff',
          fontSize:"30px"
        }}>Recipe List</h1>
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
           
            <h2 style={{
              color:"slategray"
            }}>{recipe.title}</h2>
             <img src="https://via.placeholder.com/150" alt="recipe img" />
            <p style={{
              height:'auto',
              // width:'400px'
            }}>Description: {recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`}>View Details for {recipe.title}</Link>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    <FavoritesList />
    <RecommendationsList />
    </div>
  );
};

export default RecipeList;