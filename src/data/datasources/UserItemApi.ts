import api from './ApiClient'
import type { UserItem } from '@domain/models/UserItem'
import { AxiosError } from 'axios'

export const UserItemApi = {
    async getUserItems(): Promise<UserItem[]> {
        try {
            const response = await api.get('/UserItems')
            return response.data as UserItem[]
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Error al obtener items:', error.message)
            }
            return []
        }
    },

    async addUserItem(userItem: UserItem): Promise<boolean> {
        try {
            const response = await api.post('/UserItems', userItem)
            return response.status >= 200 && response.status < 300
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Error al agregar item:', error.message)
            }
            return false
        }
    },

    async updateUserItem(userItem: UserItem, cantidad: number): Promise<boolean> {
        try {
            const updatedItem = {
                ...userItem,
                cantidad
            }
            const response = await api.put('/UserItems', updatedItem)
            return response.status >= 200 && response.status < 300
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Error al actualizar item:', error.message)
            }
            return false
        }
    }
}