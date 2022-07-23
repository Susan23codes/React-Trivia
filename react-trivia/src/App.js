import './App.css';
import Categories from './Categories';
import Questions from './Questions';
import GameOver from './GameOver';
import React, { useState } from 'react';



function App() {
  const [currentCategory, setCurrentCategory] = useState('')
  const [gameOver, setGameOver] = useState(false)
  const [count, setCount] = useState(0)

  const handleCategoryClick = (category) => {
    setCurrentCategory(category.id)
  }
    

  return (
    <div className="App">
      <p>Category ID: {currentCategory}</p>
       {currentCategory ?  
        (gameOver === true ?
          <GameOver 
          setGameOver={setGameOver} 
          setCurrentCategory={setCurrentCategory}
          count={count}
          setCount={setCount}/>
        : 
       <Questions 
          count={count}
          setCount={setCount}
          categoryId={currentCategory}
          setCurrentCategory={setCurrentCategory}
          gameOver={gameOver}
          setGameOver={setGameOver}
        />)
        : 
        <Categories handleCategoryClick={handleCategoryClick}/>     
       }
    </div>
  )
}

export default App;