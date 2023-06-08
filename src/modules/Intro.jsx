import React from "react";
import "../styles/intro.css";

export default function Intro(props) {
    return (
        <section className="intro-screen">
            <img
                src="../YellowBlob.png"
                className="yellow-blob-intro"
            />
            <h1>Quizzical</h1>
            <p>Test your knowledge!</p>
            <button onClick={props.startGame}>Start quiz</button>
            <img src="../BlueBlob.png" className="blue-blob-intro" />
        </section>
    );
}
