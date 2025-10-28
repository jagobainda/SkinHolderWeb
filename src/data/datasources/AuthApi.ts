import api from './ApiClient'
import type { LoginRequest } from '@domain/models/LoginRequest'
import type { AuthResult } from '@domain/models/AuthResult'
import { AxiosError } from 'axios'

export const AuthApi = {
    async login(dto: LoginRequest): Promise<AuthResult | null> {
        try {
            const response = await api.post('/Auth/login', dto)
            return response.data as AuthResult
        } catch (error: unknown) {
            if (error instanceof AxiosError && error.response?.status === 401) return null

            throw error
        }
    },

    async validate(): Promise<boolean> {
        try {
            const response = await api.get('/Auth/validate')
            return response.data.valid
        } catch {
            return false
        }
    }
}
