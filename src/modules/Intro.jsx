import React from "react";

export default function Intro(props) {
    return (
        <section>
            <img
                src="../src/assets/YellowBlob.png"
                className="yellow-blob-intro"
            />
            <h1>Quizzical</h1>
            <p>Some description if needed</p>
            <button onClick={props.startGame}>Start quiz</button>
            <img src="../src/assets/BlueBlob.png" className="blue-blob-intro" />
        </section>
    );
}
