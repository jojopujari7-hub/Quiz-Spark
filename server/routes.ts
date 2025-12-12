import express from "express";
import { generateQuiz } from "./quizGenerator"; // UNCOMMENTED

const router = express.Router();

// Simple test route
router.get("/hello", (req, res) => {
  res.send("Hello world");
});

// Quiz route using the real 10-question generator
router.get("/api/quiz", (req, res) => {
  const quiz = generateQuiz("egypt"); // Using the function from quizGenerator.ts
  res.json(quiz);
});

export function registerRoutes(_httpServer: any, app: express.Express) {
  app.use(router);
}
