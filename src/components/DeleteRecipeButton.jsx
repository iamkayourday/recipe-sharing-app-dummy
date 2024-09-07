import React from 'react';
import { useRecipeStore } from './recipeStore';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const DeleteRecipeButton = ({ recipeId }) => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRecipe(recipeId);
    navigate('/')
    setTimeout(() => {
      toast.success('Recipe deleted successfully!!');
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