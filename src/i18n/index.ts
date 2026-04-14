import { useMemo } from "react";
import es from "./es.json";
import en from "./en.json";

type Lang = "es" | "en";
export type Translations = typeof es;

const translations: Record<Lang, Translations> = { es, en };

export function getTranslations(lang?: Lang): Translations {
    return translations[lang ?? "en"];
}

export function useTranslation() {
    const language = useMemo<Lang>(() => {
        const browserLang = navigator.language.split("-")[0];
        return browserLang === "es" ? "es" : "en";
    }, []);

    return { t: translations[language], language };
}
