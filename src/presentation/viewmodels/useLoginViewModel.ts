import { useState } from 'react'
import { loginUser } from '@domain/usecases/LoginUser'
import { AuthRepositoryImpl } from '@data/repositories/AuthRepositoryImpl'
import type { LoginRequest } from '@domain/models/LoginRequest'

const repo = new AuthRepositoryImpl()

export const useLoginViewModel = () => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const login = async (dto: LoginRequest) => {
        setLoading(true)
        setError(null)
        try {
            const result = await loginUser(repo, dto)
            if (!result) {
                setError('Credenciales incorrectas')
                return null
            }
            return result
        } catch (e: unknown) {
            console.error('Error en login:', e)
            setError('Error al iniciar sesión')
            return null
        } finally {
            setLoading(false)
        }
    }

    return {
        login,
        isLoading,
        error
    }
}
