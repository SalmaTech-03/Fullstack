export function normalizeSpeechError(error) {
    switch (error) {
        case "network":
            return "Speech recognition could not connect to the recognition service.";

        case "not-allowed":
            return "Microphone permission was denied.";

        case "audio-capture":
            return "No microphone was detected.";

        case "no-speech":
            return "No speech was detected. Please try again.";

        case "aborted":
            return "Speech recognition was stopped.";

        default:
            return "Something went wrong with speech recognition.";
    }
}