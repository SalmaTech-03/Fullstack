function WordCount({ transcript }) {
    const wordCount =
        transcript.trim() === ""
            ? 0
            : transcript.trim().split(/\s+/).length;

    return (
        <div className="word-count">
            {wordCount}{" "}
            {wordCount === 1 ? "word" : "words"}
        </div>
    );
}

export default WordCount;