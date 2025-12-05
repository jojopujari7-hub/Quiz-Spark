import { QuizQuestion } from "@shared/schema";

const questionTemplates = {
  trueFalse: [
    "True or False: {statement}",
    "Is it true that {statement}?",
    "Fact check: {statement}",
  ],
  multipleChoice: [
    "What is {topic}?",
    "Which of the following is correct about {topic}?",
    "When it comes to {topic}, which statement is accurate?",
  ],
  fillBlank: [
    "Complete this: {partial}...",
    "{partial} - what comes next?",
  ],
  funVariants: [
    "Pop quiz! {question}",
    "Brain teaser: {question}",
    "Quick fire round: {question}",
    "Bonus points: {question}",
    "Trivia time: {question}",
  ],
};

const funFacts = [
  "Did you know? This question was inspired by real-world trivia!",
  "Fun fact: Most people get this one wrong on their first try!",
  "Interesting tidbit: This topic has fascinating history!",
  "Quiz master tip: Take your time with this one!",
  "Brain boost: Thinking about this activates your learning centers!",
];

const wrongAnswerTemplates = [
  "Not quite! {topic} is actually different.",
  "Close, but this is a common misconception.",
  "This sounds right but isn't the correct answer.",
  "A tricky distractor - many people pick this one!",
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

function generateWrongAnswers(correctAnswer: string, topic: string): string[] {
  const wrongAnswers: string[] = [];
  const variations = [
    `Not ${correctAnswer.split(" ").slice(0, 3).join(" ")}...`,
    `The opposite of the correct answer`,
    `A common misconception about ${topic}`,
    `Something that sounds related but isn't`,
  ];
  
  for (let i = 0; i < 3; i++) {
    wrongAnswers.push(pickRandom(variations) + ` (Option ${i + 1})`);
  }
  
  return wrongAnswers;
}

function extractKeywords(text: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'what', 'when', 'where', 'who', 'why', 'how', 'which', 'that', 'this', 'it', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'or', 'and', 'but', 'if', 'do', 'does', 'did', 'have', 'has', 'had', 'be', 'been', 'being', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can']);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
}

function createVariation(question: string, template: string): string {
  return template.replace('{question}', question);
}

function generateOptionsFromSeed(seedQuestion: string, topic: string): { options: string[]; correctIndex: number } {
  const correctAnswer = `The answer related to: ${seedQuestion.slice(0, 30)}...`;
  const wrongAnswers = [
    `Incorrect option about ${topic} #1`,
    `Incorrect option about ${topic} #2`, 
    `Incorrect option about ${topic} #3`,
  ];
  
  const allOptions = [correctAnswer, ...wrongAnswers];
  const shuffledOptions = shuffle(allOptions);
  const correctIndex = shuffledOptions.indexOf(correctAnswer);
  
  return { options: shuffledOptions, correctIndex };
}

export function generateQuiz(topic: string, seedQuestions: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const usedTemplates = new Set<string>();
  
  seedQuestions.forEach((seed, index) => {
    const keywords = extractKeywords(seed);
    
    const funVariant = pickRandom(questionTemplates.funVariants);
    const variedQuestion = createVariation(seed, funVariant);
    const { options, correctIndex } = generateOptionsFromSeed(seed, topic);
    
    questions.push({
      question: variedQuestion,
      options,
      correctIndex,
      funFact: pickRandom(funFacts),
    });
  });
  
  const additionalCount = 10 - seedQuestions.length;
  const allKeywords = seedQuestions.flatMap(extractKeywords);
  const uniqueKeywords = Array.from(new Set(allKeywords));
  
  const generatedQuestionTemplates = [
    `What's the connection between ${topic} and {keyword}?`,
    `In the context of ${topic}, what role does {keyword} play?`,
    `How would you describe {keyword} when discussing ${topic}?`,
    `Which statement best describes {keyword} in ${topic}?`,
    `True or false: {keyword} is essential to understanding ${topic}`,
    `What makes {keyword} unique in the world of ${topic}?`,
    `If someone asked about {keyword} in ${topic}, what would you say?`,
  ];
  
  for (let i = 0; i < additionalCount; i++) {
    const keyword = uniqueKeywords[i % uniqueKeywords.length] || topic;
    const template = generatedQuestionTemplates[i % generatedQuestionTemplates.length];
    const questionText = template.replace('{keyword}', keyword);
    
    const funVariant = pickRandom(questionTemplates.funVariants);
    const finalQuestion = createVariation(questionText, funVariant);
    
    const correctOption = `The correct understanding of ${keyword} in ${topic}`;
    const wrongOptions = [
      `A common misconception about ${keyword}`,
      `An unrelated concept often confused with ${keyword}`,
      `The opposite meaning of ${keyword} in this context`,
    ];
    
    const allOptions = shuffle([correctOption, ...wrongOptions]);
    const correctIndex = allOptions.indexOf(correctOption);
    
    questions.push({
      question: finalQuestion,
      options: allOptions,
      correctIndex,
      funFact: pickRandom(funFacts),
    });
  }
  
  return shuffle(questions).slice(0, 10);
}
