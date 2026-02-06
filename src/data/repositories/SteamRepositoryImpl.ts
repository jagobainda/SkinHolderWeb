import type { SteamItemInfo } from '@domain/models/SteamItemInfo'
import type { ISteamRepository } from '@domain/usecases/GetSteamPrice'
import { SteamApi } from '@data/datasources/SteamApi'


export class SteamRepositoryImpl implements ISteamRepository {
    async getPriceOverview(marketHashName: string): Promise<SteamItemInfo> {
        return await SteamApi.getPriceOverview(marketHashName)
    }
}