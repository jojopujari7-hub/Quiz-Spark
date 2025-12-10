export function generateQuiz(numQuestions = 5): QuizQuestion[] {
  const questions: QuizQuestion[] = [];

  const allSeeds = [...founderSeeds, ...expansionSeeds];
  const availableSeeds = allSeeds.filter(q => q.trim().length > 0 && !usedSeeds.has(q));

  if (availableSeeds.length === 0) {
    // Auto-reset when all seeds are exhausted
    usedSeeds.clear();
    saveUsedSeeds();

    // Reload all seeds
    const resetSeeds = shuffle(allSeeds).slice(0, numQuestions);
    resetSeeds.forEach((seed, index) => {
      questions.push(createDirectQuestion(seed, index));
      usedSeeds.add(seed);
    });
    saveUsedSeeds();
    return questions;
  }
    return questions;
  }

  const shuffledSeeds = shuffle(availableSeeds);
  const selectedSeeds = shuffledSeeds.slice(0, numQuestions);

  selectedSeeds.forEach((seed, index) => {
    questions.push(createDirectQuestion(seed, index));
    usedSeeds.add(seed);
  });

  saveUsedSeeds();
  return shuffle(questions).slice(0, numQuestions);
}
