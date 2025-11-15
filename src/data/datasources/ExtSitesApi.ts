import axios from 'axios'
import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'

interface GamerPayApiResponse {
    item: string
    price: number
}

export const ExtSitesApi = {
    async makeGamerPayRequest(): Promise<GamerPayItemInfo[]> {
        try {
            const response = await axios.get<GamerPayApiResponse[]>('https://api.gamerpay.gg/prices')
            const data = response.data

            if (Array.isArray(data)) {
                return data.map((element) => ({
                    name: element.item,
                    price: element.price
                }))
            }

            return []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error making request to GamerPay API:', error.response?.status, error.message)
                return []
            }

            if (error instanceof Error) {
                console.error('Unexpected error:', error.message)
                return []
            }

            console.error('Unknown error occurred')
            return []
        }
    }
}