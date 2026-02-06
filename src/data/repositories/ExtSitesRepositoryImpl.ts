import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'
import type { IExtSitesRepository } from '@domain/usecases/GetGamerPayItems'
import { ExtSitesApi } from '@data/datasources/ExtSitesApi'


export class ExtSitesRepositoryImpl implements IExtSitesRepository {
    async makeGamerPayRequestFromProxy(): Promise<GamerPayItemInfo[]> {
        return await ExtSitesApi.makeGamerPayRequestFromProxy()
    }
}