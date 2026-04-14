import { api } from "./api";

async function measureLatency(url: string): Promise<number> {
    const start = performance.now();
    try {
        await fetch(url, { method: "HEAD", mode: "no-cors" });
        return Math.round(performance.now() - start);
    } catch {
        return -1;
    }
}

export async function measureDatabaseLatency(): Promise<number> {
    const start = performance.now();
    try {
        await api.get("/");
        return Math.round(performance.now() - start);
    } catch {
        return -1;
    }
}

export async function measureAllLatencies() {
    const [steam, gamerpay, csfloat] = await Promise.all([measureLatency("https://steamcommunity.com"), measureLatency("https://gamerpay.gg"), measureLatency("https://csfloat.com")]);

    return { steam, gamerpay, csfloat };
}
