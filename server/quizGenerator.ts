import { QuizQuestion } from "@shared/schema";

const funFacts = [
  "Did you know? This question was inspired by real-world trivia!",
  "Fun fact: Most people get this one wrong on their first try!",
  "Interesting tidbit: This topic has fascinating history!",
  "Quiz master tip: Take your time with this one!",
  "Brain boost: Thinking about this activates your learning centers!",
  "Pro tip: Trust your first instinct on this one!",
  "Fun fact: Experts say this is one of the most interesting topics!",
  "Did you know? Learning new things creates new brain connections!",
];

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function pickRandom<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function createDirectQuestion(topic: string, seedQuestion: string, index: number): QuizQuestion {
  const prefixes = ["Pop quiz!", "Brain teaser:", "Quick fire:", "Trivia time:", "Think fast:", "Challenge:"];
  const prefix = prefixes[index % prefixes.length];
  
  const cleanQuestion = seedQuestion.trim().replace(/\?*$/, '?');
  const questionText = `${prefix} ${cleanQuestion}`;
  
  const correctAnswers = [
    "This is worth exploring",
    "A great question to research",
    "This deserves careful study",
    "An important topic to understand",
    "Worth investigating further",
  ];
  
  const wrongAnswers = [
    "Not relevant to this topic",
    "This is off-topic", 
    "Unrelated to the subject",
    "Not what we're studying",
    "This doesn't apply here",
    "A different subject entirely",
    "Not connected to our topic",
    "Outside the scope of study",
  ];
  
  const correct = pickRandom(correctAnswers);
  const wrongs = shuffle(wrongAnswers).slice(0, 3);
  
  const allOptions = shuffle([correct, ...wrongs]);
  const correctIndex = allOptions.indexOf(correct);
  
  return {
    question: questionText,
    options: allOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

function createTrueFalseFromSeed(topic: string, seedQuestion: string, index: number): QuizQuestion {
  const cleanQuestion = seedQuestion.trim().replace(/\?*$/, '');
  
  const templates = [
    `True or False: "${cleanQuestion}" is a valid question about ${topic}.`,
    `Is this question relevant to ${topic}? "${cleanQuestion}"`,
    `Would an expert in ${topic} discuss: "${cleanQuestion}"?`,
  ];
  
  const questionText = templates[index % templates.length];
  
  const options = ["Yes, definitely", "No, not at all", "Somewhat related", "Completely unrelated"];
  const shuffledOptions = shuffle(options);
  const correctIndex = shuffledOptions.indexOf("Yes, definitely");
  
  return {
    question: questionText,
    options: shuffledOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

function createKnowledgeQuestion(topic: string, seedQuestions: string[], index: number): QuizQuestion {
  const questionTemplates = [
    {
      q: `Which of these questions would help someone learn about ${topic}?`,
      getCorrect: (seeds: string[]) => seeds[index % seeds.length],
      wrong: [
        "What's the weather like today?",
        "How do you make a sandwich?",
        "What time is it in Tokyo?",
      ]
    },
    {
      q: `A student wants to study ${topic}. Which question should they explore?`,
      getCorrect: (seeds: string[]) => seeds[(index + 1) % seeds.length],
      wrong: [
        "What's for dinner tonight?",
        "How do computers work?",
        "When was the telephone invented?",
      ]
    },
    {
      q: `If you were researching ${topic}, which question would you ask?`,
      getCorrect: (seeds: string[]) => seeds[(index + 2) % seeds.length],
      wrong: [
        "How do plants photosynthesize?",
        "What causes rainbows?",
        "How do birds migrate?",
      ]
    },
    {
      q: `Which question is most relevant to understanding ${topic}?`,
      getCorrect: (seeds: string[]) => seeds[index % seeds.length],
      wrong: [
        "How do smartphones work?",
        "What makes ice cream cold?",
        "Why is the sky blue?",
      ]
    },
    {
      q: `An expert teaching about ${topic} would likely address:`,
      getCorrect: (seeds: string[]) => seeds[(index + 1) % seeds.length],
      wrong: [
        "How to ride a bicycle",
        "The rules of chess",
        "How to cook pasta",
      ]
    },
    {
      q: `Which topic belongs in a course about ${topic}?`,
      getCorrect: (seeds: string[]) => seeds[(index + 2) % seeds.length],
      wrong: [
        "Modern smartphone apps",
        "How to play guitar",
        "Baking techniques",
      ]
    },
    {
      q: `Someone curious about ${topic} should explore:`,
      getCorrect: (seeds: string[]) => seeds[index % seeds.length],
      wrong: [
        "Car engine mechanics",
        "Home decoration tips",
        "Video game strategies",
      ]
    },
  ];
  
  const template = questionTemplates[index % questionTemplates.length];
  const correct = template.getCorrect(seedQuestions);
  
  const allOptions = shuffle([correct, ...template.wrong]);
  const correctIndex = allOptions.indexOf(correct);
  
  return {
    question: template.q,
    options: allOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

function createTopicRelevanceQuestion(topic: string, seedQuestions: string[], index: number): QuizQuestion {
  const seed = seedQuestions[index % seedQuestions.length];
  const cleanSeed = seed.trim().replace(/\?*$/, '');
  
  const questionText = `How important is this question when studying ${topic}? "${cleanSeed}"`;
  
  const options = [
    "Very important - central to the topic",
    "Not important - unrelated",
    "Slightly relevant but not key",
    "Completely off-topic",
  ];
  
  const shuffledOptions = shuffle(options);
  const correctIndex = shuffledOptions.indexOf("Very important - central to the topic");
  
  return {
    question: questionText,
    options: shuffledOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

export function generateQuiz(topic: string, seedQuestions: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  
  seedQuestions.forEach((seed, index) => {
    questions.push(createDirectQuestion(topic, seed, index));
  });
  
  if (seedQuestions.length >= 2) {
    questions.push(createTrueFalseFromSeed(topic, seedQuestions[0], 0));
    questions.push(createTrueFalseFromSeed(topic, seedQuestions[1], 1));
  }
  
  let knowledgeIndex = 0;
  while (questions.length < 8) {
    questions.push(createKnowledgeQuestion(topic, seedQuestions, knowledgeIndex));
    knowledgeIndex++;
  }
  
  let relevanceIndex = 0;
  while (questions.length < 10) {
    questions.push(createTopicRelevanceQuestion(topic, seedQuestions, relevanceIndex));
    relevanceIndex++;
  }
  
  return shuffle(questions).slice(0, 10);
}
