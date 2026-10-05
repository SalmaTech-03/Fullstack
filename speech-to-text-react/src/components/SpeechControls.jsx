function SpeechControls({
    isListening,
    onStart,
    onStop,
    onClear,
}) {
    return (
        <div className="controls">

            <button
                className="start-button"
                onClick={onStart}
                disabled={isListening}
            >
                🎤
                <span>
                    {isListening ? "Listening" : "Start"}
                </span>
            </button>

            <button
                className="stop-button"
                onClick={onStop}
            >
                ■
                <span>Stop</span>
            </button>

            <button
                className="clear-button"
                onClick={onClear}
            >
                Clear
            </button>

        </div>
    );
}

export default SpeechControls;