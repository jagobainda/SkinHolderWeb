import React, { useState } from 'react'
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi'
import { SiSteam } from 'react-icons/si'
import { StatsCard } from './StatsCard'
import type { VarianceStats } from '@domain/models/DashboardStats'

type Platform = 'steam' | 'gamerpay' | 'csfloat'

interface Props {
    stats: VarianceStats | null
}

export const VarianceStatsCard: React.FC<Props> = ({ stats }) => {
    const [selectedPlatform, setSelectedPlatform] = useState<Platform>('steam')

    if (!stats) return null

    const formatVariance = (value: number) => {
        if (value === -101) {
            return {
                formatted: 'N/A',
                color: 'text-gray-500',
                icon: FiTrendingUp
            }
        }

        const isPositive = value >= 0
        return {
            formatted: `${isPositive ? '+' : ''}${value.toFixed(2)}%`,
            color: isPositive ? 'text-green-400' : 'text-red-400',
            icon: isPositive ? FiTrendingUp : FiTrendingDown
        }
    }

    const getPlatformData = () => {
        switch (selectedPlatform) {
            case 'steam':
                return {
                    week: formatVariance(stats.weeklyVariancePercentSteam),
                    month: formatVariance(stats.monthlyVariancePercentSteam),
                    year: formatVariance(stats.yearlyVariancePercentSteam)
                }
            case 'gamerpay':
                return {
                    week: formatVariance(stats.weeklyVariancePercentGamerPay),
                    month: formatVariance(stats.monthlyVariancePercentGamerPay),
                    year: formatVariance(stats.yearlyVariancePercentGamerPay)
                }
            case 'csfloat':
                return {
                    week: formatVariance(stats.weeklyVariancePercentCSFloat),
                    month: formatVariance(stats.monthlyVariancePercentCSFloat),
                    year: formatVariance(stats.yearlyVariancePercentCSFloat)
                }
        }
    }

    const { week, month, year } = getPlatformData()

    const titleActions = (
        <div className="flex gap-2">
            <button
                onClick={() => setSelectedPlatform('steam')}
                className={`p-2 rounded-lg transition-colors ${
                    selectedPlatform === 'steam'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
                <SiSteam className="w-4 h-4" />
            </button>

            <button
                onClick={() => setSelectedPlatform('gamerpay')}
                className={`p-2 rounded-lg transition-colors ${
                    selectedPlatform === 'gamerpay'
                        ? 'bg-purple-500/20 text-purple-400'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
                <img src="/images/gamerpay_icon.png" alt="Gamerpay" className="w-4 h-4" />
            </button>

            <button
                onClick={() => setSelectedPlatform('csfloat')}
                className={`p-2 rounded-lg transition-colors ${
                    selectedPlatform === 'csfloat'
                        ? 'bg-orange-500/20 text-orange-400'
                        : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
            >
                <img src="/images/csfloat_icon.svg" alt="CSFloat" className="w-4 h-4" />
            </button>
        </div>
    )

    return (
        <StatsCard title="Varianza" icon={FiTrendingUp} iconColor="text-purple-400" actions={titleActions}>
            <div className="flex items-center justify-between">
                <span className="text-gray-400">Última semana</span>
                <div className="flex items-center gap-2">
                    <week.icon className={week.color} />
                    <span className={`font-semibold ${week.color}`}>{week.formatted}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">Último mes</span>
                <div className="flex items-center gap-2">
                    <month.icon className={month.color} />
                    <span className={`font-semibold ${month.color}`}>{month.formatted}</span>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <span className="text-gray-400">Último año</span>
                <div className="flex items-center gap-2">
                    <year.icon className={year.color} />
                    <span className={`font-semibold ${year.color}`}>{year.formatted}</span>
                </div>
            </div>
        </StatsCard>
    )
}