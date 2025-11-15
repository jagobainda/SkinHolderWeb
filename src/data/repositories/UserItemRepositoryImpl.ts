import type { UserItem } from '@domain/models/UserItem'
import { UserItemApi } from '@data/datasources/UserItemApi'

export interface IUserItemRepository {
    getUserItems(): Promise<UserItem[]>
    addUserItem(userItem: UserItem): Promise<boolean>
    updateUserItem(userItem: UserItem, cantidad: number): Promise<boolean>
}

export class UserItemRepositoryImpl implements IUserItemRepository {
    async getUserItems(): Promise<UserItem[]> {
        return await UserItemApi.getUserItems()
    }

    async addUserItem(userItem: UserItem): Promise<boolean> {
        return await UserItemApi.addUserItem(userItem)
    }

    async updateUserItem(userItem: UserItem, cantidad: number): Promise<boolean> {
        return await UserItemApi.updateUserItem(userItem, cantidad)
    }
}