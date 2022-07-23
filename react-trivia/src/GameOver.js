import React from 'react';

export default function GameOver (props) {
    const {count, setCount, setCurrentCategory, setGameOver} = props
    return (
    <>
        <div className="gameover_page">
            <h1>You answered 10 questions!</h1>
            <h2>Your total score was {count} right answers!</h2>
            <h2>Would you like to play again?</h2>
            <button className='answer_buttons' onClick={() => {setCurrentCategory(''); 
                setCount(0); setGameOver(false)}}>Play Again</button><br />

        </div>
    </>
    )
}