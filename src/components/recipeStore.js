import { create } from 'zustand';

const generateUniqueId = () => `${Date.now()}-${Math.random()}`;
const useRecipeStore = create((set) => ({
  recipes: [
    {
      id: generateUniqueId(),
      title: "Spaghetti Bolognese",
      description: "A classic Italian pasta dish with a rich, meaty sauce.",
      instruction: "Cook spaghetti according to package instructions. Sauté minced garlic and onions, then add ground beef. Cook until browned. Add tomato sauce, Italian herbs, salt, and pepper. Simmer for 20 minutes. Serve sauce over cooked spaghetti, and garnish with grated Parmesan cheese."
    },
    {
      id: generateUniqueId(),
      title: "Chicken Caesar Salad",
      description: "A fresh and healthy salad with grilled chicken and Caesar dressing.",
      instruction: "Grill chicken breast seasoned with salt and pepper until cooked through. Slice into strips. Toss chopped romaine lettuce with Caesar dressing, croutons, and Parmesan cheese. Top with grilled chicken strips."
    },
    {
      id: generateUniqueId(),
      title: "Vegetable Stir-Fry",
      description: "A quick and easy stir-fry with fresh vegetables and savory sauce.",
      instruction: "Heat oil in a wok. Add garlic and ginger, and stir-fry until fragrant. Add chopped vegetables like bell peppers, broccoli, and carrots. Stir-fry for 5 minutes. Add soy sauce, oyster sauce, and a pinch of sugar. Stir-fry until vegetables are tender but crisp."
    },
    {
      id: generateUniqueId(),
      title: "Pancakes",
      description: "Fluffy pancakes perfect for a delicious breakfast.",
      instruction: "In a bowl, whisk together flour, sugar, baking powder, and a pinch of salt. In another bowl, beat eggs, milk, and melted butter. Combine wet and dry ingredients. Heat a non-stick pan, and pour in batter to form pancakes. Cook until bubbles form, then flip and cook until golden. Serve with syrup."
    },
    {
      id: generateUniqueId(),
      title: "Beef Tacos",
      description: "Tasty tacos filled with seasoned ground beef and fresh toppings.",
      instruction: "Cook ground beef in a pan with taco seasoning until browned. Warm taco shells in the oven. Fill shells with beef, shredded lettuce, diced tomatoes, shredded cheese, and a dollop of sour cream."
    },
    {
      id: generateUniqueId(),
      title: "Chocolate Chip Cookies",
      description: "Classic cookies with a crispy edge and gooey center.",
      instruction: "Cream butter and sugar until fluffy. Beat in eggs and vanilla extract. Gradually add flour, baking soda, and salt. Stir in chocolate chips. Drop dough by spoonfuls onto a baking sheet. Bake at 350°F for 10-12 minutes until golden brown."
    },
    {
      id: generateUniqueId(),
      title: "Grilled Cheese Sandwich",
      description: "A simple and satisfying grilled cheese sandwich.",
      instructions: "Butter two slices of bread. Place cheese slices between the unbuttered sides. Grill in a hot pan until bread is golden brown and cheese is melted. Flip and cook the other side."
    },
    {
      id: generateUniqueId(),
      title: "Chicken Curry",
      description: "A flavorful curry made with tender chicken and spices.",
      instruction: "Sauté onions, garlic, and ginger in oil. Add diced chicken and cook until browned. Stir in curry powder, cumin, coriander, and turmeric. Add coconut milk and simmer until chicken is cooked through. Serve with rice."
    },
    {
      id: generateUniqueId(),
      title: "Greek Salad",
      description: "A refreshing salad with crisp vegetables and feta cheese.",
      instruction: "Combine chopped cucumbers, tomatoes, red onions, and Kalamata olives in a bowl. Add crumbled feta cheese. Drizzle with olive oil, lemon juice, and oregano. Toss to combine."
    },
    {
      id: generateUniqueId(),
      title: "Apple Pie",
      description: "A classic dessert with a flaky crust and sweet apple filling.",
      instruction: "Roll out pie dough and line a pie dish. Peel and slice apples, then toss with sugar, cinnamon, and lemon juice. Fill pie crust with apple mixture. Cover with top crust, crimp edges, and cut slits for steam. Bake at 375°F for 50-60 minutes until golden brown."
    }
  ],
  
  filteredRecipes: [], 
  searchTerm: '',
  favorites: [],
  recommendations: [],

  // Add a new recipe Action
  addRecipe: (newRecipe) => set((state) => {
    const updatedRecipes = [...state.recipes, newRecipe];
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

  // FilteredRecipes when searchTerm changes Action
  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),
    // Action to add favourite recipe
    addFavorite: (recipeId) => set(state => ({ favorites: [...state.favorites, recipeId] })),
    // Action to remove favourite recipe
    removeFavorite: (recipeId) => set(state => ({
      favorites: state.favorites.filter(id => id !== recipeId)
    })),
    generateRecommendations: () => set(state => {
      // Mock implementation based on favorites
      const recommended = state.recipes.filter(recipe =>
        state.favorites.includes(recipe.id) && Math.random() > 0.5
      );
      return { recommendations: recommended };
    }),

  // Update a recipe Action
  updateRecipe: (updatedRecipe) => set((state) => ({
    recipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ),
    filteredRecipes: state.recipes.map((recipe) =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ).filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
  })),

  // Delete a recipe Action
  deleteRecipe: (id) => set((state) => ({
    recipes: state.recipes.filter((recipe) => recipe.id !== id),
    filteredRecipes: state.recipes.filter((recipe) => recipe.id !== id).filter((recipe) =>
      recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
    ),
  })),
}));

export { useRecipeStore };
