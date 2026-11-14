import React from "react";
import { useDashboard } from "@hooks/useDashboard";
import { ConnectionStatsCard } from "./ConnectionStatsCard";
import { LastRegistryStatsCard } from "./LastRegistryStatsCard";
import { LatencyStatsCard } from "./LatencyStatsCard";
import { VarianceStatsCard } from "./VarianceStatsCard";

export const DashboardContent: React.FC = () => {
    const { data: stats, isLoading, error } = useDashboard();

    return (
        <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
            {isLoading ? (
                <div className="grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-full rounded-xl border border-white/8 bg-surface-card p-6">
                            <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/8 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className="skeleton h-7 w-7 rounded" />
                                    <div className="skeleton h-7 w-32 rounded" />
                                </div>
                                {i === 3 && (
                                    <div className="flex gap-2">
                                        <div className="skeleton h-8 w-8 rounded-lg" />
                                        <div className="skeleton h-8 w-8 rounded-lg" />
                                        <div className="skeleton h-8 w-8 rounded-lg" />
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
                <div className="text-xl text-red-400">Error al cargar las estadísticas</div>
            ) : (
                <div className="grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-2">
                    <ConnectionStatsCard stats={stats?.connection ?? null} />
                    <LastRegistryStatsCard stats={stats?.lastRegistry ?? null} />
                    <LatencyStatsCard stats={stats?.latency ?? null} />
                    <VarianceStatsCard stats={stats?.variance ?? null} />
                </div>
            )}
        </main>
    );
};
