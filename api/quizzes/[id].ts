import { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../server/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    try {
      const { id } = req.query;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Quiz ID is required' });
      }

      const quiz = await storage.getQuiz(id);

      if (!quiz) {
        return res.status(404).json({ error: 'Quiz not found' });
      }

      return res.json(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      
      let errorMessage = 'Failed to fetch quiz';
      if (error instanceof Error) {
        const errorText = error.message + (error.cause ? String(error.cause) : '');
        if (errorText.includes('ECONNREFUSED') || errorText.includes('connect') || errorText.includes('Connection refused')) {
          errorMessage = 'Database connection failed. Please ensure PostgreSQL is running and DATABASE_URL is configured correctly.';
        } else {
          errorMessage = error.message || errorMessage;
        }
      }
      
      return res.status(500).json({ error: errorMessage });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

