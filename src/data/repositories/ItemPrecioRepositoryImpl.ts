import type { ItemPrecio } from '@domain/models/ItemPrecio'
import { ItemPrecioApi } from '@data/datasources/ItemPrecioApi'

export interface IItemPrecioRepository {
    getItemPrecios(registroId: number): Promise<ItemPrecio[]>
    createItemPrecios(itemPrecios: ItemPrecio[]): Promise<boolean>
    deleteItemPrecios(registroId: number): Promise<boolean>
}

export class ItemPrecioRepositoryImpl implements IItemPrecioRepository {
    async getItemPrecios(registroId: number): Promise<ItemPrecio[]> {
        return await ItemPrecioApi.getItemPrecios(registroId)
    }

    async createItemPrecios(itemPrecios: ItemPrecio[]): Promise<boolean> {
        return await ItemPrecioApi.createItemPrecios(itemPrecios)
    }

    async deleteItemPrecios(registroId: number): Promise<boolean> {
        return await ItemPrecioApi.deleteItemPrecios(registroId)
    }
}