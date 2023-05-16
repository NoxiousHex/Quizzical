import React, { useState } from "react";
import Intro from "./modules/Intro";
import Quiz from "./modules/Quiz";

export default function App() {
    const [isRunning, setIsRunning] = useState(false);
    const [answerArr, setAnswerArr] = useState([]);
    function startGame() {
        setIsRunning(true);
    }

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    for (let arr of answerArr) {
        shuffleArray(arr);
    }

    return isRunning ? (
        <Quiz setAnswerArr={setAnswerArr} answerArr={answerArr} />
    ) : (
        <Intro startGame={startGame} />
    );
}
