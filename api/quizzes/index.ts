import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../server/storage.js';
import { generateQuiz } from '../server/quizGenerator.js';
import { quizRequestSchema, type QuizQuestion } from '../shared/schema.js';
import { fromZodError } from 'zod-validation-error';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST') {
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
        seedQuestions: Array.isArray(seedQuestions) ? seedQuestions : [],
        generatedQuestions,
      });

      return res.json(quiz);
    } catch (error) {
      console.error('Error creating quiz:', error);
      console.error('Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
      
      let errorMessage = 'Failed to create quiz';
      if (error instanceof Error) {
        // Log full error chain
        let fullError = error.message;
        if (error.cause) {
          fullError += ' | Cause: ' + String(error.cause);
        }
        if ((error as any).stack) {
          console.error('Stack:', (error as any).stack);
        }
        
        const errorText = fullError;
        if (errorText.includes('ECONNREFUSED') || errorText.includes('connect') || errorText.includes('Connection refused')) {
          errorMessage = 'Database connection failed. Please ensure PostgreSQL is running and DATABASE_URL is configured correctly.';
        } else if (errorText.includes('relation') && errorText.includes('does not exist')) {
          errorMessage = 'Database table not found. Please run the migrations to set up the database schema.';
        } else {
          errorMessage = fullError || errorMessage;
        }
      }
      
      return res.status(500).json({ error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

