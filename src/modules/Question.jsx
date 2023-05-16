import React from "react";
import he from "he";
import { v4 as uuid } from "uuid";
import "../styles/question.css";

export default function Question(props) {
    let { addAnswer, number, question, answerArr, answers, finished } = props;

    const allAnswers = answers.map((answ) => answ.answer);
    const allCorrectAnswers = answers.map((answ) =>
        he.decode(answ.correctAnsw)
    );

    const answerEl = answerArr?.map((answer) => {
        answer = he.decode(answer);
        const checked = allAnswers.includes(answer);
        const id = uuid();
        return (
            <label
                className={
                    checked && !finished
                        ? "input-selected"
                        : allCorrectAnswers.includes(answer) && finished
                        ? "correct"
                        : allAnswers.includes(answer) && finished
                        ? "wrong grey-text"
                        : finished
                        ? "grey-text"
                        : ""
                }
                key={id}
            >
                <input
                    type="radio"
                    value={answer}
                    checked={checked}
                    name={`question-${number}`}
                    onChange={(e) => addAnswer(e.target.value, number)}
                />
                {answer}
            </label>
        );
    });

    return (
        <div className="question">
            <h3>{he.decode(question)}</h3>
            {answerEl}
        </div>
    );
}
