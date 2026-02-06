import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'

export interface IExtSitesRepository {
    makeGamerPayRequestFromProxy(): Promise<GamerPayItemInfo[]>
}

export const getGamerPayItemsUseCase = async (repo: IExtSitesRepository): Promise<GamerPayItemInfo[]> => {
    return repo.makeGamerPayRequestFromProxy()
}
