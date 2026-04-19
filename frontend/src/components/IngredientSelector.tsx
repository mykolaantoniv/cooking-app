import { useState, useMemo } from "react";
import { Ingredient } from "../types";
import { Search, X } from "lucide-react";

interface IngredientSelectorProps {
  availableIngredients: Ingredient[];
  selected: string[];
  onToggle: (name: string) => void;
}

const categoryEmojis: Record<string, string> = {
  Dairy: "🥛",
  Grains: "🍞",
  Meat: "🍗",
  Vegetables: "🥦",
  Fruits: "🍎",
  Spices: "🧂",
  Other: "🍱",
};

const groupIngredients = (ingredients: Ingredient[]) => {
  const grouped: Record<string, string[]> = {};
  ingredients.forEach((ing) => {
    if (!grouped[ing.category]) {
      grouped[ing.category] = [];
    }
    if (!grouped[ing.category].includes(ing.name)) {
      grouped[ing.category].push(ing.name);
    }
  });
  return grouped;
};

export const IngredientSelector = ({
  availableIngredients,
  selected,
  onToggle,
}: IngredientSelectorProps) => {
  const [search, setSearch] = useState("");
  const grouped = useMemo(
    () => groupIngredients(availableIngredients),
    [availableIngredients]
  );

  const filteredGrouped = useMemo(() => {
    const result: Record<string, string[]> = {};
    Object.entries(grouped).forEach(([category, ingredients]) => {
      const filtered = ingredients.filter((ing) =>
        ing.toLowerCase().includes(search.toLowerCase())
      );
      if (filtered.length > 0) {
        result[category] = filtered;
      }
    });
    return result;
  }, [grouped, search]);

  const getCategoryEmoji = (category: string) => {
    return categoryEmojis[category] || "🍱";
  };

  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search ingredients..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-3 py-3 glass-card text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </div>

      {/* Categories */}
      {Object.entries(filteredGrouped).map(([category, ingredients]) => (
        <div key={category}>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{getCategoryEmoji(category)}</span>
            <h3 className="text-sm font-bold text-foreground">
              {category}
            </h3>
            <span className="text-xs text-muted-foreground">
              {ingredients.length}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <button
                key={ing}
                onClick={() => onToggle(ing)}
                className={`px-3 py-2 rounded-full text-xs font-semibold transition-all active:scale-95 ${
                  selected.includes(ing)
                    ? "bg-primary text-primary-foreground"
                    : "glass-card text-foreground hover:bg-card/90"
                }`}
              >
                {ing}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* Selected Summary */}
      {selected.length > 0 && (
        <div className="glass-card p-4 rounded-xl border border-primary/50">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">
                Selected
              </p>
              <div className="flex flex-wrap gap-2">
                {selected.map((ing) => (
                  <span
                    key={ing}
                    className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/20 text-primary text-xs font-semibold"
                  >
                    {ing}
                    <button
                      onClick={() => onToggle(ing)}
                      className="hover:opacity-70 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <span className="text-2xl font-bold text-primary">{selected.length}</span>
          </div>
        </div>
      )}
    </div>
  );
};
