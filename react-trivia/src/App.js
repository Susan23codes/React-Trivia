import './App.css';
import Categories from './Categories';
import Questions from './Questions';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
 // const [categoryList, setCategoryList] = useState([])
  const [currentCategory, setCurrentCategory] = useState('')
  // const [questionList, setQuestionList] = useState('')

  const handleCategoryClick = (category) => {
    setCurrentCategory(category.id)
  }
    

  return (
    <div className="App">
      Category ID: {currentCategory}
      { !currentCategory ?  
        <Categories handleCategoryClick={handleCategoryClick}/> 
        : 
        <Questions categoryId={currentCategory}/>}
      
      
    </div>
  );
}

export default App;
