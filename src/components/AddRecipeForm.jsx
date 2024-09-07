import { useState } from 'react';
import { useRecipeStore } from './recipeStore';
import { toast } from 'react-toastify';

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instruction, setInstruction] = useState('');
  const [image, setImage] = useState(null); // State to store the image

  // Handle image upload and convert to Base64
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // Save the Base64 image data
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  

  const handleSubmit = (event) => {
    event.preventDefault();

    // Check if any required fields are empty
    if (!title || !description || !instruction) {
      toast.error('Please fill out all fields.');
      return;
    }

    const generateUniqueId = () => crypto.randomUUID();
    addRecipe({ 
      id: generateUniqueId(), 
      title, 
      description, 
      instruction, 
      image // Include the image in the recipe data
    });

    // Clear form fields
    setTitle('');
    setDescription('');
    setInstruction('');
    setImage(null);

    setTimeout(() => {
      toast.success('New Recipe added Successfully!!');
    }, 100);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          className="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Recipe Title..."
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter Recipe Description..."
        />
        <textarea
          value={instruction}
          onChange={(e) => setInstruction(e.target.value)}
          placeholder="Enter Recipe Instructions..."
        />

        {/* Input for uploading an image */}
        <input style={{backgroundColor:'grey', cursor:'pointer', borderRadius:'4px', marginBottom:'3px'}}
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange} // Handle file upload
        />

        <button className="Add" type="submit">
          Add Recipe
        </button>
      </form>
    </>
  );
};

export default AddRecipeForm;
