import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti'

export default function Questions(props) {
    const { categoryId } = props
    const [questionList, setQuestionList] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [count, setCount] = useState(0)
    const [answerMessage, setAnswerMessage] = useState(null)


    useEffect(() => {
        axios.get(`https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`)
            .then(res => {
                const results = res.data.results
                // console.log(results)
                setQuestionList(results)
            })
    }, [categoryId])

    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    // this was found on a google search for shuffling an array
    function getShuffledArr(arr) {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr
    }

    function getAnswerList() {
        let incorrectAnswers = questionList[currentQuestionIndex].incorrect_answers
        let correctAnswer = questionList[currentQuestionIndex].correct_answer
        let combinedAnswers = [...incorrectAnswers, correctAnswer]
        // return combinedAnswers
        let shuffledArr = getShuffledArr(combinedAnswers)
        return shuffledArr
    }

    function handleUserAnswer(answer) {
        let correctAnswer = questionList[currentQuestionIndex].correct_answer
        if (answer === questionList[currentQuestionIndex].correct_answer) {
            console.log("Yay!")
            alert("You got it right!")
            {setCount(count + 1)}
        } else {
            console.log("Boo!")
            alert(`Sorry, that's not the correct answer! The correct answer was: ${correctAnswer}`)
        }
        { setCurrentQuestionIndex(currentQuestionIndex + 1) }
    }



    return (
        <>
            <div className="questions">
                {/* {questionList && questionList.map(
            (questionMetadata, index) => 
                <p key={index}>{questionMetadata.question}</p>
                )} */}
                {questionList &&
                    <>
                        <h1>Question {currentQuestionIndex + 1}:<br />
                            {decodeHtml(questionList[currentQuestionIndex].question)}</h1>
                        <ul>
                            {getAnswerList().map(
                                (answer, index) => <li key={index}>
                                    <button className="answerButtons" onClick={() => 
                                        { handleUserAnswer(answer) }}>{decodeHtml(answer)}</button>
                                </li>
                            )}
                        </ul>
                        <br />
                        <button>You have {count} right answers so far!</button>
                    </>
                }
                {/* <br />
                <button onClick={() => { setCurrentQuestionIndex(currentQuestionIndex + 1) }}
                > Next Question!</button> */}
            </div>
        </>
    )

}