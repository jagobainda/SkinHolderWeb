import type { SteamItemInfo } from '@domain/models/SteamItemInfo'

const MAX_RETRY_ATTEMPTS = 5
const BASE_URL = 'https://steamcommunity.com/market/priceoverview/?country={0}&currency={1}&appid={2}&market_hash_name={3}'

export const SteamApi = {
    async getPriceOverview(marketHashName: string, country: string = 'ES', currency: number = 3, appId: number = 730): Promise<SteamItemInfo> {
        const targetUrl = BASE_URL
            .replace('{0}', country)
            .replace('{1}', currency.toString())
            .replace('{2}', appId.toString())
            .replace('{3}', marketHashName)

        const proxyUrl = `/steam-proxy/?url=${encodeURIComponent(targetUrl)}`

        let attempts = 0

        while (attempts <= MAX_RETRY_ATTEMPTS) {
            try {
                const response = await fetch(proxyUrl)

                if (response.status === 200) {
                    const data = await response.text()
                    const price = extractPriceFromJson(data)

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

const extractPriceFromJson = (input: string): number => {
    if (!input) return -1

    try {
        const data = JSON.parse(input)

        const priceString = data.lowest_price
            ?.replace('-', '0')
            ?.replace('€', '')
            ?.replace(',', '.')
            ?.trim() ?? ''

        const price = parseFloat(priceString)

        return isNaN(price) ? -1 : price
    } catch (error) {
        console.error('Error parsing JSON response:', error)
        return -1
    }
}