import es from "./es.json";
import en from "./en.json";

export type Lang = "es" | "en";
export type Translations = typeof es;

const translations: Record<Lang, Translations> = { es, en };

export function detectLang(): Lang {
    if (typeof document !== "undefined") {
        const htmlLang = document.documentElement.lang?.split("-")[0];
        if (htmlLang === "es") return "es";
    }
    return "en";
}

export function getTranslations(lang?: Lang): Translations {
    return translations[lang ?? detectLang()];
}
