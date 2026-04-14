import React from "react";
import { useDashboard } from "@hooks/useDashboard";
import { useTranslation } from "@i18n/index";
import { ConnectionStatsCard } from "./ConnectionStatsCard";
import { LastRegistryStatsCard } from "./LastRegistryStatsCard";
import { LatencyStatsCard } from "./LatencyStatsCard";
import { VarianceStatsCard } from "./VarianceStatsCard";

export const DashboardContent: React.FC = () => {
    const { t } = useTranslation();
    const { data: stats, isLoading, error } = useDashboard();

    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
            {isLoading ? (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-white text-xl">{t.main.dashboard.loading}</span>
                </div>
            ) : error ? (
                <div className="text-red-400 text-xl">Error al cargar las estadísticas</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">
                    <ConnectionStatsCard stats={stats?.connection ?? null} />
                    <LastRegistryStatsCard stats={stats?.lastRegistry ?? null} />
                    <LatencyStatsCard stats={stats?.latency ?? null} />
                    <VarianceStatsCard stats={stats?.variance ?? null} />
                </div>
            )}
        </main>
    );
};
