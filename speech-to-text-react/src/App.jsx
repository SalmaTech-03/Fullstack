import { useRef, useState } from "react";
import "./App.css";

function App() {
    const recognitionRef = useRef(null);

    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState("");

    const startRecognition = () => {
        setError("");

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            setError(
                "Speech recognition is not supported in this browser."
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognitionRef.current = recognition;

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = "en-US";

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onresult = (event) => {
            let finalText = "";

            for (
                let i = event.resultIndex;
                i < event.results.length;
                i++
            ) {
                const text =
                    event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    finalText += text;
                }
            }

            if (finalText) {
                setTranscript((previous) => {
                    return previous + finalText;
                });
            }
        };

        recognition.onerror = (event) => {
            console.error(event.error);

            setError(
                "Speech recognition error: " + event.error
            );

            setIsListening(false);
        };

        recognition.onend = () => {
            setIsListening(false);
        };

        recognition.start();
    };

    const stopRecognition = () => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
        }

        setIsListening(false);
    };

    const clearTranscript = () => {
        setTranscript("");
        setError("");
    };

    const wordCount =
        transcript.trim() === ""
            ? 0
            : transcript.trim().split(/\s+/).length;

    return (
        <div className="app">

            <div className="container">

                <h1>Speech to Text</h1>

                <p className="subtitle">
                    Speak naturally and your words will appear here.
                </p>

                {isListening && (
                    <div className="status">
                        <span className="status-dot"></span>
                        Listening...
                    </div>
                )}

                <div className="result">
                    {transcript || (
                        <span className="placeholder">
                            Your speech will appear here...
                        </span>
                    )}
                </div>

                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}

                <div className="controls">

                    <button
                        className="start-button"
                        onClick={startRecognition}
                        disabled={isListening}
                    >
                        🎤
                        <span>
                            {isListening ? "Listening" : "Start"}
                        </span>
                    </button>

                    <button
                        className="stop-button"
                        onClick={stopRecognition}
                    >
                        ■
                        <span>Stop</span>
                    </button>

                    <button
                        className="clear-button"
                        onClick={clearTranscript}
                    >
                        Clear
                    </button>

                </div>

                <div className="word-count">
                    {wordCount}{" "}
                    {wordCount === 1 ? "word" : "words"}
                </div>

            </div>

        </div>
    );
}

export default App;