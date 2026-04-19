import { Router, Request, Response } from "express";
import { RecipeService } from "../services/RecipeService";
import { MatchingService } from "../services/MatchingService";
import { MatchRequest, MatchResponse } from "../models/types";

const router = Router();

/**
 * GET /recipes
 * Get all recipes or filter by meal type
 * Query params: mealType (optional)
 */
router.get("/", (req: Request, res: Response) => {
  const mealType = req.query.mealType as string | undefined;

  try {
    const recipes = RecipeService.getAll(mealType);
    res.json({ recipes });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

/**
 * GET /recipes/:id
 * Get recipe by ID with full details
 */
router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const recipe = RecipeService.getById(id);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }
    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

/**
 * POST /recipes/match
 * Match recipes based on selected ingredients
 * Body: { selectedIngredients: string[], mealType: "breakfast" | "lunch" | "dinner" }
 */
router.post("/match", (req: Request, res: Response) => {
  const { selectedIngredients, mealType } = req.body as MatchRequest;

  // Validation
  if (!Array.isArray(selectedIngredients)) {
    return res
      .status(400)
      .json({ error: "selectedIngredients must be an array" });
  }
  if (!mealType || !["breakfast", "lunch", "dinner"].includes(mealType)) {
    return res
      .status(400)
      .json({ error: "mealType must be breakfast, lunch, or dinner" });
  }

  try {
    const matches = MatchingService.match({
      selectedIngredients,
      mealType,
    });

    // Transform to response format
    const response: MatchResponse = {
      recipes: matches.map((m) => ({
        id: m.recipe.id,
        title: m.recipe.title,
        mealType: m.recipe.mealType,
        cookTime: m.recipe.cookTime,
        calories: m.recipe.calories,
        protein: m.recipe.protein,
        fat: m.recipe.fat,
        carbs: m.recipe.carbs,
        matchCount: m.matchCount,
        missingCount: m.missingCount,
        missingIngredients: m.missingIngredients,
      })),
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to match recipes" });
  }
});

export default router;
