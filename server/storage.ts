import { type Quiz, type InsertQuiz, quizzes } from "@shared/schema";
import { db } from "./db";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuiz(id: string): Promise<Quiz | undefined>;
  getRecentQuizzes(limit?: number): Promise<Quiz[]>;
}

export class DatabaseStorage implements IStorage {
  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    const [created] = await db.insert(quizzes).values(quiz).returning();
    return created;
  }

  async getQuiz(id: string): Promise<Quiz | undefined> {
    const [quiz] = await db.select().from(quizzes).where(eq(quizzes.id, id));
    return quiz;
  }

  async getRecentQuizzes(limit = 10): Promise<Quiz[]> {
    return db.select().from(quizzes).orderBy(desc(quizzes.createdAt)).limit(limit);
  }
}

export const storage = new DatabaseStorage();
