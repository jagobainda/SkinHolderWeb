import api from '@data/datasources/ApiClient'

export class LatencyService {
    private static async measureLatency(url: string): Promise<number> {
        const start = performance.now()
        try {
            await fetch(url, { method: 'HEAD', mode: 'no-cors' })
            return Math.round(performance.now() - start)
        } catch {
            return -1
        }
    }

    async measureDatabaseLatency(): Promise<number> {
        const start = performance.now()
        try {
            await api.get('/')
            return Math.round(performance.now() - start)
        } catch {
            return -1
        }
    }

    async measureSteamLatency(): Promise<number> {
        return await LatencyService.measureLatency('https://steamcommunity.com')
    }

    async measureGamepayLatency(): Promise<number> {
        return await LatencyService.measureLatency('https://gamerpay.gg')
    }

    async measureCsfloatLatency(): Promise<number> {
        return await LatencyService.measureLatency('https://csfloat.com')
    }

    async measureAllLatencies() {
        const [steam, gamerpay, csfloat] = await Promise.all([
            this.measureSteamLatency(),
            this.measureGamepayLatency(),
            this.measureCsfloatLatency()
        ])

        return { steam, gamerpay, csfloat }
    }
}