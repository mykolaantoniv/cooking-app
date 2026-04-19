import { ShoppingList } from "../components/ShoppingList";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

export const ShoppingListPage = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-foreground">
            Shopping List
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Items from your selected recipes
          </p>
        </div>
        <Link
          to="/"
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          Add
        </Link>
      </div>
      <ShoppingList />
    </div>
  );
};
