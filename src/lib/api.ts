const BASE_URL = import.meta.env.PROD ? "https://shapi.jagoba.dev" : "/api";
const TIMEOUT_MS = 10000;

function getTokenFromCookie(): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|; )sh_token=([^;]*)/);
    return match ? decodeURIComponent(match[1]) : null;
}

async function request<T>(method: string, path: string, body?: unknown): Promise<{ data: T; status: number }> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

    const headers: Record<string, string> = {
        "Content-Type": "application/json"
    };

    const token = getTokenFromCookie();
    if (token) headers["Authorization"] = `Bearer ${token}`;

    try {
        const res = await fetch(`${BASE_URL}${path}`, {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined,
            signal: controller.signal
        });

        if (res.status === 401) {
            document.cookie = "sh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
            window.location.href = "/";
            throw new ApiError("Unauthorized", 401);
        }

        if (!res.ok) throw new ApiError(`HTTP ${res.status}`, res.status);

        const text = await res.text();
        let data: unknown;
        try {
            data = JSON.parse(text);
        } catch {
            data = text;
        }

        return { data: data as T, status: res.status };
    } finally {
        clearTimeout(timeoutId);
    }
}

export class ApiError extends Error {
    constructor(
        message: string,
        public status: number
    ) {
        super(message);
    }
}

export const api = {
    get: <T>(path: string) => request<T>("GET", path),
    post: <T>(path: string, body?: unknown) => request<T>("POST", path, body),
    put: <T>(path: string, body?: unknown) => request<T>("PUT", path, body),
    del: <T>(path: string, body?: unknown) => request<T>("DELETE", path, body)
};
