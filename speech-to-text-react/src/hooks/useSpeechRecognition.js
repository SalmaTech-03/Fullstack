import { useEffect, useRef, useState } from "react";

import { createSpeechRecognition } from "../services/speechRecognition";
import { normalizeSpeechResult } from "../adapters/speechAdapter";
import { normalizeSpeechError } from "../adapters/speechErrorAdapter";

import {
    saveTranscript,
    loadTranscript as loadStoredTranscript,
    clearStoredTranscript,
} from "../storage/transcriptStorage";

export function useSpeechRecognition() {
    const recognitionRef = useRef(null);

    const [transcript, setTranscript] = useState(
        () => loadStoredTranscript()
    );

    const [isListening, setIsListening] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        saveTranscript(transcript);
    }, [transcript]);

    const startRecognition = () => {
        setError("");

        try {
            const recognition = createSpeechRecognition();

            recognitionRef.current = recognition;

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onresult = (event) => {
                const results = normalizeSpeechResult(event);

                const finalText = results
                    .filter((result) => result.isFinal)
                    .map((result) => result.text)
                    .join("");

                if (finalText) {
                    setTranscript((previous) => {
                        return previous + finalText;
                    });
                }
            };

            recognition.onerror = (event) => {
                console.error(event.error);

                setError(
                    normalizeSpeechError(event.error)
                );

                setIsListening(false);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.start();
        } catch (error) {
            setError(error.message);
            setIsListening(false);
        }
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
        clearStoredTranscript();
        setError("");
    };

    const loadTranscript = (text) => {
        setTranscript(text);
        setError("");
    };

    return {
        transcript,
        isListening,
        error,
        startRecognition,
        stopRecognition,
        clearTranscript,
        loadTranscript,
    };
}