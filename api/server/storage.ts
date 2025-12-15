import { type Quiz, type InsertQuiz, quizzes } from "../shared/schema.js";
import { db, pool } from "./db.js";
import { eq, desc, sql } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface IStorage {
  createQuiz(quiz: InsertQuiz): Promise<Quiz>;
  getQuiz(id: string): Promise<Quiz | undefined>;
  getRecentQuizzes(limit?: number): Promise<Quiz[]>;
}

export class DatabaseStorage implements IStorage {
  async createQuiz(quiz: InsertQuiz): Promise<Quiz> {
    // Use raw SQL to avoid Drizzle array issues with Supabase pooler
    const id = nanoid();
    const seedQuestionsArray = Array.isArray(quiz.seedQuestions) ? quiz.seedQuestions : [];
    const generatedQuestionsJson = JSON.stringify(quiz.generatedQuestions);
    
    const result = await pool.query(
      `INSERT INTO quizzes (id, topic, seed_questions, generated_questions) 
       VALUES ($1, $2, $3::text[], $4::jsonb) 
       RETURNING id, topic, seed_questions, generated_questions, created_at`,
      [id, quiz.topic, seedQuestionsArray, generatedQuestionsJson]
    );
    
    const row = result.rows[0];
    return {
      id: row.id,
      topic: row.topic,
      seedQuestions: row.seed_questions,
      generatedQuestions: row.generated_questions,
      createdAt: row.created_at,
    };
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
