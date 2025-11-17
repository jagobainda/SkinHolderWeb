import React from 'react'
import { FiDatabase, FiActivity, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi'
import { StatsCard } from './StatsCard'
import type { ConnectionStats } from '@domain/models/DashboardStats'

interface Props {
    stats: ConnectionStats | null
}

export const ConnectionStatsCard: React.FC<Props> = ({ stats }) => {
    if (!stats) return null

    const isActive = stats.status === 'active'

    return (
        <StatsCard title="SkinHolderDB" icon={FiDatabase} iconColor="text-blue-400">
            <div className="flex items-center justify-between">
                <span className="text-gray-400">Estado</span>
                <div className="flex items-center gap-2">
                    {isActive ? (
                        <FiCheckCircle className="text-green-400" />
                    ) : (
                        <FiXCircle className="text-red-400" />
                    )}
                    <span className={isActive ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                        {isActive ? 'Activo' : 'Inactivo'}
                    </span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">Ping</span>
                <div className="flex items-center gap-2">
                    <FiActivity className="text-primary" />
                    <span className="text-white font-semibold">{stats.ping}ms</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">Uptime</span>
                <div className="flex items-center gap-2">
                    <FiClock className="text-purple-400" />
                    <span className="text-white font-semibold">{stats.uptime}h</span>
                </div>
            </div>
        </StatsCard>
    )
}