import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { recipeApi } from "../services/api";
import { Recipe } from "../types";
import { RecipeDetail } from "../components/RecipeDetail";
import { ArrowLeft } from "lucide-react";

export const RecipeDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRecipe = async () => {
      if (!id) return;
      try {
        const data = await recipeApi.getById(id);
        setRecipe(data);
      } catch (err) {
        setError("Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };
    loadRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">Loading recipe...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive mb-4">{error || "Recipe not found"}</p>
        <button
          onClick={() => navigate("/")}
          className="text-primary hover:text-primary/80 font-medium"
        >
          ← Back to recipes
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => navigate("/")}
        className="sticky top-0 z-20 flex items-center gap-2 px-4 py-3 bg-background/90 backdrop-blur-xl border-b border-border/30 mb-6 rounded-full w-fit ml-0 -ml-4"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="text-sm font-semibold">Back</span>
      </button>
      <RecipeDetail recipe={recipe} />
    </div>
  );
};
