
# Speech to Text Web Application

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Web%20Speech%20API-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Web Speech API">
</p>

A lightweight, real-time speech-to-text web application built using standard HTML, CSS, and vanilla JavaScript. The application leverages the browser's native Web Speech API to convert spoken voice input into text instantly without requiring backend processing.

[Live Demo](https://staticfile-3288e.wasmer.app/)


![Project Preview](https://github.com/SalmaTech-03/Fullstack/blob/main/Speech-to-Text%20Project/project.png)

---

## Features

- **Real-Time Speech Recognition:** Uses the browser's native `webkitSpeechRecognition` / `SpeechRecognition` interface.
- **Interim & Final Transcripts:** Differentiates real-time processing results from confirmed final text.
- **Continuous Listening:** Set to process continuous speech input seamlessly until explicitly stopped.
- **Minimal & Responsive Interface:** Clean UI styled with custom CSS and Font Awesome controls.
- **Zero External Dependencies:** Runs natively in supported browsers without external audio libraries or server overhead.

---

## Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6+)
- **API:** Web Speech API (`SpeechRecognition`)
- **Icons:** Font Awesome

---

## How It Works

1. **Activation:** Clicking **Start** instantiates the `SpeechRecognition` object and requests microphone permission.
2. **Configuration:** The application sets `continuous = true`, `interimResults = true`, and sets language support to `en-US`.
3. **Event Handling:** 
   - `onresult`: Captures incoming speech frames, appending finalized text and displaying live interim text.
   - `onerror` / `onend`: Safely handles session state and errors.
4. **Termination:** Clicking **Stop** closes the active speech session and freezes the current transcript.

---

## Getting Started

### Prerequisites
- A modern Web Browser with Web Speech API support (Google Chrome recommended)
- A working microphone

### Local Setup

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/SalmaTech-03/Fullstack.git](https://github.com/SalmaTech-03/Fullstack.git)

```

2. **Navigate to the project directory:**
```bash
cd "Speech-to-Text Project"

```


3. **Run the application:**
Open `index.html` directly in your browser, or launch it using **Live Server** in VS Code.
4. **Usage:**
* Allow microphone permissions when prompted.
* Click **Start** and begin speaking.
* Click **Stop** when complete.



---

## Repository Structure

```text
Speech-to-Text Project/
│
├── index.html    # Application layout and control buttons
├── style.css     # UI styles and responsive visual elements
├── script.js    # SpeechRecognition logic and DOM updates
└── README.md     # Documentation

```

---

## Browser Support & Notes

* **Primary Support:** Built and tested for **Google Chrome**. Support in other browsers depends on their native support for the Web Speech API.
* **Microphone Permissions:** Requires HTTPS or `localhost` to access browser microphone APIs.

---

## Related Projects

* **[React Version](https://github.com/SalmaTech-03/Fullstack/blob/main/speech-to-text-react/README.md)** — A component-based version of this project built using React.

```

```
