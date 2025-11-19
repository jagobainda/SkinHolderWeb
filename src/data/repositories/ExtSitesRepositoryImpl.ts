import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'
import { ExtSitesApi } from '@data/datasources/ExtSitesApi'

export interface IExtSitesRepository {
    makeGamerPayRequest(): Promise<GamerPayItemInfo[]>
}

export class ExtSitesRepositoryImpl implements IExtSitesRepository {
    async makeGamerPayRequest(): Promise<GamerPayItemInfo[]> {
        return await ExtSitesApi.makeGamerPayRequest()
    }

    async makeGamerPayRequestFromProxy(): Promise<GamerPayItemInfo[]> {
        return await ExtSitesApi.makeGamerPayRequestFromProxy()
    }
}