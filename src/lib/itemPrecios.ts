import { api } from "./api";
import type { ItemPrecio } from "@types/index";

export async function getItemPrecios(registroId: number): Promise<ItemPrecio[]> {
    try {
        const { data } = await api.get<ItemPrecio[]>(`/ItemPrecio/${registroId}`);
        return data;
    } catch (error) {
        console.error("Error getting item precios:", error);
        return [];
    }
}

export async function createItemPrecios(itemPrecios: ItemPrecio[]): Promise<boolean> {
    try {
        const { status } = await api.post("/ItemPrecio", itemPrecios);
        return status >= 200 && status < 300;
    } catch (error) {
        console.error("Error creating item precios:", error);
        return false;
    }
}

export async function deleteItemPrecios(registroId: number): Promise<boolean> {
    try {
        const { status } = await api.del(`/ItemPrecio/${registroId}`);
        return status >= 200 && status < 300;
    } catch (error) {
        console.error("Error deleting item precios:", error);
        return false;
    }
}
