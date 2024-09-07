import { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { toast } from 'react-toastify';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore(state => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();
    const generateUniqueId = () => `${Date.now()}-${Math.random()}`;
    addRecipe({ id: generateUniqueId(), instruction, title, description });
    setTitle('');
    setDescription('');
    setInstruction('');
    setTimeout(() => {
      toast.success(`New Recipe added Successfully!!`)
    }, 100)
    if (!title || !description || !instruction) {
      toast.error("All fields (Title, Description, and Instruction) are required.");
      return; // Prevent form submission
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input className='title'
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Recipe Title..."
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Recipe Description..."
          required
        />
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Enter Recipe instruction..."
          required
        />
        <input type="file" name="" id="image" accept='image'/>
        <button className='Add' type="submit">Add Recipe</button>
      </form>
    </>
  );
};

export default AddRecipeForm;
