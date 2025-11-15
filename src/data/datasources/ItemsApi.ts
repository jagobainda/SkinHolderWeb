import api from './ApiClient'
import type { Item } from '@domain/models/Item'
import { AxiosError } from 'axios'

export const ItemsApi = {
    async getItems(): Promise<Item[]> {
        try {
            const response = await api.get('/Items')
            return response.data as Item[]
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                console.error('Error al obtener items:', error.message)
            }
            return []
        }
    }
}