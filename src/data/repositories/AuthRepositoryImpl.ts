import type { IAuthRepository } from '@domain/usecases/LoginUser'
import type { LoginRequest } from '@domain/models/LoginRequest'
import type { AuthResult } from '@domain/models/AuthResult'
import { AuthApi } from '@data/datasources/AuthApi'

export class AuthRepositoryImpl implements IAuthRepository {
    async login(dto: LoginRequest): Promise<AuthResult | null> {
        const result = await AuthApi.login(dto)

        if (result?.token) {
            localStorage.setItem('token', result.token)
            localStorage.setItem('username', result.username)
            localStorage.setItem('userId', result.userId)
        }

        return result
    }

    async validate(): Promise<boolean> {
        return await AuthApi.validate()
    }

    async requestAccess(email: string): Promise<number> {
        return await AuthApi.requestAccess(email)
    }
}
