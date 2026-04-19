import { useLanguage } from "../hooks/LanguageContext";
import { Languages } from "lucide-react";

export const LanguageToggle = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-muted-foreground" />
      <div className="flex gap-2">
        <button
          onClick={() => setLanguage("en")}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            language === "en"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("uk")}
          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
            language === "uk"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
          }`}
        >
          УК
        </button>
      </div>
    </div>
  );
};
