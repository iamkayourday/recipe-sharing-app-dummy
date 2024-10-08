import React from 'react';
import { useRecipeStore } from './recipeStore';
import EditRecipeForm from './EditRecipeForm';
import DeleteRecipeButton from './DeleteRecipeButton';
import { useParams } from 'react-router-dom';

const RecipeDetails = () => {
  const { id } = useParams(); // Get the ID from the URL params
  const recipe = useRecipeStore((state) =>
    state.recipes.find((recipe) => recipe.id === id)
  );

  if (!recipe.description) {
    return <div>Recipe not found</div>;
  }

  return (
    <div style={{width:'100%', padding:"10px"}}>
      <h2 style={{color:'slategray'}}>{recipe.title}</h2>
      <p style={{
        height:'auto',
        backgroundColor:'grey'
      }}>{recipe.instruction}</p>
      <EditRecipeForm recipe={recipe} />
      <DeleteRecipeButton recipeId={id} />
    </div>
  );
};

export default RecipeDetails;
