import { useState } from "react";
import { Recipe } from "../types";
import { useShopping } from "../hooks/ShoppingContext";
import { Clock, Flame, ShoppingCart, Check } from "lucide-react";

interface RecipeDetailProps {
  recipe: Recipe;
}

export const RecipeDetail = ({ recipe }: RecipeDetailProps) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const shopping = useShopping();

  const handleAddToShopping = () => {
    const shoppingItems = recipe.ingredients.map((ing, idx) => ({
      id: `${recipe.id}-${idx}-${Date.now()}`,
      name: ing.name,
      amount: ing.amount,
      category: ing.category,
      checked: false,
    }));
    shopping.addItems(shoppingItems);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  const imageUrl = `https://images.unsplash.com/photo-${
    Math.abs(recipe.id.charCodeAt(0)) % 100 + 1600000000000
  }?w=600&h=400&fit=crop`;

  return (
    <div className="space-y-6 pb-24">
      {/* Hero Image */}
      <div className="relative -mx-4 -mt-6">
        <img
          src={imageUrl}
          alt={recipe.title}
          className="w-full aspect-[16/10] object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://via.placeholder.com/600x400/1a1f2e/58c57c?text=${encodeURIComponent(recipe.title.slice(0, 20))}`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="px-0">
        {/* Title & Meta */}
        <h1 className="text-2xl font-extrabold text-foreground mb-3">
          {recipe.title}
        </h1>

        <p className="text-lg font-extrabold text-primary mb-2">
          {recipe.calories} kcal
        </p>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>{recipe.cookTime} min</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Flame className="w-4 h-4" />
            <span>{recipe.mealType}</span>
          </div>
        </div>

        {/* Macros Grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: "Protein", value: `${recipe.protein}g`, color: "text-info" },
            { label: "Fat", value: `${recipe.fat}g`, color: "text-warning" },
            { label: "Carbs", value: `${recipe.carbs}g`, color: "text-primary" },
          ].map((m) => (
            <div key={m.label} className="glass-card p-3 text-center">
              <p className={`text-lg font-extrabold ${m.color}`}>{m.value}</p>
              <p className="text-xs text-muted-foreground font-medium">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Ingredients */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Ingredients
          </h2>
          <div className="glass-card p-4 space-y-3">
            {recipe.ingredients.map((ing, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground font-medium">{ing.name}</p>
                  <p className="text-xs text-muted-foreground">{ing.category}</p>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {ing.amount}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Instructions
          </h2>
          <div className="space-y-3">
            {recipe.steps.map((step, idx) => (
              <div key={idx} className="glass-card p-4 flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                  {idx + 1}
                </span>
                <span className="text-sm text-foreground pt-0.5">{step}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Shopping Button */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-xl border-t border-border/50 p-4">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handleAddToShopping}
              className={`w-full flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all active:scale-95 ${
                showSuccess
                  ? "bg-success/20 text-success"
                  : "bg-primary text-primary-foreground hover:shadow-lg"
              }`}
            >
              {showSuccess ? (
                <>
                  <Check className="w-5 h-5" />
                  Added to Shopping!
                </>
              ) : (
                <>
                  <ShoppingCart className="w-5 h-5" />
                  Add to Shopping List
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
