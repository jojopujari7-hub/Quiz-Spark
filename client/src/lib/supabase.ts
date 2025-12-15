// Supabase client for direct REST API access
// This allows us to host the frontend statically

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://ekaykrxsfwpfzsmzxegj.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrYXlrcnhzZndwZnpzbXp4ZWdqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU3NTA3NDAsImV4cCI6MjA4MTMyNjc0MH0.sFHWTUcCanHvmByQtZ0CjGXJwRJ3CWodifVF84joM6U';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  funFact?: string;
}

export interface Quiz {
  id: string;
  topic: string;
  seedQuestions: string[];
  generatedQuestions: QuizQuestion[];
  createdAt: string;
}

// Generate quiz questions (client-side)
export function generateQuiz(topic: string): QuizQuestion[] {
  // Egyptian military history quiz questions (same as server)
  const baseQuestions = [
    {
      question: "Which weapon gave Egyptian archers greater range and power?",
      options: ["Bow and arrow", "Spear", "Sword", "Sling"],
      answer: "Bow and arrow",
      fact: "Composite bows gave Egyptian archers greater range and power."
    },
    {
      question: "What military innovation did Egyptians adopt from the Hyksos?",
      options: ["Chariot", "Catapult", "War elephants", "Gunpowder"],
      answer: "Chariot",
      fact: "Chariots became a decisive weapon in Egyptian warfare."
    },
    {
      question: "Which material was commonly used for Egyptian shields?",
      options: ["Bronze", "Wood and leather", "Iron", "Stone"],
      answer: "Wood and leather",
      fact: "Shields were lightweight, making them easier to carry in battle."
    },
    {
      question: "How were Egyptian armies organized during campaigns?",
      options: ["Into divisions", "Into clans", "Into guilds", "Into tribes"],
      answer: "Into divisions",
      fact: "Each division was named after a god and had thousands of soldiers."
    },
    {
      question: "What was daily life like for Egyptian soldiers?",
      options: ["Farming when not at war", "Constant training", "Living in palaces", "Traveling abroad"],
      answer: "Farming when not at war",
      fact: "Soldiers often returned to agriculture between campaigns."
    },
    {
      question: "Which Pharaoh is famous for expanding Egypt's military power into Nubia and the Levant?",
      options: ["Ramses II", "Thutmose III", "Akhenaten", "Tutankhamun"],
      answer: "Thutmose III",
      fact: "Thutmose III led 17 campaigns and greatly expanded Egypt's empire."
    },
    {
      question: "What was the Battle of Kadesh known for?",
      options: ["Largest chariot battle", "First naval battle", "Last pyramid defense", "Siege of Thebes"],
      answer: "Largest chariot battle",
      fact: "Ramses II fought the Hittites at Kadesh around 1274 BCE."
    },
    {
      question: "Which enemy did Egypt frequently fight in the south?",
      options: ["Nubians", "Persians", "Greeks", "Romans"],
      answer: "Nubians",
      fact: "Egypt both fought and traded with Nubia, rich in gold."
    },
    {
      question: "What role did mercenaries play in the Egyptian military?",
      options: ["Guarding temples", "Supporting campaigns", "Building pyramids", "Farming land"],
      answer: "Supporting campaigns",
      fact: "Egypt hired foreign soldiers, including Libyans and Nubians."
    },
    {
      question: "Which Pharaoh signed one of the world's first recorded peace treaties?",
      options: ["Ramses II", "Amenhotep III", "Sneferu", "Khufu"],
      answer: "Ramses II",
      fact: "After the Battle of Kadesh, Ramses II and the Hittites agreed to a peace treaty."
    }
  ];

  return baseQuestions.map((q) => {
    const correctIndex = q.options.findIndex(opt => opt === q.answer);
    return {
      question: q.question,
      options: q.options,
      correctIndex: correctIndex >= 0 ? correctIndex : 0,
      funFact: q.fact,
    };
  });
}

// Create quiz using Supabase REST API
export async function createQuiz(topic: string, seedQuestions: string[]): Promise<Quiz> {
  const generatedQuestions = generateQuiz(topic);
  const id = crypto.randomUUID();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Prefer': 'return=representation',
    },
    body: JSON.stringify({
      id,
      topic,
      seed_questions: seedQuestions.length > 0 ? seedQuestions : [],
      generated_questions: generatedQuestions,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to create quiz: ${error}`);
  }

  const [quiz] = await response.json();
  return {
    id: quiz.id,
    topic: quiz.topic,
    seedQuestions: quiz.seed_questions || [],
    generatedQuestions: quiz.generated_questions,
    createdAt: quiz.created_at,
  };
}

// Get quiz using Supabase REST API
export async function getQuiz(id: string): Promise<Quiz | null> {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/quizzes?id=eq.${id}&select=*`, {
    method: 'GET',
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }

  const quizzes = await response.json();
  if (quizzes.length === 0) {
    return null;
  }

  const quiz = quizzes[0];
  return {
    id: quiz.id,
    topic: quiz.topic,
    seedQuestions: quiz.seed_questions || [],
    generatedQuestions: quiz.generated_questions,
    createdAt: quiz.created_at,
  };
}

