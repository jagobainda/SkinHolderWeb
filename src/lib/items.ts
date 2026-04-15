import { api } from "./api";
import type { Item } from "@app-types/index";

export async function getItems(): Promise<Item[]> {
    try {
        const { data } = await api.get<Item[]>("/Items");
        return data;
    } catch (error) {
        console.error("Error al obtener items:", error);
        return [];
    }
}
