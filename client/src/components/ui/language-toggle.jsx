import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Languages } from "lucide-react";

export function LanguageToggle() {
  const [language, setLanguage] = useState("en");

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ml" : "en");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="focus-ring flex items-center gap-2"
      aria-pressed={language === "ml"}
      aria-label={`Switch language to ${language === "en" ? "Malayalam" : "English"}`}
      title={`Switch language to ${language === "en" ? "Malayalam" : "English"}`}
    >
      <Languages className="h-4 w-4" />
      <span className="text-sm font-medium">
        {language === "en" ? "മലയാളം" : "English"}
      </span>
    </Button>
  );
}
