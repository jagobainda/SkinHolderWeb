import type { UserItem } from '@domain/models/UserItem'
import type { IUserItemRepository } from '@domain/usecases/GetUserItems'
import { UserItemApi } from '@data/datasources/UserItemApi'


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