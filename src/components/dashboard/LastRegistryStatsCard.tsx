import React from "react";
import { IconFileText, IconSteam } from "@components/shared/Icons";
import { StatsCard } from "./StatsCard";
import { getTranslations } from "@i18n/index";
import type { LastRegistryStats } from "@app-types/index";

interface Props {
    stats: LastRegistryStats | null;
}

export const LastRegistryStatsCard: React.FC<Props> = ({ stats }) => {
    const t = getTranslations();
    if (!stats) return null;

    return (
        <StatsCard title={t.main.dashboard.lastRegistry.title} icon={IconFileText} iconColor="text-green-400">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <IconSteam className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-400">Steam</span>
                </div>
                <span className="font-semibold text-white">{stats.totalSteam}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/images/gamerpay_icon.png" alt="Gamerpay" className="h-4 w-4" />
                    <span className="text-gray-400">Gamerpay</span>
                </div>
                <span className="font-semibold text-white">{stats.totalGamepay}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/images/csfloat_icon.svg" alt="CSFloat" className="h-4 w-4" />
                    <span className="text-gray-400">CSFloat</span>
                </div>
                <span className="font-semibold text-white">{stats.totalCsfloat}</span>
            </div>
        </StatsCard>
    );
};
