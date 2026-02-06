import type { ItemPrecio } from '@domain/models/ItemPrecio'

export interface IItemPrecioRepository {
    getItemPrecios(registroId: number): Promise<ItemPrecio[]>
    createItemPrecios(itemPrecios: ItemPrecio[]): Promise<boolean>
    deleteItemPrecios(registroId: number): Promise<boolean>
}

export const createItemPreciosUseCase = async (
    repo: IItemPrecioRepository,
    itemPrecios: ItemPrecio[]
): Promise<boolean> => {
    return repo.createItemPrecios(itemPrecios)
}

export const getItemPreciosUseCase = async (
    repo: IItemPrecioRepository,
    registroId: number
): Promise<ItemPrecio[]> => {
    return repo.getItemPrecios(registroId)
}

export const deleteItemPreciosUseCase = async (
    repo: IItemPrecioRepository,
    registroId: number
): Promise<boolean> => {
    return repo.deleteItemPrecios(registroId)
}
