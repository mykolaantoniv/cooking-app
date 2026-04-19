import express, { Request, Response, NextFunction } from "express";
import recipesRouter from "./routes/recipes";
import shoppingRouter from "./routes/shopping";

const app = express();

// Middleware
app.use(express.json());

// CORS headers (allow all for MVP)
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Routes
app.use("/recipes", recipesRouter);
app.use("/shopping-list", shoppingRouter);

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Cooking Assistant API - MVP",
    endpoints: [
      "GET /recipes",
      "GET /recipes/:id",
      "POST /recipes/match",
      "POST /shopping-list/from-recipe",
    ],
  });
});

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found" });
});

export default app;
