
# Speech to Text

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Web%20Speech%20API-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white" alt="Web Speech API">
</p>

C:\Users\syedm\OneDrive\Documents\HTML_CSS_JS\Speech-to-Text Project\project.png

A browser-based speech-to-text application built with **HTML, CSS, and vanilla JavaScript**.

The application uses the browser's **Web Speech API** to recognize spoken English and display the resulting text in the interface in real time.

---

## Problem

Typing is not always the fastest way to enter short pieces of information.

Users may want to quickly capture:

- Notes
- Ideas
- Short messages
- Spoken information
- Text while working hands-free

The goal of this project is to provide a simple interface where users can speak naturally and see the recognized text without manually typing it.

---

## Solution

The application provides a simple speech-to-text workflow:

```text
User speaks
     ↓
Microphone
     ↓
Browser Speech Recognition
     ↓
Web Speech API
     ↓
JavaScript processes the result
     ↓
Recognized text
     ↓
Text displayed on screen
````

The project keeps the architecture lightweight by handling speech recognition directly through the browser.

---

## How It Works

### 1. Start Recognition

The user clicks the **Start** button.

JavaScript creates a speech-recognition instance and starts listening to the microphone.

### 2. Speech Recognition

The browser processes the user's speech through the Web Speech API.

The application is configured for:

```text
Language: en-US
Continuous recognition: Enabled
Interim results: Enabled
```

### 3. Process Results

JavaScript receives recognition events and processes the returned results.

The application separates:

* **Final transcript** — confirmed speech
* **Interim transcript** — speech currently being recognized

The transcript is then displayed in the application.

### 4. Stop Recognition

The user clicks the **Stop** button.

The active recognition session is stopped.

---

## Architecture

```text
┌───────────────────────┐
│         User          │
│       Speaks          │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│       Browser         │
│   Microphone Input    │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│    Web Speech API     │
│  Speech Recognition   │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│     JavaScript        │
│ Result Processing     │
└───────────┬───────────┘
            │
            ▼
┌───────────────────────┐
│      Web Interface    │
│   Transcript Display  │
└───────────────────────┘
```

---

## Use Cases

The speech-to-text interaction demonstrated in this project can be useful for:

| Area         | Example                                    |
| ------------ | ------------------------------------------ |
| Note Taking  | Quickly capture short notes                |
| Productivity | Enter text using voice                     |
| Education    | Experiment with browser speech recognition |
| Prototyping  | Build and test voice-based interactions    |
| Voice Input  | Provide an alternative to typing           |

This project was created primarily as an **educational implementation** of browser-based speech recognition.

---

## Technology Stack

| Technology         | Purpose                                 |
| ------------------ | --------------------------------------- |
| **HTML5**          | Application structure                   |
| **CSS3**           | Layout and visual styling               |
| **JavaScript**     | Speech recognition logic and UI updates |
| **Web Speech API** | Speech recognition                      |
| **Font Awesome**   | Microphone and stop icons               |

---

## Project Structure

```text
Speech-to-Text/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

### `index.html`

Contains the application structure, transcript area and Start/Stop controls.

### `style.css`

Controls the layout, typography, buttons, spacing and overall interface design.

### `script.js`

Handles speech recognition, recognition events, transcript processing, error handling and stopping recognition.

---

## Run Locally

### Requirements

* A browser with Web Speech API speech-recognition support
* Working microphone
* VS Code with Live Server recommended

### Steps

Clone the repository:

```bash
git clone <your-repository-url>
```

Open the project:

```bash
cd Speech-to-Text
```

Open `index.html` using **Live Server**.

Allow microphone access when the browser asks for permission.

Then:

1. Click **Start**
2. Speak into the microphone
3. View the recognized text
4. Click **Stop** when finished

---

## React Version

A React-based version of this project is also available with a more structured implementation and additional development work.

👉 **[Click here to view the React version](../speech-to-text-react/)**

> Update the link above with the actual GitHub path if the React project is stored in a separate repository.

---

## Design Decisions

The project intentionally uses the browser's Web Speech API instead of introducing a separate speech-processing backend.

This keeps the implementation focused on:

* Browser speech recognition
* JavaScript event handling
* Real-time transcript updates
* Frontend interaction

The main trade-off is that speech-recognition availability and accuracy depend on the browser and its speech-recognition implementation.

---

## Limitations

The current implementation has a few limitations:

* Recognition is configured for **English (`en-US`)**
* Speech-recognition support varies between browsers
* Recognition accuracy can vary depending on microphone quality, background noise, pronunciation and speaking conditions
* Transcript data is only displayed in the current application session
* No persistent database storage is implemented
* No backend server is used

---

## Browser Support

Speech recognition support depends on the browser.

**Google Chrome** was used for development and testing of this project.

---

## Educational Purpose

This project was developed to understand how browser-based speech recognition can be integrated into a web application using standard frontend technologies.

It demonstrates practical use of:

* HTML
* CSS
* JavaScript
* Web Speech API
* Event-driven programming
* Real-time DOM updates
* Basic error handling

The project also provides a foundation for understanding how voice input can be incorporated into web applications.

---




