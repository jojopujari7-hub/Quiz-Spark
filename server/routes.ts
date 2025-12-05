import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { quizRequestSchema } from "@shared/schema";
import { generateQuiz } from "./quizGenerator";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.post("/api/quizzes", async (req, res) => {
    try {
      const result = quizRequestSchema.safeParse(req.body);
      
      if (!result.success) {
        const validationError = fromZodError(result.error);
        return res.status(400).json({ 
          error: validationError.message 
        });
      }

      const { topic, seedQuestions } = result.data;
      
      const generatedQuestions = generateQuiz(topic, seedQuestions);
      
      const quiz = await storage.createQuiz({
        topic,
        seedQuestions,
        generatedQuestions,
      });

      return res.status(201).json(quiz);
    } catch (error) {
      console.error("Error creating quiz:", error);
      return res.status(500).json({ error: "Failed to generate quiz" });
    }
  });

  app.get("/api/quizzes/:id", async (req, res) => {
    try {
      const quiz = await storage.getQuiz(req.params.id);
      
      if (!quiz) {
        return res.status(404).json({ error: "Quiz not found" });
      }

      return res.json(quiz);
    } catch (error) {
      console.error("Error fetching quiz:", error);
      return res.status(500).json({ error: "Failed to fetch quiz" });
    }
  });

  app.get("/api/quizzes", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const quizzes = await storage.getRecentQuizzes(limit);
      return res.json(quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
      return res.status(500).json({ error: "Failed to fetch quizzes" });
    }
  });

  return httpServer;
}
