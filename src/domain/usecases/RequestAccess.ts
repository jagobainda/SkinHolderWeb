import type { IAuthRepository } from './LoginUser'

export const requestAccessUseCase = async (repo: IAuthRepository, email: string): Promise<number> => {
    return repo.requestAccess(email)
}