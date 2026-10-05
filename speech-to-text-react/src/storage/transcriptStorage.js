const TRANSCRIPT_KEY = "speech-to-text-transcript";

export function saveTranscript(transcript) {
    localStorage.setItem(
        TRANSCRIPT_KEY,
        transcript
    );
}

export function loadTranscript() {
    return (
        localStorage.getItem(
            TRANSCRIPT_KEY
        ) || ""
    );
}

export function clearStoredTranscript() {
    localStorage.removeItem(
        TRANSCRIPT_KEY
    );
}