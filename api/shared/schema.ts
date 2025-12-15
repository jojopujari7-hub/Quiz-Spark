import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { nanoid } from "nanoid";

export const quizQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  correctIndex: z.number().min(0).max(3),
  funFact: z.string().optional(),
});

export type QuizQuestion = z.infer<typeof quizQuestionSchema>;

export const quizzes = pgTable("quizzes", {
  id: varchar("id").primaryKey(),
  topic: text("topic").notNull(),
  seedQuestions: text("seed_questions").array().notNull(),
  generatedQuestions: jsonb("generated_questions").$type<QuizQuestion[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuizSchema = createInsertSchema(quizzes).omit({
  id: true,
  createdAt: true,
});

export type InsertQuiz = z.infer<typeof insertQuizSchema>;
export type Quiz = typeof quizzes.$inferSelect;

export const quizRequestSchema = z.object({
  topic: z.string().min(3, "Topic must be at least 3 characters"),
  seedQuestions: z.array(z.string().min(5, "Each question should be at least 5 characters"))
    .optional()
    .default([]),
});

export type QuizRequest = z.infer<typeof quizRequestSchema>;
