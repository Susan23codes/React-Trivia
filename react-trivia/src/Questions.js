import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti'
import { BallTriangle} from  'react-loader-spinner'


export default function Questions(props) {
    const { 
        categoryId,
        setCurrentCategory,
        count,
        setCount,
        setGameOver} = props
    const [questionList, setQuestionList] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [answerMessage, setAnswerMessage] = useState(null)
    

    const correctMessage = "You got it right!"
    const incorrectMessage = (correctAnswer) => `Sorry, that's not the correct answer! The correct answer was: ${correctAnswer}`

    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
            .then(res => {
                const results = res.data.results
                for (let question of results) {
                    let shuffledAnswers = getShuffledAnswerList(question)
                    question["shuffled"] = shuffledAnswers
                }            
                setQuestionList(results)
                // console.log(results)
            })
    }, [categoryId])

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    //this was found on a google search for shuffling an array
    function getShuffledArr(arr) {
        console.log("Running shuffle")
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr
    }

    function getShuffledAnswerList(question) {
        let incorrectAnswers = question.incorrect_answers
        let correctAnswer = question.correct_answer
        let combinedAnswers = [...incorrectAnswers, correctAnswer]
        let shuffledArr = getShuffledArr(combinedAnswers)
        return shuffledArr
    }

    function handleUserAnswer(answer) {
        let correctAnswer = questionList[currentQuestionIndex].correct_answer
        if (answer === correctAnswer) {
            console.log("Yay!")
            setAnswerMessage(correctMessage)
            setCount(count + 1)
        } else {
            console.log("Boo!")
            setAnswerMessage(incorrectMessage(correctAnswer))
        }
    }
    

    return (
        <>
            <div className="questions">
                {!questionList && <div className='loader'>
                    <BallTriangle  height = "450"
                    width = "400" radius = "8"/>
            </div>}
                {questionList &&
                    <>
                        <h1 className = "single_question">Question {currentQuestionIndex + 1}:</h1><br />
                        <h3>{answerMessage === correctMessage ? (
                            <>
                                {decodeHtml(answerMessage)}
                                <Confetti />
                            </>
                        ) : (
                            decodeHtml(answerMessage)
                        )
                        }</h3>
                        <br />
                            <h1>{decodeHtml(questionList[currentQuestionIndex].question)}</h1>
                        <ul>
                            {questionList[currentQuestionIndex].shuffled.map(
                                (answer, index) => <li key={index}>
                                    <button className="answer_buttons" onClick={() => 
                                        {handleUserAnswer(answer)}} 
                                        disabled={answerMessage !== (null)}>{decodeHtml(answer)}</button>
                                </li>
                            )}
                        </ul>
                        <br />
                        <h2>{count === 1 ? (
                            `You have ${count} right answer so far!`
                        ) : (
                            `You have ${count} right answers so far!`
                        )
                            }</h2>
                <br />
                    {currentQuestionIndex !== 9 ? (
                        <button className='next_question_button' 
                        onClick={() => { setCurrentQuestionIndex(currentQuestionIndex + 1); 
                            setAnswerMessage(null)}}
                            > Next Question!</button>
                            ) : ( 
                                <button className='see_score_button' onClick={() => {setGameOver(true)}}>See your score!</button>
                                )
                    }
                <button className='end_game_button' onClick={() => {setCurrentCategory('')}}>End Game</button>
                                </>
                            }
            </div>
        </>
    )
            }