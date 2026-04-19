import { RecipeMatch } from "../types";
import { Link } from "react-router-dom";
import { Clock, Flame } from "lucide-react";
import { useLanguage } from "../hooks/LanguageContext";

interface RecipeCardProps {
  recipe: RecipeMatch;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const { t } = useLanguage();
  const matchPercentage = Math.round(
    (recipe.matchCount /
      (recipe.matchCount + recipe.missingCount)) *
      100
  );

  const getMatchQuality = (percentage: number) => {
    if (percentage >= 80) return t.perfect;
    if (percentage >= 60) return t.good;
    if (percentage >= 40) return t.fair;
    return t.low;
  };

  return (
    <Link to={`/recipe/${recipe.id}`}>
      <button className="glass-card overflow-hidden text-left w-full animate-fade-in transition-transform active:scale-[0.98] hover:shadow-lg">
        {/* Image Section */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src = `https://via.placeholder.com/400x250/1a1f2e/58c57c?text=${encodeURIComponent(recipe.title.slice(0, 20))}`;
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-transparent to-transparent" />

          {/* Tags Overlay */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold bg-secondary/80 text-secondary-foreground px-2 py-0.5 rounded-lg backdrop-blur-sm">
              {recipe.mealType}
            </span>
            {matchPercentage >= 60 && (
              <span className="text-[10px] font-bold bg-primary/80 text-primary-foreground px-2 py-0.5 rounded-lg backdrop-blur-sm">
                {getMatchQuality(matchPercentage)}
              </span>
            )}
          </div>

          {/* Match Percentage Badge */}
          <div className="absolute top-2.5 right-2.5 bg-primary/90 backdrop-blur-sm text-primary-foreground px-3 py-1 rounded-full text-xs font-bold">
            {matchPercentage}%
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-foreground font-bold text-base leading-tight line-clamp-2">
              {recipe.title}
            </h3>
          </div>
        </div>

        {/* Info Section */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3 text-xs font-semibold">
              <span className="text-primary">{recipe.calories} {t.kcal}</span>
              <span className="text-muted-foreground">
                {t.protein_short} {recipe.protein} · {t.fat_short} {recipe.fat} · {t.carbs_short} {recipe.carbs}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{recipe.cookTime} {t.minutes}</span>
            </div>
            <div className="flex items-center gap-1">
              <Flame className="w-3 h-3" />
              <span>{recipe.matchCount}/{recipe.matchCount + recipe.missingCount}</span>
            </div>
          </div>

          {recipe.missingCount > 0 && (
            <div className="pt-2 border-t border-border/30">
              <p className="text-[10px] font-semibold text-muted-foreground mb-1">
                Missing {recipe.missingCount}:
              </p>
              <p className="text-[10px] text-muted-foreground line-clamp-1">
                {recipe.missingIngredients
                  .slice(0, 2)
                  .map((ing) => ing.name)
                  .join(", ")}
                {recipe.missingIngredients.length > 2 ? "..." : ""}
              </p>
            </div>
          )}
        </div>
      </button>
    </Link>
  );
};
