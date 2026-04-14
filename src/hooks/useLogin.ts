import { useState } from "react";
import { login as authLogin, requestAccess as authRequestAccess } from "@lib/auth";
import { ApiError } from "@lib/api";
import type { LoginRequest } from "@types/index";

const getErrorMessageLogin = (error: unknown): string => {
    if (error instanceof ApiError) {
        switch (error.status) {
            case 401:
                return "Credenciales incorrectas";
            case 429:
                return "Demasiados intentos. Pruebe más tarde";
            default:
                return "Error al iniciar sesión";
        }
    }
    return "Error al iniciar sesión";
};

const getErrorMessageRequestAccess = (status: number): string => {
    switch (status) {
        case 400:
            return "Email inválido o ya registrado";
        case 409:
            return "Ya existe una solicitud pendiente para este email";
        case 429:
            return "Demasiadas solicitudes. Pruebe más tarde";
        default:
            return "Error al solicitar acceso";
    }
};

export const useLogin = () => {
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requestAccessLoading, setRequestAccessLoading] = useState(false);

    const login = async (dto: LoginRequest, showToast: (type: "success" | "danger", title: string, message: string) => void) => {
        if (!dto.username?.trim() || !dto.password?.trim()) {
            showToast("danger", "Campos requeridos", "El email y la contraseña son obligatorios");
            return null;
        }

        setLoading(true);
        setError(null);
        try {
            const result = await authLogin(dto);
            if (!result) {
                showToast("danger", "Error de autenticación", "Credenciales incorrectas");
                return null;
            }
            return result;
        } catch (e: unknown) {
            console.error("Error en login:", e);
            const errorMessage = getErrorMessageLogin(e);
            showToast("danger", "Error de inicio de sesión", errorMessage);
            return null;
        } finally {
            setLoading(false);
        }
    };

    const requestAccess = async (email: string, showToast: (type: "success" | "danger", title: string, message: string) => void): Promise<boolean> => {
        setRequestAccessLoading(true);
        try {
            const status = await authRequestAccess(email);
            if (status === 200 || status === 201) {
                showToast("success", "¡Solicitud enviada!", "Recibirás un email cuando tu acceso sea aprobado.");
                return true;
            } else {
                showToast("danger", "Error", getErrorMessageRequestAccess(status));
                return false;
            }
        } catch (e) {
            console.error("Error requesting access:", e);
            showToast("danger", "Error", "Error al solicitar acceso");
            return false;
        } finally {
            setRequestAccessLoading(false);
        }
    };

    return { login, requestAccess, isLoading, error, requestAccessLoading };
};
