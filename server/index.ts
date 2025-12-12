import express from "express";
import { registerRoutes } from "./routes";

const app = express();

// Mount routes
registerRoutes(null, app);

// Root route so the base URL works
app.get("/", (req, res) => {
  res.send("Server is running! Try /api/quiz");
});

// IMPORTANT: use Replit's assigned port
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
