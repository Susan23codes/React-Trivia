import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Confetti from 'react-confetti'

export default function Questions(props) {
    const { categoryId } = props
    const [questionList, setQuestionList] = useState(null)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [count, setCount] = useState(0)
    const [answerMessage, setAnswerMessage] = useState(null)

    const correctMessage = "You got it right!"
    const incorrectMessage = (correctAnswer) => `Sorry, that's not the correct answer! The correct answer was: ${correctAnswer}`

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

    function getAnswerList() {
        let incorrectAnswers = questionList[currentQuestionIndex].incorrect_answers
        let correctAnswer = questionList[currentQuestionIndex].correct_answer
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
        //  setCurrentQuestionIndex(currentQuestionIndex + 1) 
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
                        <h1 className = "singleQuestion">Question {currentQuestionIndex + 1}:</h1><br />
                        {/* <h4>{answerMessage}</h4> */}
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
                            {getAnswerList().map(
                                (answer, index) => <li key={index}>
                                    <button className="answerButtons" onClick={() => 
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
                    </>
                }
                <br />
                <button  onClick={() => { setCurrentQuestionIndex(currentQuestionIndex + 1); setAnswerMessage(null)}}
                > Next Question!</button>
            </div>
        </>
    )

}
