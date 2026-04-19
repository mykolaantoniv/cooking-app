import { LanguageToggle } from "./LanguageToggle";

export const Navigation = () => {
  return (
    <nav className="sticky top-0 z-40 bg-card/95 backdrop-blur-xl border-b border-border/50">
      <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-extrabold text-gradient">🍽 FoodMatch</h1>
        <LanguageToggle />
      </div>
    </nav>
  );
};
