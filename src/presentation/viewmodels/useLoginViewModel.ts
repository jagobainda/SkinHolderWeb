import { useState } from 'react'
import { loginUser } from '@domain/usecases/LoginUser'
import { AuthRepositoryImpl } from '@data/repositories/AuthRepositoryImpl'
import type { LoginRequest } from '@domain/models/LoginRequest'

const repo = new AuthRepositoryImpl()

const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error && 'status' in error) {
        const status = (error as { status: number }).status

        switch (status) {
            case 401:
                return 'Credenciales incorrectas'
            case 429:
                return 'Demasiados intentos. Pruebe más tarde'
            default:
                return 'Error al iniciar sesión'
        }
    }

    return 'Error al iniciar sesión'
}

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
            setError(getErrorMessage(e))
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