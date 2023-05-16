import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import Question from "./Question";
import he from "he";
import "../styles/quiz.css";

export default function Quiz(props) {
    const { answerArr, setAnswerArr } = props;
    const [finished, setFinished] = useState(false);
    const [quiz, setQuiz] = useState([]);
    const [answers, setAnswers] = useState([]);

    async function getQuizData() {
        try {
            const res = await fetch(
                "https://opentdb.com/api.php?amount=5&type=multiple"
            );
            const data = await res.json();
            setQuiz(data.results);
        } catch (err) {
            console.error(err);
        }
    }
    useEffect(() => {
        getQuizData();
    }, []);

    useEffect(() => {
        setAnswerArr(
            quiz.map((q) => [q.correct_answer, ...q.incorrect_answers])
        );
    }, [quiz]);

    //Add answer object to the array, if it already exists replace it
    function addAnswer(answer, num) {
        const correctAnswers = quiz.map((q) => he.decode(q.correct_answer));
        const isCorrect = correctAnswers.includes(answer);
        if (!answers.find((q) => q.question === num)) {
            setAnswers((prevAnswers) => [
                ...prevAnswers,
                {
                    question: num,
                    answer: answer,
                    correct: isCorrect,
                    correctAnsw: correctAnswers[num - 1],
                },
            ]);
        } else {
            setAnswers((prevAnswers) => {
                const index = answers.findIndex(
                    (item) => item.question === num
                );
                return prevAnswers.map((el, i) =>
                    index === i
                        ? {
                              question: num,
                              answer: answer,
                              correct: isCorrect,
                              correctAnsw: correctAnswers[num - 1],
                          }
                        : el
                );
            });
        }
    }

    const renderQuiz = quiz.map((q, i) => {
        const id = uuid();
        return (
            <Question
                key={id}
                addAnswer={addAnswer}
                number={i + 1}
                question={q.question}
                answerArr={answerArr[i]}
                answers={answers}
                finished={finished}
            />
        );
    });

    const score = answers.filter((answ) => answ.correct).length;

    function toggleGame() {
        setFinished((prevFinished) => !prevFinished);
        if (finished === true) {
            setAnswerArr([]);
            setAnswers([]);
            getQuizData();
        }
    }

    const endBtn = finished ? (
        <div className="score-screen">
            <h3>{`You scored ${score}/5 correct`}</h3>
            <button className="restart-btn" onClick={toggleGame}>
                Play Again
            </button>
        </div>
    ) : (
        <button onClick={toggleGame} disabled={answers.length !== 5}>
            Check answers
        </button>
    );

    const quizEl =
        answerArr?.length > 0 ? (
            <>
                {renderQuiz}
                {endBtn}
            </>
        ) : (
            <h2 className="loading-text">Loading...</h2>
        );

    return (
        <main>
            <img
                src="../src/assets/YellowBlob.png"
                className="yellow-blob-quiz"
            />
            {quizEl}
            <img src="../src/assets/BlueBlob.png" className="blue-blob-quiz" />
        </main>
    );
}
