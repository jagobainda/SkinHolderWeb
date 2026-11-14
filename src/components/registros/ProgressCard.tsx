import React from "react";
import { getTranslations } from "@i18n/index";
import type { Lang } from "@i18n/index";

interface ProgressCardProps {
    platform: "steam" | "gamerpay" | "csfloat";
    progress: number;
    total: number;
    totalPrice: number;
    onShowDetails: () => void;
    isEnabled: boolean;
    lang: Lang;
}

const platformConfig = {
    steam: {
        label: "STEAM",
        color: "#5d79ae",
        bgColor: "bg-steam",
    },
    gamerpay: {
        label: "GAMERPAY",
        color: "#ea8f3e",
        bgColor: "bg-gamerpay",
    },
    csfloat: {
        label: "CSFLOAT",
        color: "#ff6b35",
        bgColor: "bg-csfloat",
    },
};

export const ProgressCard: React.FC<ProgressCardProps> = ({
    platform,
    progress,
    total,
    totalPrice,
    onShowDetails,
    isEnabled,
    lang,
}) => {
    const t = getTranslations(lang);
    const config = platformConfig[platform];
    const percentage = total > 0 ? (progress / total) * 100 : 100;

    return (
        <div className="group relative h-full">
            <div className="absolute -inset-0.5 rounded-xl bg-primary opacity-0 blur transition duration-300 group-hover:opacity-75"></div>

            <div className="relative flex h-full flex-col justify-between rounded-xl border border-white/8 bg-surface-card p-6 shadow-lg">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex-1">
                        <div className="mb-6 text-2xl font-bold text-white">
                            {progress} / {total}
                        </div>
                        <div className="mb-4 text-xl text-white">
                            {t.registros.total} {config.label}:{" "}
                            <span className="text-primary">{totalPrice.toFixed(2)} €</span>
                        </div>
                    </div>
                    <button
                        onClick={onShowDetails}
                        disabled={!isEnabled}
                        className={`rounded-lg border p-2.5 transition-all duration-200 ${isEnabled ? "cursor-pointer border-transparent bg-surface text-primary shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:bg-surface-elevated" : "cursor-not-allowed border-[#444444] bg-surface-card text-[#666666]"}`}
                    >
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-full bg-gray-700">
                    <div
                        className={`${config.bgColor} h-full rounded-full transition-all duration-500 ease-out`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
