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
                    {isActive ? <IconCheckCircle className="text-green-400 w-4 h-4" /> : <IconXCircle className="text-red-400 w-4 h-4" />}
                    <span className={isActive ? "text-green-400 font-semibold" : "text-red-400 font-semibold"}>{isActive ? t.main.dashboard.connection.active : t.main.dashboard.connection.inactive}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.main.dashboard.connection.ping}</span>
                <div className="flex items-center gap-2">
                    <IconActivity className="text-primary w-4 h-4" />
                    <span className="text-white font-semibold">{stats.ping}ms</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">{t.main.dashboard.connection.uptime}</span>
                <div className="flex items-center gap-2">
                    <IconClock className="text-purple-400 w-4 h-4" />
                    <span className="text-white font-semibold">{stats.uptime}h</span>
                </div>
            </div>
        </StatsCard>
    );
};
