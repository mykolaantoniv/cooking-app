import { useShopping } from "../hooks/ShoppingContext";
import { Link } from "react-router-dom";
import { Trash2, CheckCircle2, Circle } from "lucide-react";

export const ShoppingList = () => {
  const shopping = useShopping();
  const grouped = shopping.groupByCategory();
  const categories = Object.keys(grouped).sort();

  const categoryEmojis: Record<string, string> = {
    Dairy: "🥛",
    Grains: "🍞",
    Meat: "🍗",
    Vegetables: "🥦",
    Fruits: "🍎",
    Spices: "🧂",
    Other: "🍱",
  };

  if (shopping.items.length === 0) {
    return (
      <div className="glass-card p-12 rounded-2xl text-center">
        <p className="text-5xl mb-4">🛒</p>
        <p className="text-lg font-bold text-foreground mb-2">No items yet</p>
        <p className="text-sm text-muted-foreground mb-6">
          Go back and add some recipes!
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-lg transition-all active:scale-95"
        >
          Find Recipes
        </Link>
      </div>
    );
  }

  const checkedCount = shopping.items.filter((item) => item.checked).length;
  const progress = (checkedCount / shopping.items.length) * 100;

  return (
    <div className="space-y-6 pb-24">
      {/* Progress */}
      <div className="glass-card p-4 rounded-xl">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-muted-foreground">
            PROGRESS
          </span>
          <span className="text-sm font-bold text-primary">
            {checkedCount}/{shopping.items.length}
          </span>
        </div>
        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Items by Category */}
      {categories.map((category) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">
              {categoryEmojis[category] || "🍱"}
            </span>
            <h3 className="text-sm font-bold text-foreground">{category}</h3>
            <span className="text-xs text-muted-foreground">
              {grouped[category].length}
            </span>
          </div>
          <div className="space-y-2">
            {grouped[category].map((item) => (
              <div
                key={item.id}
                className="glass-card p-3 rounded-xl flex items-center gap-3 hover:bg-card/90 transition-colors group"
              >
                <button
                  onClick={() => shopping.toggleItem(item.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.checked ? (
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium transition-all ${
                      item.checked
                        ? "text-muted-foreground line-through"
                        : "text-foreground"
                    }`}
                  >
                    {item.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{item.amount}</p>
                </div>
                <button
                  onClick={() => shopping.removeItem(item.id)}
                  className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Clear All Button */}
      {shopping.items.length > 0 && (
        <button
          onClick={() => shopping.clear()}
          className="w-full py-3 text-sm font-semibold text-destructive glass-card hover:bg-destructive/10 transition-colors rounded-xl"
        >
          Clear All Items
        </button>
      )}
    </div>
  );
};
