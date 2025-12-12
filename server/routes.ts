import express from "express";
// import { generateQuiz } from "./quizGenerator"; // use this once generateQuiz is ready

const router = express.Router();

// Simple test route
router.get("/hello", (req, res) => {
  res.send("Hello world");
});

// Quiz route with 10 questions that match the frontend's expected format
router.get("/api/quiz", (req, res) => {
  // Modified data structure to match QuizQuestion interface
  const quiz = Array.from({ length: 10 }).map((_, i) => ({
    question: `Sample question ${i + 1}`,
    options: ["Option A", "Option B", "Option C", "Option D"],
    correctIndex: 0, // Frontend expects 'correctIndex' (number 0-3)
    funFact: `Fun fact ${i + 1}` // Frontend expects 'funFact'
  }));

  res.json(quiz);
});

export function registerRoutes(_httpServer: any, app: express.Express) {
  app.use(router);
}
