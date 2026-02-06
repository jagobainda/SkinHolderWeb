import type { SteamItemInfo } from '@domain/models/SteamItemInfo'
import api from './ApiClient'
import axios from 'axios'

const POLLING_INTERVAL_MS = 500
const MAX_POLLING_ATTEMPTS = 60 // 30 segundos máximo de espera

interface QueueResponse {
    taskId: string
    status: string
    message: string
}

interface TaskStatusResponse {
    status: 'queued' | 'processing' | 'completed' | 'failed'
    marketHashName: string
    result: string | null
    price: number | null
    error: string | null
    createdAt: string
    completedAt: string | null
}

export const SteamApi = {
    async getPriceOverview(marketHashName: string): Promise<SteamItemInfo> {
        try {
            const queueResponse = await api.post<QueueResponse>('/External/GetSteamPrice', JSON.stringify(marketHashName), {
                headers: { 'Content-Type': 'application/json' }
            })

            if (queueResponse.status !== 202) {
                console.error('Error queuing Steam price request:', queueResponse.status)
                return createErrorResponse(marketHashName)
            }

            const { taskId } = queueResponse.data

            let attempts = 0
            while (attempts < MAX_POLLING_ATTEMPTS) {
                await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL_MS))

                try {
                    const statusResponse = await api.get<TaskStatusResponse>(`/External/GetSteamPriceStatus/${taskId}`)
                    const taskStatus = statusResponse.data

                    if (taskStatus.status === 'completed') {
                        return {
                            hashName: marketHashName,
                            price: taskStatus.price ?? -1,
                            isError: false,
                            isWarning: false
                        }
                    }

                    if (taskStatus.status === 'failed') {
                        console.error('Steam price task failed:', taskStatus.error)
                        return createErrorResponse(marketHashName)
                    }
                } catch (pollingError) {
                    if (axios.isAxiosError(pollingError) && pollingError.response?.status === 404) {
                        console.error('Task not found or expired')
                        return createErrorResponse(marketHashName)
                    }

                    console.error('Error polling task status:', pollingError)
                    return createErrorResponse(marketHashName)
                }

                attempts++
            }

            console.error('Steam price polling timeout')
            return createErrorResponse(marketHashName)

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('Error making request to Steam API:', error.response?.status, error.message)
            } else if (error instanceof Error) {
                console.error('Unexpected error:', error.message)
            } else {
                console.error('Unknown error occurred')
            }
            return createErrorResponse(marketHashName)
        }
    }
}

const createErrorResponse = (marketHashName: string): SteamItemInfo => ({
    hashName: marketHashName,
    price: -1,
    isError: true,
    isWarning: false
})
