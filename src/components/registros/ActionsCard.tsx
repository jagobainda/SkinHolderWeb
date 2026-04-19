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
            <div className="absolute -inset-0.5 bg-primary rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

            <div className="relative bg-surface-card rounded-xl py-6 px-8 shadow-lg border border-white/8 h-full flex flex-col justify-center gap-3">
                <button onClick={onConsultar} disabled={!isEnabled} className={`py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 border ${isEnabled ? "bg-surface text-primary border-transparent hover:bg-surface-elevated cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)]" : "bg-surface-card text-[#666666] border-[#444444] cursor-not-allowed"}`}>
                    {t.registros.consult}
                </button>
                <button onClick={onHistorial} disabled={!isEnabled} className={`py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 border ${isEnabled ? "bg-surface text-primary border-transparent hover:bg-surface-elevated cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)]" : "bg-surface-card text-[#666666] border-[#444444] cursor-not-allowed"}`}>
                    {t.registros.history}
                </button>
            </div>
        </div>
    );
};
