import type { SteamItemInfo } from '@domain/models/SteamItemInfo'

export interface ISteamRepository {
    getPriceOverview(marketHashName: string): Promise<SteamItemInfo>
}

export const getSteamPriceUseCase = async (
    repo: ISteamRepository,
    marketHashName: string
): Promise<SteamItemInfo> => {
    return repo.getPriceOverview(marketHashName)
}
