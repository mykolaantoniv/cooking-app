import { ShoppingItem } from "./types";

// In-memory shopping list (no persistence yet)
export class ShoppingListModel {
  private static items: ShoppingItem[] = [];
  private static nextId = 1;

  static getAll(): ShoppingItem[] {
    return [...this.items];
  }

  static add(items: ShoppingItem[]): ShoppingItem[] {
    const newItems = items.map((item) => ({
      ...item,
      id: `item-${this.nextId++}`,
      checked: false,
    }));
    this.items.push(...newItems);
    return newItems;
  }

  static toggle(id: string): ShoppingItem | null {
    const item = this.items.find((i) => i.id === id);
    if (item) {
      item.checked = !item.checked;
    }
    return item || null;
  }

  static remove(id: string): boolean {
    const index = this.items.findIndex((i) => i.id === id);
    if (index > -1) {
      this.items.splice(index, 1);
      return true;
    }
    return false;
  }

  static clear(): void {
    this.items = [];
    this.nextId = 1;
  }
}
