export interface ConnectionStats {
    status: 'active' | 'inactive'
    ping: number
    uptime: number
}

export interface LastRegistryStats {
    totalSteam: number
    totalGamepay: number
    totalCsfloat: number
}

export interface LatencyStats {
    steam: number
    gamerpay: number
    csfloat: number
}

export interface VarianceStats {
    weeklyVariancePercentSteam: number
    monthlyVariancePercentSteam: number
    yearlyVariancePercentSteam: number
    weeklyVariancePercentGamerPay: number
    monthlyVariancePercentGamerPay: number
    yearlyVariancePercentGamerPay: number
    weeklyVariancePercentCSFloat: number
    monthlyVariancePercentCSFloat: number
    yearlyVariancePercentCSFloat: number
}

export interface DashboardStats {
    connection: ConnectionStats
    lastRegistry: LastRegistryStats | null
    latency: LatencyStats
    variance: VarianceStats
}