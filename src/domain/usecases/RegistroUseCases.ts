import type { Registro } from '@domain/models/Registro'
import type { VarianceStats } from '@domain/models/DashboardStats'

export interface IRegistroRepository {
    getLastRegistro(): Promise<Registro | null>
    getRegistros(): Promise<Registro[]>
    createRegistro(registro: Registro): Promise<number>
    deleteRegistro(registroId: number): Promise<boolean>
    getVarianceStats(): Promise<VarianceStats>
}

export const createRegistroUseCase = async (
    repo: IRegistroRepository,
    registro: Registro
): Promise<number> => {
    return repo.createRegistro(registro)
}

export const getLastRegistroUseCase = async (
    repo: IRegistroRepository
): Promise<Registro | null> => {
    return repo.getLastRegistro()
}

export const getRegistrosUseCase = async (
    repo: IRegistroRepository
): Promise<Registro[]> => {
    return repo.getRegistros()
}

export const getVarianceStatsUseCase = async (
    repo: IRegistroRepository
): Promise<VarianceStats> => {
    return repo.getVarianceStats()
}

export const deleteRegistroUseCase = async (
    repo: IRegistroRepository,
    registroId: number
): Promise<boolean> => {
    return repo.deleteRegistro(registroId)
}
