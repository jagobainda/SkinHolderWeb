import { api, ApiError } from "./api";
import type { UserInfo } from "@app-types/index";

export async function getUserInfo(): Promise<UserInfo | null> {
    try {
        const { data } = await api.get<UserInfo>("/UserSettings");
        return data;
    } catch (error) {
        console.error("Error al obtener info de usuario:", error);
        return null;
    }
}

export async function changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
        await api.put("/UserSettings/password", { currentPassword, newPassword });
        return { success: true };
    } catch (error) {
        if (error instanceof ApiError) {
            return { success: false, error: `HTTP ${error.status}` };
        }
        return { success: false, error: "Error de conexión" };
    }
}

export async function deleteAccount(currentPassword: string): Promise<{ success: boolean; error?: string }> {
    try {
        await api.del("/UserSettings/account", { currentPassword });
        return { success: true };
    } catch (error) {
        if (error instanceof ApiError) {
            return { success: false, error: `HTTP ${error.status}` };
        }
        return { success: false, error: "Error de conexión" };
    }
}
