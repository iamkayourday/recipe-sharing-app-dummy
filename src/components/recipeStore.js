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
    }    
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
