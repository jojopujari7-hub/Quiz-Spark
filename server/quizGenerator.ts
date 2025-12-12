// quizGenerator.ts
import express from "express";

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  funFact?: string;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

const egyptianQuizData: QuizQuestion[] = [
  // … your questions here …
];

export function generateQuiz(topic: string, seedQuestions?: string[]): QuizQuestion[] {
  return shuffle(egyptianQuizData);
}

// --- Express setup ---
const app = express();
const PORT = process.env.PORT || 3000;

// Route to serve quiz JSON
app.get("/api/quiz", (req, res) => {
  const topic = req.query.topic as string || "default";
  const quiz = generateQuiz(topic);
  res.json(quiz); // <-- ensures JSON is returned
});

app.listen(PORT, () => {
  console.log(`QuizBot server running on port ${PORT}`);
});
