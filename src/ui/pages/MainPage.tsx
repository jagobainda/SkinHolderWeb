import React from 'react'
import { TopNavbar } from '@ui/components/shared/TopNavbar'
import { useDocumentTitle } from "@ui/hooks/useDocumentTitle.ts"
import { useDashboardViewModel } from '@presentation/viewmodels/useDashboardViewModel'
import { ConnectionStatsCard } from '@ui/components/main/ConnectionStatsCard'
import { LastRegistryStatsCard } from '@ui/components/main/LastRegistryStatsCard'
import { LatencyStatsCard } from '@ui/components/main/LatencyStatsCard'
import { VarianceStatsCard } from '@ui/components/main/VarianceStatsCard'
import { useTranslation } from "@ui/hooks/useTranslation.ts";

export const MainPage: React.FC = () => {
    const { t } = useTranslation()
    useDocumentTitle(`SkinHolder - ${t.main.navbar.home}`)
    const { stats, isLoading, error } = useDashboardViewModel()

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]">
            <TopNavbar />

            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
                {isLoading ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white text-xl">{t.main.dashboard.loading}</span>
                    </div>
                ) : error ? (
                    <div className="text-red-400 text-xl">{error}</div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl w-full">
                        <ConnectionStatsCard stats={stats?.connection ?? null} />
                        <LastRegistryStatsCard stats={stats?.lastRegistry ?? null} />
                        <LatencyStatsCard stats={stats?.latency ?? null} />
                        <VarianceStatsCard stats={stats?.variance ?? null} />
                    </div>
                )}
            </main>
        </div>
    )
}