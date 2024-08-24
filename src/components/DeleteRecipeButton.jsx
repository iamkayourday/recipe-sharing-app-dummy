import React from 'react';
import { useRecipeStore } from './recipeStore';
import { useNavigate } from "react-router-dom";


const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/')
    setTimeout(() => {
      alert('Recipe deleted successfully');
    }, 100);
  };
setTimeout(() => {

}, 100)
  return (
    <button className='Del' onClick={handleDelete}>
        Delete Recipe
    </button>
  );
};

export default DeleteRecipeButton;