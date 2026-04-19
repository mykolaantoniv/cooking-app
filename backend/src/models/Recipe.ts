import fs from "fs";
import path from "path";
import { Recipe } from "./types";

const dataPath = path.join(__dirname, "../data/recipes.json");

export class RecipeModel {
  private static recipes: Recipe[] = [];

  static load(): Recipe[] {
    if (this.recipes.length === 0) {
      const data = fs.readFileSync(dataPath, "utf-8");
      this.recipes = JSON.parse(data);
    }
    return this.recipes;
  }

  static getAll(): Recipe[] {
    return this.load();
  }

  static getById(id: string): Recipe | null {
    return this.load().find((r) => r.id === id) || null;
  }

  static getByMealType(mealType: string): Recipe[] {
    return this.load().filter((r) => r.mealType === mealType);
  }
}
