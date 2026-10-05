function Transcript({ transcript }) {
    return (
        <div className="result">
            {transcript || (
                <span className="placeholder">
                    Your speech will appear here...
                </span>
            )}
        </div>
    );
}

export default Transcript;