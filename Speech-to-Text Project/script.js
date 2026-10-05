// Get the result box from HTML
const resultElement = document.getElementById("result");

// This variable stores the speech recognition object
let recognition;

// Start speech recognition
function startRecognition() {

    // Check whether the browser supports speech recognition
    if ("webkitSpeechRecognition" in window) {

        // Create speech recognition object
        recognition = new webkitSpeechRecognition();

        // Configure speech recognition
        setupRecognition(recognition);

        // Start listening
        recognition.start();

        console.log("Speech recognition started.");

    } else {

        // Browser does not support speech recognition
        alert("Speech recognition is not supported in this browser.");
    }
}

// Configure speech recognition
function setupRecognition(recognition) {

    // Continue listening
    recognition.continuous = true;

    // Show temporary words while speaking
    recognition.interimResults = true;

    // Set speech language
    recognition.lang = "en-US";

    // Run this when speech is detected
    recognition.onresult = function(event) {

        // Process the speech result
        const {
            finalTranscript,
            interimTranscript
        } = processResult(event);

        // Display the speech in the result box
        resultElement.innerHTML =
            finalTranscript +
            '<span style="color: #999;">' +
            interimTranscript +
            "</span>";
    };

    // Run this when an error occurs
    recognition.onerror = function(event) {

        console.error(
            "Speech recognition error:",
            event.error
        );

        resultElement.innerHTML =
            "Error: " + event.error;
    };

    // Run this when recognition stops
    recognition.onend = function() {

        console.log("Speech recognition ended.");
    };
}

// Process speech result
function processResult(event) {

    // Stores completed speech
    let finalTranscript = "";

    // Stores temporary speech
    let interimTranscript = "";

    // Go through every speech result
    for (let i = 0; i < event.results.length; i++) {

        // Get the recognized text
        let transcript =
            event.results[i][0].transcript;

        // Replace newline with HTML line break
        transcript =
            transcript.replace("\n", "<br>");

        // Check if the speech result is final
        if (event.results[i].isFinal) {

            // Add to completed speech
            finalTranscript += transcript;

        } else {

            // Add to temporary speech
            interimTranscript += transcript;
        }
    }

    // Return both results
    return {
        finalTranscript,
        interimTranscript
    };
}

// Stop speech recognition
function stopConverting() {

    // Check whether recognition exists
    if (recognition) {

        // Stop listening
        recognition.stop();

        // Remove the recognition object
        recognition = null;

        console.log("Speech recognition stopped.");
    }
}