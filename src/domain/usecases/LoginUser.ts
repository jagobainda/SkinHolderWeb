import type { LoginRequest } from '@domain/models/LoginRequest'
import type { AuthResult } from '@domain/models/AuthResult'

export interface IAuthRepository {
    login(dto: LoginRequest): Promise<AuthResult | null>
}

export const loginUser = async (repo: IAuthRepository, dto: LoginRequest): Promise<AuthResult | null> => {
    return repo.login(dto)
}
