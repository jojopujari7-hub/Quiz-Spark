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

const questionPrefixes = [
  "Pop quiz!",
  "Brain teaser:",
  "Quick fire round:",
  "Bonus points:",
  "Trivia time:",
  "Think fast:",
  "Challenge:",
  "Test yourself:",
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

function extractKeywords(text: string): string[] {
  const stopWords = new Set(['the', 'a', 'an', 'is', 'are', 'was', 'were', 'what', 'when', 'where', 'who', 'why', 'how', 'which', 'that', 'this', 'it', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from', 'or', 'and', 'but', 'if', 'do', 'does', 'did', 'have', 'has', 'had', 'be', 'been', 'being', 'will', 'would', 'could', 'should', 'may', 'might', 'must', 'can', 'like', 'about', 'their', 'them', 'they', 'there', 'these', 'those', 'your', 'you', 'its', 'his', 'her', 'our', 'we', 'my', 'me', 'am', 'been', 'being', 'very', 'just', 'also', 'than', 'then', 'so', 'such', 'some', 'any', 'each', 'every', 'all', 'both', 'few', 'more', 'most', 'other', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'between', 'under', 'again', 'further', 'once']);
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function createTrueFalseQuestion(topic: string, seedQuestion: string): QuizQuestion {
  const prefix = pickRandom(questionPrefixes);
  const isTrue = Math.random() > 0.5;
  
  let questionText: string;
  let options: string[];
  let correctIndex: number;
  
  if (isTrue) {
    questionText = `${prefix} Based on "${topic}": ${seedQuestion}`;
    options = ["True", "False", "Partially true", "Cannot be determined"];
    correctIndex = 0;
  } else {
    const keywords = extractKeywords(seedQuestion);
    const modifiedQuestion = seedQuestion.replace(/\?$/, '') + " - or is that a myth?";
    questionText = `${prefix} Fact or fiction about ${topic}: ${modifiedQuestion}`;
    options = ["This is a fact", "This is fiction", "It depends on context", "Experts disagree on this"];
    correctIndex = 0;
  }
  
  const shuffledOptions = shuffle(options);
  const newCorrectIndex = shuffledOptions.indexOf(options[correctIndex]);
  
  return {
    question: questionText,
    options: shuffledOptions,
    correctIndex: newCorrectIndex,
    funFact: pickRandom(funFacts),
  };
}

function createMultipleChoiceFromSeed(topic: string, seedQuestion: string, allSeeds: string[]): QuizQuestion {
  const prefix = pickRandom(questionPrefixes);
  const keywords = extractKeywords(seedQuestion);
  const mainKeyword = keywords[0] || topic.split(' ')[0];
  
  const questionPatterns = [
    `${prefix} Regarding ${topic}: ${seedQuestion}`,
    `${prefix} About ${topic} - ${seedQuestion}`,
    `${prefix} When studying ${topic}: ${seedQuestion}`,
  ];
  
  const questionText = pickRandom(questionPatterns);
  
  const answerPatterns = [
    `Yes, this is correct about ${topic}`,
    `This is accurate according to ${topic} knowledge`,
    `Experts confirm this is true`,
    `This statement is verified`,
  ];
  
  const wrongPatterns = [
    `No, this is a common misconception`,
    `This is actually incorrect`,
    `This contradicts what we know about ${topic}`,
    `This has been disproven`,
    `Only partially accurate`,
    `This oversimplifies the topic`,
  ];
  
  const correctAnswer = pickRandom(answerPatterns);
  const wrongAnswers = shuffle(wrongPatterns).slice(0, 3);
  
  const allOptions = shuffle([correctAnswer, ...wrongAnswers]);
  const correctIndex = allOptions.indexOf(correctAnswer);
  
  return {
    question: questionText,
    options: allOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

function createTopicQuestion(topic: string, keywords: string[], questionNumber: number): QuizQuestion {
  const prefix = pickRandom(questionPrefixes);
  const keyword = keywords[questionNumber % keywords.length] || topic.split(' ')[0];
  
  const questionPatterns = [
    {
      q: `${prefix} What is most important to understand about ${keyword} in ${topic}?`,
      correct: `Understanding ${keyword} is key to mastering ${topic}`,
      wrong: [
        `${capitalizeFirst(keyword)} is not relevant to ${topic}`,
        `You can ignore ${keyword} when studying ${topic}`,
        `${capitalizeFirst(keyword)} is only for advanced learners`,
      ]
    },
    {
      q: `${prefix} How does ${keyword} relate to ${topic}?`,
      correct: `${capitalizeFirst(keyword)} plays a central role in ${topic}`,
      wrong: [
        `${capitalizeFirst(keyword)} is unrelated to ${topic}`,
        `The connection is purely coincidental`,
        `They are completely separate concepts`,
      ]
    },
    {
      q: `${prefix} Why is ${keyword} significant when discussing ${topic}?`,
      correct: `${capitalizeFirst(keyword)} is fundamental to understanding ${topic}`,
      wrong: [
        `${capitalizeFirst(keyword)} has no real significance`,
        `It's just a minor detail`,
        `Most experts overlook ${keyword}`,
      ]
    },
    {
      q: `${prefix} Which statement about ${keyword} in ${topic} is accurate?`,
      correct: `${capitalizeFirst(keyword)} is an essential concept in ${topic}`,
      wrong: [
        `${capitalizeFirst(keyword)} was disproven years ago`,
        `Only beginners focus on ${keyword}`,
        `${capitalizeFirst(keyword)} is outdated terminology`,
      ]
    },
    {
      q: `${prefix} When learning about ${topic}, what should you know about ${keyword}?`,
      correct: `${capitalizeFirst(keyword)} helps explain core concepts of ${topic}`,
      wrong: [
        `You don't need to know about ${keyword}`,
        `${capitalizeFirst(keyword)} makes things more confusing`,
        `Skip ${keyword} and move to advanced topics`,
      ]
    },
  ];
  
  const pattern = questionPatterns[questionNumber % questionPatterns.length];
  const allOptions = shuffle([pattern.correct, ...pattern.wrong]);
  const correctIndex = allOptions.indexOf(pattern.correct);
  
  return {
    question: pattern.q,
    options: allOptions,
    correctIndex,
    funFact: pickRandom(funFacts),
  };
}

export function generateQuiz(topic: string, seedQuestions: string[]): QuizQuestion[] {
  const questions: QuizQuestion[] = [];
  const allKeywords = seedQuestions.flatMap(extractKeywords);
  const uniqueKeywords = Array.from(new Set(allKeywords));
  
  seedQuestions.forEach((seed, index) => {
    if (index % 2 === 0) {
      questions.push(createTrueFalseQuestion(topic, seed));
    } else {
      questions.push(createMultipleChoiceFromSeed(topic, seed, seedQuestions));
    }
  });
  
  const additionalCount = 10 - seedQuestions.length;
  for (let i = 0; i < additionalCount; i++) {
    questions.push(createTopicQuestion(topic, uniqueKeywords, i));
  }
  
  return shuffle(questions).slice(0, 10);
}
