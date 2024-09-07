import React, { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const EditRecipeForm = ({ recipe }) => {
  const navigate = useNavigate();
  const updateRecipe = useRecipeStore((state) => state.updateRecipe);
  
  const [title, setTitle] = useState(recipe.title);
  const [description, setDescription] = useState(recipe.description);
  const [instruction, setInstruction] = useState(recipe.instruction);
  const [image, setImage] = useState(recipe.image); // Initialize with current image
  const [errorMessage, setErrorMessage] = useState(''); // For showing validation errors

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    
    // Image validation conditions
    if (file) {
      const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const maxSize = 2 * 1024 * 1024; // 2MB max size

      if (!validFileTypes.includes(file.type)) {
        setErrorMessage('Please upload a valid image file (JPEG, PNG).');
        return;
      }

      if (file.size > maxSize) {
        setErrorMessage('File size should be less than 2MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set image if valid
        setErrorMessage(''); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !instruction.trim()) {
      setErrorMessage('Please fill in all the fields.');
      return;
    }

    updateRecipe({ ...recipe, title, description, instruction, image });
    navigate('/');
    setTimeout(() => {
      toast.success(`Recipe ${recipe.title} updated successfully`);
    }, 100);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        id='title'
        name='title'
        className='title'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Edit Recipe Title"
      />
      <textarea
        id='description'
        name='description'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Edit Recipe Description"
      />
      <textarea
        id='instruction'
        name='instruction'
        value={instruction}
        onChange={(e) => setInstruction(e.target.value)}
        placeholder="Edit Recipe Instruction..."
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />

      {/* Show preview of current or uploaded image */}
      {image && (
        <div>
          <img src={image} alt="Recipe Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
        </div>
      )}

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      <button className='Edit' type="submit">Update Recipe</button>
    </form>
  );
};

export default EditRecipeForm;