import { useState } from 'react'
import { loginUser } from '@domain/usecases/LoginUser'
import { AuthRepositoryImpl } from '@data/repositories/AuthRepositoryImpl'
import type { LoginRequest } from '@domain/models/LoginRequest'

const repo = new AuthRepositoryImpl()

const getErrorMessageLogin = (error: unknown): string => {
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

const getErrorMessageRequestAccess = (status: number): string => {
    switch (status) {
        case 400:
            return 'Email inválido o ya registrado'
        case 409:
            return 'Ya existe una solicitud pendiente para este email'
        case 429:
            return 'Demasiadas solicitudes. Pruebe más tarde'
        default:
            return 'Error al solicitar acceso'
    }
}

export const useLoginViewModel = () => {
    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [requestAccessLoading, setRequestAccessLoading] = useState(false)

    const login = async (dto: LoginRequest, showToast: (type: 'success' | 'danger', title: string, message: string) => void) => {
        if (!dto.username?.trim() || !dto.password?.trim()) {
            showToast('danger', 'Campos requeridos', 'El email y la contraseña son obligatorios')
            return null
        }

        setLoading(true)
        setError(null)
        try {
            const result = await loginUser(repo, dto)
            if (!result) {
                showToast('danger', 'Error de autenticación', 'Credenciales incorrectas')
                return null
            }
            return result
        } catch (e: unknown) {
            console.error('Error en login:', e)
            const errorMessage = getErrorMessageLogin(e)
            showToast('danger', 'Error de inicio de sesión', errorMessage)
            return null
        } finally {
            setLoading(false)
        }
    }

    const requestAccess = async (email: string, showToast: (type: 'success' | 'danger', title: string, message: string) => void): Promise<boolean> => {
        setRequestAccessLoading(true)
        try {
            const status = await repo.requestAccess(email)
            if (status === 200 || status === 201) {
                showToast('success', '¡Solicitud enviada!', 'Recibirás un email cuando tu acceso sea aprobado.')
                return true
            } else {
                showToast('danger', 'Error', getErrorMessageRequestAccess(status))
                return false
            }
        } catch (e) {
            console.error('Error requesting access:', e)
            showToast('danger', 'Error', 'Error al solicitar acceso')
            return false
        } finally {
            setRequestAccessLoading(false)
        }
    }

    return {
        login,
        requestAccess,
        isLoading,
        error,
        requestAccessLoading
    }
}