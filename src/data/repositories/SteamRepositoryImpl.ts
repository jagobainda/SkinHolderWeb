import type { SteamItemInfo } from '@domain/models/SteamItemInfo'
import { SteamApi } from '@data/datasources/SteamApi'

export interface ISteamRepository {
    getPriceOverview(
        marketHashName: string,
        country?: string,
        currency?: number,
        appId?: number
    ): Promise<SteamItemInfo>
}

export class SteamRepositoryImpl implements ISteamRepository {
    async getPriceOverview(
        marketHashName: string,
        country: string = 'ES',
        currency: number = 3,
        appId: number = 730
    ): Promise<SteamItemInfo> {
        return await SteamApi.getPriceOverview(marketHashName, country, currency, appId)
    }
}