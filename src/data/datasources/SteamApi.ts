import type { SteamItemInfo } from '@domain/models/SteamItemInfo'

const MAX_RETRY_ATTEMPTS = 5
const BASE_URL = 'https://steamcommunity.com/market/priceoverview/?country={0}&currency={1}&appid={2}&market_hash_name={3}'
const RETRY_DELAY_MS = 500

export const SteamApi = {
    async getPriceOverview(marketHashName: string, country: string = 'ES', currency: number = 3, appId: number = 730): Promise<SteamItemInfo> {
        // Solo esperar a que esté registrado, no verificar controller
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.ready
                console.log('Service worker ready, controller:', navigator.serviceWorker.controller)
            } catch (error) {
                console.error('Service worker not available:', error)
            }
        }

        const targetUrl = BASE_URL
            .replace('{0}', country)
            .replace('{1}', currency.toString())
            .replace('{2}', appId.toString())
            .replace('{3}', marketHashName)

        const proxyUrl = `/steam-proxy/?url=${encodeURIComponent(targetUrl)}`

        let attempts = 0

        while (attempts <= MAX_RETRY_ATTEMPTS) {
            try {
                const response = await fetch(proxyUrl, {
                    method: 'GET',
                    cache: 'no-cache'
                })

                if (response.status === 200) {
                    const contentType = response.headers.get('content-type')

                    if (contentType?.includes('text/html')) {
                        console.error(`Service worker not intercepting (attempt ${attempts + 1})`)
                        attempts++
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
                        continue
                    }

                    const data = await response.text()

                    if (data.trim().startsWith('<!DOCTYPE') || data.trim().startsWith('<html')) {
                        console.error(`Received HTML content (attempt ${attempts + 1})`)
                        attempts++
                        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
                        continue
                    }

                    const price = extractPriceFromJson(data)

                    return {
                        hashName: marketHashName,
                        price,
                        isError: false,
                        isWarning: attempts !== 0
                    }
                } else if (response.status === 500) {
                    console.error(`Service worker returned 500 (attempt ${attempts + 1})`)
                }
            } catch (error) {
                console.error(`Error making request to Steam API (attempt ${attempts + 1}):`, error)
            }

            attempts++
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY_MS))
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