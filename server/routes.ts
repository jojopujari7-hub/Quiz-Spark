import express, { type Express } from "express";
import { Server } from "http";
import { storage } from "./storage";
import { generateQuiz } from "./quizGenerator";
import { quizRequestSchema, type QuizQuestion } from "@shared/schema";
import { fromZodError } from "zod-validation-error";

export function registerRoutes(httpServer: Server | null, app: Express) {
  app.post("/api/quizzes", async (req, res) => {
    try {
      const validation = quizRequestSchema.safeParse(req.body);

      if (!validation.success) {
        const readableError = fromZodError(validation.error);
        return res.status(400).json({ error: readableError.message });
      }

      const { topic, seedQuestions } = validation.data;

      const rawQuestions = generateQuiz(topic);

      const generatedQuestions: QuizQuestion[] = rawQuestions.map((q) => {
        const correctIndex = q.options.findIndex(opt => opt === q.answer);
        return {
          question: q.question,
          options: q.options,
          correctIndex: correctIndex >= 0 ? correctIndex : 0,
          funFact: q.fact,
        };
      });

      const quiz = await storage.createQuiz({
        topic,
        seedQuestions,
        generatedQuestions,
      });

      res.json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      res.status(500).json({ error: "Failed to create quiz" });
    }
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const quiz = await storage.getQuiz(req.params.id);

      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });
}
