import { api } from "./api";
import type { UserItem } from "@app-types/index";

export async function getUserItems(): Promise<UserItem[]> {
    try {
        const { data } = await api.get<UserItem[]>("/UserItems");
        return data;
    } catch (error) {
        console.error("Error al obtener items:", error);
        return [];
    }
}

export async function addUserItem(userItem: UserItem): Promise<boolean> {
    try {
        const { status } = await api.post("/UserItems", userItem);
        return status >= 200 && status < 300;
    } catch (error) {
        console.error("Error al agregar item:", error);
        return false;
    }
}

export async function updateUserItem(userItem: UserItem, cantidad: number): Promise<boolean> {
    try {
        const { status } = await api.put("/UserItems", { ...userItem, cantidad });
        return status >= 200 && status < 300;
    } catch (error) {
        console.error("Error al actualizar item:", error);
        return false;
    }
}
