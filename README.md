# Quiz Application

## Overview
This is a simple Quiz Application built using React. The application fetches quiz questions from an API, displays them to the user, and allows navigation between questions. The quiz progress is saved, and upon completion, the final score is displayed along with the correct answers. The application also provides an option to restart the quiz.

## Features
- Fetches quiz questions from an API (`http://localhost:3000/questions`).
- Displays multiple-choice questions to the user.
- Tracks progress and saves quiz data in `localStorage`.
- Displays the final score and correct answers at the end of the quiz.
- Allows users to restart the quiz.

## Technologies Used
- React.js
- useState, useEffect hooks
- JSON Server (for serving questions from `db.json`)

## Installation
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd quiz-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the JSON Server (if using `db.json` for questions):
   ```sh
   npx json-server --watch db.json --port 3000
   ```
4. Start the React application:
   ```sh
   npm start
   ```
5. Open the application in your browser:
   ```sh
   http://localhost:3000
   ```

## Components
### `QuizQuestion.js`
- Fetches and displays quiz questions.
- Allows navigation between questions.
- Saves progress and quiz completion status to `localStorage`.

### `Result.js`
- Displays the final score and correct answers.
- Provides a button to restart the quiz.

### `QuizSummary.js`
  - Displays a summary of the questions.

## API Endpoint
Ensure you have a JSON server running with a `db.json` file.


## Future Improvements
- Add a timer for each question.
- Implement a scoring system.
- Enhance UI with better styling.

## Author
- Group 4


