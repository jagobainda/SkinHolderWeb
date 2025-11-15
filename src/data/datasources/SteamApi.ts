import axios from 'axios'
import type { SteamItemInfo } from '@domain/models/SteamItemInfo'

const MAX_RETRY_ATTEMPTS = 5
const BASE_URL = 'https://steamcommunity.com/market/priceoverview/'

export const SteamApi = {
    async getPriceOverview(
        marketHashName: string,
        country: string = 'ES',
        currency: number = 3,
        appId: number = 730
    ): Promise<SteamItemInfo> {
        const params = {
            country,
            currency,
            appid: appId,
            market_hash_name: marketHashName
        }

        let attempts = 0

        while (attempts <= MAX_RETRY_ATTEMPTS) {
            try {
                const response = await axios.get(BASE_URL, {
                    params,
                    responseType: 'text'
                })

                if (response.status === 200) {
                    const price = extractPriceFromJson(response.data)

                    return {
                        hashName: marketHashName,
                        price,
                        isError: false,
                        isWarning: attempts !== 0
                    }
                }
            } catch (error) {
                console.error(`Error making request to Steam API (attempt ${attempts + 1}):`, error)
            }

            attempts++
        }

        return {
            hashName: marketHashName,
            price: -1,
            isError: true,
            isWarning: false
        }
    }
}

function extractPriceFromJson(input: string): number {
    if (!input) {
        return -1
    }

    try {
        const data = JSON.parse(input)
        const priceString = data.lowest_price
            ?.replace('-', '0')
            ?.replace('€', '')
            ?.trim() ?? ''

        const price = parseFloat(priceString)
        return isNaN(price) ? -1 : price
    } catch (error) {
        console.error('Error parsing JSON response:', error)
        return -1
    }
}