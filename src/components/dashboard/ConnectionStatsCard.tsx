import React from "react";
import { IconDatabase, IconActivity, IconClock, IconCheckCircle, IconXCircle } from "@components/shared/Icons";
import { StatsCard } from "./StatsCard";
import { getTranslations } from "@i18n/index";
import type { ConnectionStats } from "@app-types/index";

interface Props {
    stats: ConnectionStats | null;
}

export const ConnectionStatsCard: React.FC<Props> = ({ stats }) => {
    const t = getTranslations();
    if (!stats) return null;

    const isActive = stats.status === "active";

    return (
        <StatsCard title={t.main.dashboard.connection.title} icon={IconDatabase} iconColor="text-blue-400">
            <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.main.dashboard.connection.status}</span>
                <div className="flex items-center gap-2">
                    {isActive ? (
                        <IconCheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                        <IconXCircle className="h-4 w-4 text-red-400" />
                    )}
                    <span className={isActive ? "font-semibold text-green-400" : "font-semibold text-red-400"}>
                        {isActive ? t.main.dashboard.connection.active : t.main.dashboard.connection.inactive}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.main.dashboard.connection.ping}</span>
                <div className="flex items-center gap-2">
                    <IconActivity className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-white">{stats.ping}ms</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.main.dashboard.connection.uptime}</span>
                <div className="flex items-center gap-2">
                    <IconClock className="h-4 w-4 text-purple-400" />
                    <span className="font-semibold text-white">{stats.uptime}h</span>
                </div>
            </div>
        </StatsCard>
    );
};
