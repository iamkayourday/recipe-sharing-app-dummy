import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

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
      {filteredRecipes.length > 0 ? (
        filteredRecipes.map((recipe) => (
          <div key={recipe.id}>
            <h2 style={{
              color:"slategray"
            }}>{recipe.title}</h2>
            <p style={{
              height:'auto',
              width:'400px'
            }}>Description: {recipe.description}</p>
            <Link to={`/recipe/${recipe.id}`}>View Details for {recipe.title}</Link>
          </div>
        ))
      ) : (
        <p>No recipes found.</p>
      )}
    </div>
  );
};

export default RecipeList;