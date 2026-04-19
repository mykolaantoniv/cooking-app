import { ReactNode, createContext, useContext } from "react";
import { useShoppingList } from "./useShoppingList";
import { ShoppingItem } from "../types";

interface ShoppingContextType {
  items: ShoppingItem[];
  addItems: (items: ShoppingItem[]) => void;
  toggleItem: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  groupByCategory: () => Record<string, ShoppingItem[]>;
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(
  undefined
);

export const ShoppingProvider = ({ children }: { children: ReactNode }) => {
  const shoppingList = useShoppingList();

  return (
    <ShoppingContext.Provider value={shoppingList}>
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error("useShopping must be used within ShoppingProvider");
  }
  return context;
};
