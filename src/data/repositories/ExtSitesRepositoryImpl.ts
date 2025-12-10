import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'
import { ExtSitesApi } from '@data/datasources/ExtSitesApi'

export interface IExtSitesRepository {
    makeGamerPayRequestFromProxy(): Promise<GamerPayItemInfo[]>
}

export class ExtSitesRepositoryImpl implements IExtSitesRepository {
    async makeGamerPayRequestFromProxy(): Promise<GamerPayItemInfo[]> {
        return await ExtSitesApi.makeGamerPayRequestFromProxy()
    }
}