import { useEffect, useState } from "react";
import { recipeApi } from "../services/api";
import { Recipe, Ingredient, RecipeMatch, MealType } from "../types";
import { IngredientSelector } from "../components/IngredientSelector";
import { RecipeCard } from "../components/RecipeCard";
import { AlertCircle } from "lucide-react";
import { useLanguage } from "../hooks/LanguageContext";

export const HomePage = () => {
  const { t } = useLanguage();
  const [mealType, setMealType] = useState<MealType>("breakfast");
  const [availableIngredients, setAvailableIngredients] = useState<Ingredient[]>(
    []
  );
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [matches, setMatches] = useState<RecipeMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load available ingredients on mount and when meal type changes
  useEffect(() => {
    const loadIngredients = async () => {
      try {
        const recipes = await recipeApi.getAll(mealType);
        const ings = new Map<string, Ingredient>();
        recipes.forEach((recipe: Recipe) => {
          recipe.ingredients.forEach((ing) => {
            ings.set(ing.name, ing);
          });
        });
        setAvailableIngredients(Array.from(ings.values()));
      } catch (err) {
        setError(t.failed_to_load_ingredients);
      }
    };
    loadIngredients();
  }, [mealType, t]);

  const toggleIngredient = (name: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(name) ? prev.filter((i) => i !== name) : [...prev, name]
    );
  };

  const handleFindRecipes = async () => {
    if (selectedIngredients.length === 0) {
      setError(t.select_at_least_one);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await recipeApi.match({
        selectedIngredients,
        mealType,
      });
      setMatches(results);
    } catch (err) {
      setError(t.failed_to_find_recipes);
    } finally {
      setLoading(false);
    }
  };

  const getMealTypeEmoji = (type: MealType) => {
    switch (type) {
      case "breakfast":
        return "🌅";
      case "lunch":
        return "☀️";
      case "dinner":
        return "🌙";
    }
  };

  const getMealTypeLabel = (type: MealType) => {
    switch (type) {
      case "breakfast":
        return t.breakfast;
      case "lunch":
        return t.lunch;
      case "dinner":
        return t.dinner;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-foreground mb-1">
          {t.whats_cooking}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t.select_meal_and_ingredients}
        </p>
      </div>

      {/* Meal Type Selector */}
      <div>
        <label className="block text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wide">
          {t.select_meal}
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(["breakfast", "lunch", "dinner"] as MealType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setMealType(type);
                setSelectedIngredients([]);
                setMatches([]);
              }}
              className={`py-3 px-2 rounded-xl font-semibold transition-all active:scale-95 ${
                mealType === type
                  ? "glass-card bg-primary/20 text-primary border border-primary/50"
                  : "glass-card text-muted-foreground hover:text-foreground"
              }`}
            >
              {getMealTypeEmoji(type)}
              <div className="text-xs mt-1">{getMealTypeLabel(type)}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="glass-card border border-destructive/50 p-3 rounded-xl text-sm text-destructive flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      {/* Ingredient Selector */}
      <IngredientSelector
        availableIngredients={availableIngredients}
        selected={selectedIngredients}
        onToggle={toggleIngredient}
      />

      {/* Find Recipes Button */}
      <button
        onClick={handleFindRecipes}
        disabled={loading || selectedIngredients.length === 0}
        className={`w-full py-3 px-4 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 ${
          loading || selectedIngredients.length === 0
            ? "glass-card text-muted-foreground cursor-not-allowed opacity-50"
            : "bg-primary text-primary-foreground hover:shadow-lg"
        }`}
      >
        {loading ? (
          <>
            <span className="animate-spin">⏳</span>
            {t.loading}
          </>
        ) : (
          <>
            <span>🍽️</span>
            {t.find_recipes}
          </>
        )}
      </button>

      {/* Results */}
      {matches.length > 0 && (
        <div className="animate-fade-in">
          <h2 className="text-lg font-bold text-foreground mb-3">
            Found {matches.length} recipes
          </h2>
          <div className="space-y-3">
            {matches.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      )}

      {matches.length === 0 && selectedIngredients.length > 0 && !loading && (
        <div className="glass-card p-8 rounded-2xl text-center">
          <p className="text-sm text-muted-foreground">
            No recipes found. Try selecting different ingredients.
          </p>
        </div>
      )}
    </div>
  );
};
