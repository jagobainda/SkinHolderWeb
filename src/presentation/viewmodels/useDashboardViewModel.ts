import { useState, useEffect } from 'react'
import type { DashboardStats } from '@domain/models/DashboardStats'
import { RegistroRepositoryImpl } from '@data/repositories/RegistroRepositoryImpl'
import { LatencyService } from '@data/services/LatencyService'

export const useDashboardViewModel = () => {
    const [stats, setStats] = useState<DashboardStats | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const registroRepository = new RegistroRepositoryImpl()
    const latencyService = new LatencyService()

    const calculateUptime = (): number => {
        const startTime = localStorage.getItem('app_start_time')
        if (!startTime) {
            const now = Date.now()
            localStorage.setItem('app_start_time', now.toString())
            return 0
        }
        const elapsed = Date.now() - parseInt(startTime)
        return Math.round(elapsed / (1000 * 60 * 60))
    }

    const loadConnectionAndLatency = async () => {
        try {
            const [dbPing, externalLatencies] = await Promise.all([
                latencyService.measureDatabaseLatency(),
                latencyService.measureAllLatencies()
            ])

            const isActive = dbPing !== -1 && dbPing < 5000

            setStats(prev => prev ? {
                ...prev,
                connection: {
                    status: isActive ? 'active' : 'inactive',
                    ping: dbPing,
                    uptime: calculateUptime()
                },
                latency: externalLatencies
            } : null)
        } catch (err) {
            console.error('Error al actualizar conexión y latencia:', err)
        }
    }

    const loadStats = async () => {
        setIsLoading(true)
        setError(null)

        try {
            const [lastRegistro, varianceStats, dbPing, externalLatencies] = await Promise.all([
                registroRepository.getLastRegistro(),
                registroRepository.getVarianceStats(),
                latencyService.measureDatabaseLatency(),
                latencyService.measureAllLatencies()
            ])

            const isActive = dbPing !== -1 && dbPing < 5000

            setStats({
                connection: {
                    status: isActive ? 'active' : 'inactive',
                    ping: dbPing,
                    uptime: calculateUptime()
                },
                lastRegistry: lastRegistro ? {
                    totalSteam: lastRegistro.totalsteam ?? 0,
                    totalGamepay: lastRegistro.totalgamerpay ?? 0,
                    totalCsfloat: lastRegistro.totalcsfloat ?? 0
                } : null,
                latency: externalLatencies,
                variance: varianceStats
            })
        } catch (err) {
            setError('Error al cargar las estadísticas')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        void loadStats()
        const interval = setInterval(() => {
            void loadConnectionAndLatency()
        }, 30000)
        return () => clearInterval(interval)
    }, [])

    return { stats, isLoading, error, reload: loadStats }
}