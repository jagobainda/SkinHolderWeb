import api from './ApiClient'
import type { ItemPrecio } from '@domain/models/ItemPrecio'
import { AxiosError } from 'axios'

export const ItemPrecioApi = {
    async getItemPrecios(registroId: number): Promise<ItemPrecio[]> {
        try {
            const response = await api.get<ItemPrecio[]>(`/ItemPrecio/${registroId}`)
            return response.data
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error getting item precios:', error.response?.status, error.message)
                return []
            }

            if (error instanceof Error) {
                console.error('Unexpected error:', error.message)
                return []
            }

            console.error('Unknown error occurred')
            return []
        }
    },

    async createItemPrecios(itemPrecios: ItemPrecio[]): Promise<boolean> {
        try {
            const response = await api.post('/ItemPrecio', itemPrecios)
            return response.status >= 200 && response.status < 300
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error creating item precios:', error.response?.status, error.message)
                return false
            }

            if (error instanceof Error) {
                console.error('Unexpected error:', error.message)
                return false
            }

            console.error('Unknown error occurred')
            return false
        }
    },

    async deleteItemPrecios(registroId: number): Promise<boolean> {
        try {
            const response = await api.delete(`/ItemPrecio/${registroId}`)
            return response.status >= 200 && response.status < 300
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error deleting item precios:', error.response?.status, error.message)
                return false
            }

            if (error instanceof Error) {
                console.error('Unexpected error:', error.message)
                return false
            }

            console.error('Unknown error occurred')
            return false
        }
    }
}