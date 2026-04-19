import { Ingredient, ShoppingItem } from "../models/types";
import { ShoppingListModel } from "../models/ShoppingList";

export class ShoppingService {
  static addFromIngredients(ingredients: Ingredient[]): ShoppingItem[] {
    const items = ingredients.map((ing) => ({
      id: "", // Will be assigned by model
      name: ing.name,
      amount: ing.amount,
      category: ing.category,
      checked: false,
    }));

    return ShoppingListModel.add(items);
  }

  static getAll(): ShoppingItem[] {
    return ShoppingListModel.getAll();
  }

  static toggle(id: string): ShoppingItem | null {
    return ShoppingListModel.toggle(id);
  }

  static remove(id: string): boolean {
    return ShoppingListModel.remove(id);
  }

  static clear(): void {
    ShoppingListModel.clear();
  }
}
