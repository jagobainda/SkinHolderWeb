import { api, ApiError } from "./api";
import type { SteamItemInfo } from "@types/index";

const POLLING_INTERVAL_MS = 500;
const MAX_POLLING_ATTEMPTS = 60;

interface QueueResponse {
    taskId: string;
    status: string;
    message: string;
}

interface TaskStatusResponse {
    status: "queued" | "processing" | "completed" | "failed";
    marketHashName: string;
    result: string | null;
    price: number | null;
    error: string | null;
    createdAt: string;
    completedAt: string | null;
}

const createErrorResponse = (marketHashName: string): SteamItemInfo => ({
    hashName: marketHashName,
    price: -1,
    isError: true,
    isWarning: false
});

export async function getSteamPrice(marketHashName: string): Promise<SteamItemInfo> {
    try {
        const { data: queueData, status } = await api.post<QueueResponse>("/External/GetSteamPrice", marketHashName);

        if (status !== 202) {
            console.error("Error queuing Steam price request:", status);
            return createErrorResponse(marketHashName);
        }

        const { taskId } = queueData;
        let attempts = 0;

        while (attempts < MAX_POLLING_ATTEMPTS) {
            await new Promise(resolve => setTimeout(resolve, POLLING_INTERVAL_MS));

            try {
                const { data: taskStatus } = await api.get<TaskStatusResponse>(`/External/GetSteamPriceStatus/${taskId}`);

                if (taskStatus.status === "completed") {
                    return {
                        hashName: marketHashName,
                        price: taskStatus.price ?? -1,
                        isError: false,
                        isWarning: false
                    };
                }

                if (taskStatus.status === "failed") {
                    console.error("Steam price task failed:", taskStatus.error);
                    return createErrorResponse(marketHashName);
                }
            } catch (pollingError) {
                if (pollingError instanceof ApiError && pollingError.status === 404) {
                    console.error("Task not found or expired");
                    return createErrorResponse(marketHashName);
                }
                console.error("Error polling task status:", pollingError);
                return createErrorResponse(marketHashName);
            }

            attempts++;
        }

        console.error("Steam price polling timeout");
        return createErrorResponse(marketHashName);
    } catch (error) {
        if (error instanceof ApiError) {
            console.error("Error making request to Steam API:", error.status, error.message);
        } else if (error instanceof Error) {
            console.error("Unexpected error:", error.message);
        } else {
            console.error("Unknown error occurred");
        }
        return createErrorResponse(marketHashName);
    }
}
