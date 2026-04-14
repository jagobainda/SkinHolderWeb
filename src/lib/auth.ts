import { api, ApiError } from "./api";
import type { LoginRequest, AuthResult } from "@types/index";

export async function login(dto: LoginRequest): Promise<AuthResult | null> {
    try {
        const { data } = await api.post<AuthResult>("/Auth/login", dto);
        if (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("userId", data.userId);
        }
        return data;
    } catch (error) {
        if (error instanceof ApiError && error.status === 401) return null;
        throw error;
    }
}

export async function validate(): Promise<boolean> {
    try {
        const { data } = await api.get<{ valid: boolean }>("/Auth/validate");
        return data.valid;
    } catch {
        return false;
    }
}

export async function requestAccess(email: string): Promise<number> {
    try {
        const { status } = await api.post("/Auth/requestAccess", email);
        return status;
    } catch (error) {
        if (error instanceof ApiError) return error.status;
        return 500;
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("app_start_time");
}
