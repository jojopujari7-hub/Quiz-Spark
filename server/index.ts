import express from "express";
import { registerRoutes } from "./routes";

const app = express();

// Mount routes
registerRoutes(null, app);

// Root route
app.get("/", (req, res) => {
  res.send("Server is running! Try /api/quiz");
});

// Use environment port (Replit sets this automatically)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
