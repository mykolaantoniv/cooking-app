import axios from "axios";
import {
  Recipe,
  MatchRequest,
  MatchResponse,
  RecipeMatch,
} from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_URL,
});

export const recipeApi = {
  // Get all recipes or filter by meal type
  getAll: async (mealType?: string) => {
    const response = await api.get("/recipes", {
      params: mealType ? { mealType } : {},
    });
    return response.data.recipes;
  },

  // Get single recipe by ID
  getById: async (id: string): Promise<Recipe> => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  // Match recipes based on selected ingredients
  match: async (request: MatchRequest): Promise<RecipeMatch[]> => {
    const response = await api.post<MatchResponse>("/recipes/match", request);
    return response.data.recipes;
  },
};

export const shoppingApi = {
  // Add recipe ingredients to shopping list
  addFromRecipe: async (recipeId: string) => {
    const response = await api.post("/shopping-list/from-recipe", {
      recipeId,
    });
    return response.data;
  },
};
