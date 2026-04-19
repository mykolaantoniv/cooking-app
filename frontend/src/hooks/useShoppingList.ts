import { useState } from "react";
import { ShoppingItem } from "../types";

// Simple hook for client-side shopping list management
export const useShoppingList = () => {
  const [items, setItems] = useState<ShoppingItem[]>([]);

  const addItems = (newItems: ShoppingItem[]) => {
    setItems([...items, ...newItems]);
  };

  const toggleItem = (id: string) => {
    setItems(items.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const clear = () => {
    setItems([]);
  };

  const groupByCategory = () => {
    const grouped: Record<string, ShoppingItem[]> = {};
    items.forEach((item) => {
      if (!grouped[item.category]) {
        grouped[item.category] = [];
      }
      grouped[item.category].push(item);
    });
    return grouped;
  };

  return {
    items,
    addItems,
    toggleItem,
    removeItem,
    clear,
    groupByCategory,
  };
};
