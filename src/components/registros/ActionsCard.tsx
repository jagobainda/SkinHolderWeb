import React from "react";
import { getTranslations } from "@i18n/index";
import type { Lang } from "@i18n/index";

interface ActionsCardProps {
    onConsultar: () => void;
    onHistorial: () => void;
    isEnabled: boolean;
    lang: Lang;
}

export const ActionsCard: React.FC<ActionsCardProps> = ({ onConsultar, onHistorial, isEnabled, lang }) => {
    const t = getTranslations(lang);

    return (
        <div className="group relative h-full">
            <div className="absolute -inset-0.5 rounded-xl bg-primary opacity-0 blur transition duration-300 group-hover:opacity-75"></div>

            <div className="relative flex h-full flex-col justify-center gap-3 rounded-xl border border-white/8 bg-surface-card px-8 py-6 shadow-lg">
                <button
                    onClick={onConsultar}
                    disabled={!isEnabled}
                    className={`rounded-lg border px-4 py-2.5 font-semibold transition-all duration-200 ${isEnabled ? "cursor-pointer border-transparent bg-surface text-primary shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-surface-elevated" : "cursor-not-allowed border-[#444444] bg-surface-card text-[#666666]"}`}
                >
                    {t.registros.consult}
                </button>
                <button
                    onClick={onHistorial}
                    disabled={!isEnabled}
                    className={`rounded-lg border px-4 py-2.5 font-semibold transition-all duration-200 ${isEnabled ? "cursor-pointer border-transparent bg-surface text-primary shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-surface-elevated" : "cursor-not-allowed border-[#444444] bg-surface-card text-[#666666]"}`}
                >
                    {t.registros.history}
                </button>
            </div>
        </div>
    );
};
