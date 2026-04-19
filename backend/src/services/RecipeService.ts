import { Recipe } from "../models/types";
import { RecipeModel } from "../models/Recipe";

export class RecipeService {
  static getAll(mealType?: string): Recipe[] {
    if (mealType) {
      return RecipeModel.getByMealType(mealType);
    }
    return RecipeModel.getAll();
  }

  static getById(id: string): Recipe | null {
    return RecipeModel.getById(id);
  }
}
