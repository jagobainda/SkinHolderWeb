import React from "react";
import { IconZap } from "@components/shared/Icons";
import { StatsCard } from "./StatsCard";
import { getTranslations } from "@i18n/index";
import type { LatencyStats } from "@app-types/index";

interface Props {
    stats: LatencyStats | null;
}

export const LatencyStatsCard: React.FC<Props> = ({ stats }) => {
    const t = getTranslations();
    if (!stats) return null;

    const getLatencyColor = (latency: number) => {
        if (latency < 100) return "text-green-400";
        if (latency < 300) return "text-yellow-400";
        return "text-red-400";
    };

    return (
        <StatsCard title={t.main.dashboard.latency.title} icon={IconZap} iconColor="text-yellow-400">
            <div className="flex items-center justify-between">
                <span className="text-gray-400">Steam</span>
                <span className={`font-semibold ${getLatencyColor(stats.steam)}`}>{stats.steam}ms</span>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">Gamerpay</span>
                <span className={`font-semibold ${getLatencyColor(stats.gamerpay)}`}>{stats.gamerpay}ms</span>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">CSFloat</span>
                <span className={`font-semibold ${getLatencyColor(stats.csfloat)}`}>{stats.csfloat}ms</span>
            </div>
        </StatsCard>
    );
};
