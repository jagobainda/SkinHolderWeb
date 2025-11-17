import React from 'react'
import { FiFileText } from 'react-icons/fi'
import { SiSteam } from 'react-icons/si'
import { StatsCard } from './StatsCard'
import type { LastRegistryStats } from '@domain/models/DashboardStats'

interface Props {
    stats: LastRegistryStats | null
}

export const LastRegistryStatsCard: React.FC<Props> = ({ stats }) => {
    if (!stats) return null

    return (
        <StatsCard title="Último Registro" icon={FiFileText} iconColor="text-green-400">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SiSteam className="text-blue-400" />
                    <span className="text-gray-400">Steam</span>
                </div>
                <span className="text-white font-semibold">{stats.totalSteam}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src="/images/gamerpay_icon.png"
                        alt="Gamerpay"
                        className="w-4 h-4"
                    />
                    <span className="text-gray-400">Gamerpay</span>
                </div>
                <span className="text-white font-semibold">{stats.totalGamepay}</span>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img
                        src="/images/csfloat_icon.svg"
                        alt="CSFloat"
                        className="w-4 h-4"
                    />
                    <span className="text-gray-400">CSFloat</span>
                </div>
                <span className="text-white font-semibold">{stats.totalCsfloat}</span>
            </div>
        </StatsCard>
    )
}