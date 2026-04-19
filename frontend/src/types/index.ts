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
  cookTime: number;
  calories: number;
  protein: number;
  fat: number;
  carbs: number;
  ingredients: Ingredient[];
  steps: string[];
}

export interface RecipeMatch {
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
}

export interface ShoppingItem {
  id: string;
  name: string;
  amount: string;
  category: string;
  checked: boolean;
}

export interface MatchRequest {
  selectedIngredients: string[];
  mealType: MealType;
}

export interface MatchResponse {
  recipes: RecipeMatch[];
}
