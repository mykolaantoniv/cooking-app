import { Router, Request, Response } from "express";
import { ShoppingService } from "../services/ShoppingService";
import { RecipeService } from "../services/RecipeService";

const router = Router();

/**
 * GET /shopping-list
 * Get current shopping list
 */
router.get("/", (req: Request, res: Response) => {
  try {
    const items = ShoppingService.getAll();
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch shopping list" });
  }
});

/**
 * POST /shopping-list/from-recipe
 * Add recipe ingredients to shopping list
 * Body: { recipeId: string }
 */
router.post("/from-recipe", (req: Request, res: Response) => {
  const { recipeId } = req.body;

  if (!recipeId) {
    return res.status(400).json({ error: "recipeId is required" });
  }

  try {
    const recipe = RecipeService.getById(recipeId);
    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const addedItems = ShoppingService.addFromIngredients(recipe.ingredients);
    res.status(201).json({
      success: true,
      itemsAdded: addedItems.length,
      items: addedItems,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to add items to shopping list" });
  }
});

export default router;
