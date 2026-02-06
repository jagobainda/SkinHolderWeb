import type { UserItem } from '@domain/models/UserItem'

export interface IUserItemRepository {
    getUserItems(): Promise<UserItem[]>
    addUserItem(userItem: UserItem): Promise<boolean>
    updateUserItem(userItem: UserItem, cantidad: number): Promise<boolean>
}

export const getUserItemsUseCase = async (repo: IUserItemRepository): Promise<UserItem[]> => {
    return repo.getUserItems()
}

export const addUserItemUseCase = async (repo: IUserItemRepository, userItem: UserItem): Promise<boolean> => {
    return repo.addUserItem(userItem)
}

export const updateUserItemUseCase = async (repo: IUserItemRepository, userItem: UserItem, cantidad: number): Promise<boolean> => {
    return repo.updateUserItem(userItem, cantidad)
}
