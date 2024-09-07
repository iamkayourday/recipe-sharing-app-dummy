import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';


const App = () => {
  return (
    <Router>
      <div >
        <h1 style={{
          textAlign:'center',
          color:'#646cff'
        }}>Recipe Sharing Application</h1>
        <Routes>
          <Route path="/" element={<RecipeList />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
