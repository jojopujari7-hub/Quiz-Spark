// quizGenerator.ts
export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  funFact?: string;
}

function shuffle<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Egyptian quiz data (10 questions)
const egyptianQuizData: QuizQuestion[] = [
  { question: "Who was the first female pharaoh of Egypt?", options: ["Cleopatra","Nefertiti","Hatshepsut","Merneith"], correctIndex: 2, funFact: "Hatshepsut expanded trade routes and built magnificent temples." },
  { question: "What structure is most associated with ancient Egypt?", options: ["Ziggurat","Pyramid","Colosseum","Stonehenge"], correctIndex: 1, funFact: "The Great Pyramid of Giza is the only surviving Wonder of the Ancient World." },
  { question: "Which river was the lifeline of ancient Egypt?", options: ["Tigris","Euphrates","Nile","Amazon"], correctIndex: 2, funFact: "The Nile’s annual floods made the land fertile for farming." },
  { question: "What writing system did ancient Egyptians use?", options: ["Cuneiform","Hieroglyphics","Alphabet","Runes"], correctIndex: 1, funFact: "Hieroglyphics combined logographic and alphabetic elements." },
  { question: "Which pharaoh’s tomb was discovered nearly intact in 1922?", options: ["Ramses II","Tutankhamun","Akhenaten","Khufu"], correctIndex: 1, funFact: "Tutankhamun’s tomb contained thousands of artifacts, including his famous golden mask." },
  { question: "What was the purpose of the Sphinx of Giza?", options: ["Temple","Tomb","Guardian statue","Palace"], correctIndex: 2, funFact: "The Sphinx is believed to guard the pyramids and represent Pharaoh Khafre." },
  { question: "Which Egyptian god was associated with the afterlife?", options: ["Ra","Osiris","Anubis","Horus"], correctIndex: 1, funFact: "Osiris was the god of the dead and resurrection." },
  { question: "What material did Egyptians write on?", options: ["Clay tablets","Papyrus","Animal skins","Wood"], correctIndex: 1, funFact: "Papyrus was made from reeds growing along the Nile." },
  { question: "Which pharaoh tried to introduce monotheism?", options: ["Akhenaten","Ramses II","Seti I","Sneferu"], correctIndex: 0, funFact: "Akhenaten worshipped Aten, the sun disk, as the sole god." },
  { question: "What was the Rosetta Stone key to understanding?", options: ["Mayan glyphs","Hieroglyphics","Cuneiform","Runes"], correctIndex: 1, funFact: "The Rosetta Stone had the same text in Greek, Demotic, and Hieroglyphics." }
];

// Always return all 10 questions shuffled
export function generateQuiz(topic: string = "egypt"): QuizQuestion[] {
  const quiz = shuffle(egyptianQuizData);
  return quiz; // no slicing, no truncation
}
