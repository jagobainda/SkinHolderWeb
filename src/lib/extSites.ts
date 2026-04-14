import { api } from "./api";
import type { GamerPayItemInfo } from "@types/index";

interface GamerPayApiResponse {
    item: string;
    price: number;
}

export async function getGamerPayItems(): Promise<GamerPayItemInfo[]> {
    const { data } = await api.get<GamerPayApiResponse[]>("/External/GetGamerPayPrices");

    if (!Array.isArray(data)) {
        throw new Error(`GamerPay: respuesta inesperada del servidor (${typeof data})`);
    }

    return data.map(element => ({
        name: element.item,
        price: element.price
    }));
}
