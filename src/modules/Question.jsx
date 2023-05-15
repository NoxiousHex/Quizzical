import React from "react"
import he from "he"

export default function Question(props) {
    let {addAnswer, number, question, answerArr, answers, finished} = props
    
    const answer1 = answerArr?he.decode(answerArr[0]):""
    const answer2 = answerArr?he.decode(answerArr[1]):""
    const answer3 = answerArr?he.decode(answerArr[2]):""
    const answer4 = answerArr?he.decode(answerArr[3]):""
    
    const allAnswers = answers.map(answ => answ.answer)
    const allCorrectAnswers = answers.map(answ => he.decode(answ.correctAnsw))
    
    return (
        <div className="question">
            <h3>{he.decode(question)}</h3>
            <label
            className={allCorrectAnswers.includes(answer1)&&finished ?"correct":allAnswers.includes(answer1) && finished?"wrong grey-text":finished?"grey-text":""}
            >
                <input 
                    type="radio" 
                    value={answer1}
                    checked={allAnswers.includes(answer1)}
                    name={`question-${number}`}
                    onChange={(e) => addAnswer(e.target.value, number)}
                    />
            {answer1}</label>
            <label
            className={allCorrectAnswers.includes(answer2)&&finished ?"correct":allAnswers.includes(answer2) && finished?"wrong grey-text":finished?"grey-text":""}
            >
                <input 
                    type="radio" 
                    value={answer2}
                    checked={answers.map(answ => answ.answer).includes(answer2)}
                    name={`question-${number}`} 
                    onChange={(e) => addAnswer(e.target.value, number)} />
            {answer2}</label>
            <label
            className={allCorrectAnswers.includes(answer3)&&finished ?"correct":allAnswers.includes(answer3) && finished?"wrong grey-text":finished?"grey-text":""}
            >
                <input 
                    type="radio" 
                    value={answer3}
                    checked={answers.map(answ => answ.answer).includes(answer3)}
                    name={`question-${number}`} 
                    onChange={(e) => addAnswer(e.target.value, number)} />
            {answer3}</label>
            <label
            className={allCorrectAnswers.includes(answer4)&&finished ?"correct":allAnswers.includes(answer4) && finished?"wrong grey-text":finished?"grey-text":""}
            >
                <input 
                    type="radio" 
                    value={answer4}
                    checked={answers.map(answ => answ.answer).includes(answer4)}
                    name={`question-${number}`} 
                    onChange={(e) => addAnswer(e.target.value, number)} />
           {answer4}</label>
        </div>
    )
}