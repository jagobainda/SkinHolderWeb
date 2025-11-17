import type { Registro } from '@domain/models/Registro'
import { RegistroApi } from '@data/datasources/RegistroApi'
import type { VarianceStats } from "@domain/models/DashboardStats.ts";

export interface IRegistroRepository {
    getLastRegistro(): Promise<Registro | null>
    getRegistros(): Promise<Registro[]>
    createRegistro(registro: Registro): Promise<number>
    deleteRegistro(registroId: number): Promise<boolean>
    getVarianceStats(): Promise<VarianceStats>
}

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