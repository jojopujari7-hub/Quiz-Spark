import express from "express";

const router = express.Router();

router.get("/api/quiz", (req, res) => {
  const quiz = [
    {
      question: "Which weapon was especially important for Egyptian archers?",
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
      question: "Which Pharaoh is famous for expanding Egypt’s military power into Nubia and the Levant?",
      options: ["Ramses II", "Thutmose III", "Akhenaten", "Tutankhamun"],
      answer: "Thutmose III",
      fact: "Thutmose III led 17 campaigns and greatly expanded Egypt’s empire."
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
      question: "Which Pharaoh signed one of the world’s first recorded peace treaties?",
      options: ["Ramses II", "Amenhotep III", "Sneferu", "Khufu"],
      answer: "Ramses II",
      fact: "After the Battle of Kadesh, Ramses II and the Hittites agreed to a peace treaty."
    }
  ];

  res.json(quiz);
});

export function registerRoutes(_httpServer: any, app: express.Express) {
  app.use(router);
}
