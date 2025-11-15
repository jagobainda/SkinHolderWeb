import api from './ApiClient'
import type { Registro } from '@domain/models/Registro'

export const RegistroApi = {
    async getLastRegistro(): Promise<Registro | null> {
        try {
            const response = await api.get('/Registros/GetLastRegistro')
            return response.data as Registro
        } catch {
            return null
        }
    },

    async getRegistros(): Promise<Registro[]> {
        try {
            const response = await api.get('/Registros')
            return response.data as Registro[]
        } catch {
            return []
        }
    },

    async createRegistro(registro: Registro): Promise<number> {
        try {
            const response = await api.post('/Registros', registro)
            const registroId = Number(response.data)
            return isNaN(registroId) ? 0 : registroId
        } catch {
            return 0
        }
    },

    async deleteRegistro(registroId: number): Promise<boolean> {
        try {
            const response = await api.delete(`/Registros?registroId=${registroId}`)
            return response.status >= 200 && response.status < 300
        } catch {
            return false
        }
    }
}