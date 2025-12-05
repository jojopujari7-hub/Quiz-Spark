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

function createTopicOnlyQuestion(topic: string, index: number): QuizQuestion {
  const questionTemplates = [
    {
      q: `What would be a good first step to learn about ${topic}?`,
      correct: "Research the basics and key concepts",
      wrong: ["Ignore it completely", "Skip to advanced topics", "Assume you already know everything"]
    },
    {
      q: `Why might someone be interested in studying ${topic}?`,
      correct: "To gain knowledge and understanding",
      wrong: ["There's no reason to study it", "It's completely useless", "Only experts should care"]
    },
    {
      q: `How would you describe ${topic} to a friend?`,
      correct: "An interesting subject worth exploring",
      wrong: ["A boring waste of time", "Something to avoid", "Not worth discussing"]
    },
    {
      q: `What's the best approach to understanding ${topic}?`,
      correct: "Study with curiosity and patience",
      wrong: ["Don't bother trying", "Just guess everything", "Avoid asking questions"]
    },
    {
      q: `If you wanted to become an expert in ${topic}, what should you do?`,
      correct: "Study consistently and practice regularly",
      wrong: ["Give up immediately", "Never read about it", "Ignore all resources"]
    },
    {
      q: `What makes ${topic} worth learning about?`,
      correct: "It expands your knowledge and perspective",
      wrong: ["Nothing at all", "It's a waste of time", "There's no value in it"]
    },
    {
      q: `How could knowledge of ${topic} be useful?`,
      correct: "It helps understand related concepts",
      wrong: ["It has no practical use", "You'll never need it", "It's completely irrelevant"]
    },
    {
      q: `What's true about learning ${topic}?`,
      correct: "Anyone can learn with effort",
      wrong: ["Only geniuses can understand it", "It's impossible to learn", "You need special powers"]
    },
    {
      q: `Why do people study ${topic}?`,
      correct: "To satisfy curiosity and gain expertise",
      wrong: ["They have nothing better to do", "It's required by law", "For no good reason"]
    },
    {
      q: `What attitude helps when studying ${topic}?`,
      correct: "Openness and willingness to learn",
      wrong: ["Complete indifference", "Hostility and resistance", "Stubborn closed-mindedness"]
    },
  ];
  
  const template = questionTemplates[index % questionTemplates.length];
  const allOptions = shuffle([template.correct, ...template.wrong]);
  const correctIndex = allOptions.indexOf(template.correct);
  
  const prefixes = ["Pop quiz!", "Brain teaser:", "Quick fire:", "Trivia time:", "Think fast:", "Challenge:"];
  const prefix = prefixes[index % prefixes.length];
  
  return {
    question: `${prefix} ${template.q}`,
    options: allOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

export function generateQuiz(topic: string, seedQuestions: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const filteredSeeds = seedQuestions.filter(q => q.trim().length > 0);
  
  if (filteredSeeds.length === 0) {
    for (let i = 0; i < 10; i++) {
      questions.push(createTopicOnlyQuestion(topic, i));
    }
    return shuffle(questions);
  }
  
  filteredSeeds.forEach((seed, index) => {
    questions.push(createDirectQuestion(topic, seed, index));
  });
  
  if (filteredSeeds.length >= 2) {
    questions.push(createTrueFalseFromSeed(topic, filteredSeeds[0], 0));
    questions.push(createTrueFalseFromSeed(topic, filteredSeeds[1], 1));
  } else if (filteredSeeds.length === 1) {
    questions.push(createTrueFalseFromSeed(topic, filteredSeeds[0], 0));
  }
  
  let knowledgeIndex = 0;
  while (questions.length < 8 && filteredSeeds.length > 0) {
    questions.push(createKnowledgeQuestion(topic, filteredSeeds, knowledgeIndex));
    knowledgeIndex++;
  }
  
  let relevanceIndex = 0;
  while (questions.length < 10 && filteredSeeds.length > 0) {
    questions.push(createTopicRelevanceQuestion(topic, filteredSeeds, relevanceIndex));
    relevanceIndex++;
  }
  
  let topicIndex = 0;
  while (questions.length < 10) {
    questions.push(createTopicOnlyQuestion(topic, topicIndex));
    topicIndex++;
  }
  
  return shuffle(questions).slice(0, 10);
}
