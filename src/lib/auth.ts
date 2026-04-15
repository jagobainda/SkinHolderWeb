import { api, ApiError } from "./api";
import type { LoginRequest, AuthResult } from "@app-types/index";

function setCookie(name: string, value: string, days = 7) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

export function getCookie(name: string): string | null {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

export async function login(dto: LoginRequest): Promise<AuthResult | null> {
    try {
        const { data } = await api.post<AuthResult>("/Auth/login", dto);
        if (data) {
            setCookie("sh_token", data.token);
            setCookie("sh_username", data.username);
            setCookie("sh_userId", data.userId);
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
    deleteCookie("sh_token");
    deleteCookie("sh_username");
    deleteCookie("sh_userId");
    deleteCookie("app_start_time");
}
