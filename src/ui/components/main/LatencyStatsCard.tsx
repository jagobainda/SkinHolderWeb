import React from 'react'
import { FiZap } from 'react-icons/fi'
import { StatsCard } from './StatsCard'
import type { LatencyStats } from '@domain/models/DashboardStats'
import { useTranslation } from "@ui/hooks/useTranslation.ts";

interface Props {
    stats: LatencyStats | null
}

export const LatencyStatsCard: React.FC<Props> = ({ stats }) => {
    const { t } = useTranslation()
    if (!stats) return null

    const getLatencyColor = (latency: number) => {
        if (latency < 100) return 'text-green-400'
        if (latency < 300) return 'text-yellow-400'
        return 'text-red-400'
    }

    return (
        <StatsCard title={t.main.dashboard.latency.title} icon={FiZap} iconColor="text-yellow-400">
            <div className="flex items-center justify-between">
                <span className="text-gray-400">Steam</span>
                <span className={`font-semibold ${getLatencyColor(stats.steam)}`}>
                    {stats.steam}ms
                </span>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">Gamerpay</span>
                <span className={`font-semibold ${getLatencyColor(stats.gamerpay)}`}>
                    {stats.gamerpay}ms
                </span>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">CSFloat</span>
                <span className={`font-semibold ${getLatencyColor(stats.csfloat)}`}>
                    {stats.csfloat}ms
                </span>
            </div>
        </StatsCard>
    )
}