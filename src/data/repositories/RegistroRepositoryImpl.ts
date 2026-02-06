import type { Registro } from '@domain/models/Registro'
import type { VarianceStats } from '@domain/models/DashboardStats'
import type { IRegistroRepository } from '@domain/usecases/RegistroUseCases'
import { RegistroApi } from '@data/datasources/RegistroApi'

export class RegistroRepositoryImpl implements IRegistroRepository {
    async getLastRegistro(): Promise<Registro | null> {
        return await RegistroApi.getLastRegistro()
    }

    async getRegistros(): Promise<Registro[]> {
        return await RegistroApi.getRegistros()
    }

    async createRegistro(registro: Registro): Promise<number> {
        return await RegistroApi.createRegistro(registro)
    }

    async deleteRegistro(registroId: number): Promise<boolean> {
        return await RegistroApi.deleteRegistro(registroId)
    }

    async getVarianceStats(): Promise<VarianceStats> {
        return await RegistroApi.getVarianceStats()
    }
}