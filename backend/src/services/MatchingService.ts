import { Recipe, RecipeMatch, MatchRequest } from "../models/types";
import { RecipeModel } from "../models/Recipe";

export class MatchingService {
  /**
   * Normalize ingredient names for consistent comparison
   */
  private static normalize(name: string): string {
    return name.toLowerCase().trim();
  }

  /**
   * Match recipes based on selected ingredients
   * Algorithm:
   * 1. Filter recipes by meal type
   * 2. For each recipe, calculate:
   *    - matchCount (how many selected ingredients it contains)
   *    - missingIngredients (ingredients not in selection)
   * 3. Sort by: missingCount ASC → matchCount DESC → cookTime ASC
   * 4. Return all recipes (including 0 matches)
   */
  static match(request: MatchRequest): RecipeMatch[] {
    const { selectedIngredients, mealType } = request;

    // Normalize selected ingredients for comparison
    const normalizedSelected = selectedIngredients.map((ing) =>
      this.normalize(ing)
    );

    // Get recipes by meal type
    const recipes = RecipeModel.getByMealType(mealType);

    // Score each recipe
    const scored: RecipeMatch[] = recipes.map((recipe) => {
      // Get recipe ingredient names (normalized)
      const recipeIngredientNames = recipe.ingredients.map((ing) =>
        this.normalize(ing.name)
      );

      // Count matches
      let matchCount = 0;
      for (const selected of normalizedSelected) {
        if (recipeIngredientNames.includes(selected)) {
          matchCount++;
        }
      }

      // Identify missing ingredients
      const missingIngredients = recipe.ingredients.filter(
        (ing) => !normalizedSelected.includes(this.normalize(ing.name))
      );

      return {
        recipe,
        matchCount,
        missingCount: missingIngredients.length,
        missingIngredients,
      };
    });

    // Sort by ranking priority:
    // 1. Fewer missing ingredients first
    // 2. More matches second
    // 3. Faster cook time third
    scored.sort((a, b) => {
      if (a.missingCount !== b.missingCount) {
        return a.missingCount - b.missingCount;
      }
      if (a.matchCount !== b.matchCount) {
        return b.matchCount - a.matchCount;
      }
      return a.recipe.cookTime - b.recipe.cookTime;
    });

    return scored;
  }
}
