import axios from 'axios'
import api from './ApiClient'
import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'

interface GamerPayApiResponse {
    item: string
    price: number
}

export const ExtSitesApi = {
    async makeGamerPayRequest(): Promise<GamerPayItemInfo[]> {
        try {
            const response = await axios.get<GamerPayApiResponse[]>('/gamerpay-proxy/')
            const data = response.data
            console.log(response)
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
    },

    async makeGamerPayRequestFromProxy(): Promise<GamerPayItemInfo[]> {
        try {
            const response = await api.get<GamerPayApiResponse[]>('/External/GetGamerPayPrices')

            if (Array.isArray(response.data)) {
                return response.data.map((element) => ({
                    name: element.item,
                    price: element.price
                }))
            }

            return []
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error making request to proxy API:', error.response?.status, error.message)
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