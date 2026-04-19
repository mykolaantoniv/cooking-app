export type MealType = "breakfast" | "lunch" | "dinner";

export interface Ingredient {
  name: string;
  amount: string;
  category: string;
}

export interface Recipe {
  id: string;
  title: string;
  mealType: MealType;
  cookTime: number; // in minutes
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: Ingredient[];
  steps: string[];
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  category: string;
  checked: boolean;
}

export interface RecipeMatch {
  recipe: Recipe;
  matchCount: number;
  missingCount: number;
  missingIngredients: Ingredient[];
}

export interface MatchRequest {
  selectedIngredients: string[];
  mealType: MealType;
}

export interface MatchResponse {
  recipes: Array<{
    id: string;
    title: string;
    mealType: MealType;
    cookTime: number;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    matchCount: number;
    missingCount: number;
    missingIngredients: Ingredient[];
  }>;
}
