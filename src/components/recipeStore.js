import { create } from 'zustand';

const generateUniqueId = () => crypto.randomUUID();

const useRecipeStore = create((set) => ({
  recipes: JSON.parse(localStorage.getItem('recipes')) || [
    {
      id: generateUniqueId(),
      title: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish with a rich, meaty sauce.",
      instruction: "Cook spaghetti according to package instructions. Sauté minced garlic and onions, then add ground beef. Cook until browned. Add tomato sauce, Italian herbs, salt, and pepper. Simmer for 20 minutes. Serve sauce over cooked spaghetti, and garnish with grated Parmesan cheese.",
      image: "public/img/sphaghetti.jpg"
    },
    {
      id: generateUniqueId(),
      title: "Chicken Caesar Salad",
      description: "A fresh and healthy salad with grilled chicken and Caesar dressing.",
      instruction: "Grill chicken breast seasoned with salt and pepper until cooked through. Slice into strips. Toss chopped romaine lettuce with Caesar dressing, croutons, and Parmesan cheese. Top with grilled chicken strips.",
      image: "public/img/chicken.jpg"
    },
    {
      id: generateUniqueId(),
      title: "Vegetable Stir-Fry",
      description: "A quick and easy stir-fry with fresh vegetables and savory sauce.",
      instruction: "Heat oil in a wok. Add garlic and ginger, and stir-fry until fragrant. Add chopped vegetables like bell peppers, broccoli, and carrots. Stir-fry for 5 minutes. Add soy sauce, oyster sauce, and a pinch of sugar. Stir-fry until vegetables are tender but crisp.",
      image: "public/img/Vegetable-Stir-Fry.jpg"
    },
    {
      id: generateUniqueId(),
      title: "Pancakes",
      description: "Fluffy pancakes perfect for a delicious breakfast.",
      instruction: "In a bowl, whisk together flour, sugar, baking powder, and a pinch of salt. In another bowl, beat eggs, milk, and melted butter. Combine wet and dry ingredients. Heat a non-stick pan, and pour in batter to form pancakes. Cook until bubbles form, then flip and cook until golden. Serve with syrup.",
      image: "public/img/Pancakes.jpg"
    },
    {
      id: generateUniqueId(),
      title: "Beef Tacos",
      description: "Tasty tacos filled with seasoned ground beef and fresh toppings.",
      instruction: "Cook ground beef in a pan with taco seasoning until browned. Warm taco shells in the oven. Fill shells with beef, shredded lettuce, diced tomatoes, shredded cheese, and a dollop of sour cream.",
      image: "public/img/Beef-Tacos.jpg"
    },

  ],
  filteredRecipes: JSON.parse(localStorage.getItem('recipes')) || [],
  searchTerm: '',
  favorites: [],
  recommendations: [],

  // Save the updated recipes list to localStorage
  saveToLocalStorage: (recipes) => {
    localStorage.setItem('recipes', JSON.stringify(recipes));
  },

  // Add a new recipe Action
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
    // Save the updated recipes to localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),

  // Set search term Action
  setSearchTerm: (term) => set((state) => ({
    searchTerm: term,
    filteredRecipes: state.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(term.toLowerCase())
    ),
  })),

  // Filter recipes when searchTerm changes Action
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // Action to add favorite recipe
  addFavorite: (recipeId) => set((state) => ({
    favorites: [...state.favorites, recipeId],
  })),

  // Action to remove favorite recipe
  removeFavorite: (recipeId) => set((state) => ({
    favorites: state.favorites.filter(id => id !== recipeId),
  })),

  // Action to generate recommendations based on favorites
  generateRecommendations: () => set((state) => {
    const recommended = state.recipes.filter(recipe =>
      state.favorites.includes(recipe.id) && Math.random() > 0.5
    );
    return { recommendations: recommended };
  }),

  // Update a recipe Action
  updateRecipe: (updatedRecipe) => set((state) => {
    const updatedRecipes = state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    );
    // Save updated recipes to localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),

  // Delete a recipe Action
  deleteRecipe: (id) => set((state) => {
    const updatedRecipes = state.recipes.filter((recipe) => recipe.id !== id);
    // Save the updated recipes to localStorage
    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    return {
      recipes: updatedRecipes,
      filteredRecipes: updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    };
  }),
}));

export { useRecipeStore };
