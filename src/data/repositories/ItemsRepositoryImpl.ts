import type { Item } from '@domain/models/Item'
import { ItemsApi } from '@data/datasources/ItemsApi'

export interface IItemsRepository {
    getItems(): Promise<Item[]>
}

export class ItemsRepositoryImpl implements IItemsRepository {
    async getItems(): Promise<Item[]> {
        return await ItemsApi.getItems()
    }
}