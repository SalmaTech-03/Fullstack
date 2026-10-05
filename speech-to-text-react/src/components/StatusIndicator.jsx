function StatusIndicator({ isListening }) {
    if (!isListening) {
        return null;
    }

    return (
        <div className="status">
            <span className="status-dot"></span>
            Listening...
        </div>
    );
}

export default StatusIndicator;