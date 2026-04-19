import React from "react";
import { useDashboard } from "@hooks/useDashboard";
import { ConnectionStatsCard } from "./ConnectionStatsCard";
import { LastRegistryStatsCard } from "./LastRegistryStatsCard";
import { LatencyStatsCard } from "./LatencyStatsCard";
import { VarianceStatsCard } from "./VarianceStatsCard";

export const DashboardContent: React.FC = () => {
    const { data: stats, isLoading, error } = useDashboard();

    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
            {isLoading ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-surface-card rounded-xl p-6 border border-white/8 h-full">
                            <div className="flex items-center justify-between gap-3 mb-4 border-b border-white/8 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="skeleton w-7 h-7 rounded" />
                                    <div className="skeleton h-7 w-32 rounded" />
                                </div>
                                {i === 3 && (
                                    <div className="flex gap-2">
                                        <div className="skeleton w-8 h-8 rounded-lg" />
                                        <div className="skeleton w-8 h-8 rounded-lg" />
                                        <div className="skeleton w-8 h-8 rounded-lg" />
                                    </div>
                                )}
                            </div>
                            <div className="space-y-3">
                                <div className="skeleton h-6 w-full rounded" />
                                <div className="skeleton h-6 w-3/4 rounded" />
                                <div className="skeleton h-6 w-5/6 rounded" />
                            </div>
                        </div>
                    ))}
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
