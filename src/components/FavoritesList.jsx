// import React from 'react';
// import { useRecipeStore } from './recipeStore';

// const FavoritesList = ({ onToggleFavorite }) => {
//   // Retrieve the list of favorite recipe IDs and find the corresponding recipes
//   const { favorites = [], recipes = [] } = useRecipeStore(state => ({
//     favorites: state.favorites,
//     recipes: state.recipes,
//   }));

//   // Find the favorite recipes
//   const favoriteRecipes = favorites.map(id => recipes.find(recipe => recipe.id === id)).filter(recipe => recipe !== undefined);

//   return (
//     <div>
//       <h2>My Favorites</h2>
//       {favoriteRecipes.length > 0 ? (
//         favoriteRecipes.map(recipe => (
//           <div key={recipe.id}>
//             <h3>{recipe.title}</h3>
//             <p>{recipe.description}</p>
//             <button onClick={() => onToggleFavorite(recipe.id, true)}>Remove from Favorites</button>
//           </div>
//         ))
//       ) : (
//         <p>No favorite recipes added yet.</p>
//       )}
//     </div>
//   );
// };

// export default FavoritesList;
import React from 'react';
import { useRecipeStore } from './recipeStore';

const FavoritesList = () => {
  const favorites = useRecipeStore((state) =>
    state.favorites.map((id) =>
      state.recipes.find((recipe) => recipe.id === id)
    )
  );

  return (
    <div style={{paddingLeft:'20px'}}>
      <h2>My Favorites</h2>
      {favorites.length > 0 ? (
        favorites.map((recipe) => (
          <div key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))
      ) : (
        <p>No favorite recipes yet.</p>
      )}
    </div>
  );
};

export default FavoritesList;
