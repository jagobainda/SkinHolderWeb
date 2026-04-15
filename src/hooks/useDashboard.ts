import { useQuery } from "@tanstack/react-query";
import { getLastRegistro, getVarianceStats } from "@lib/registros";
import { measureDatabaseLatency, measureAllLatencies } from "@lib/latency";
import type { DashboardStats } from "@app-types/index";

function getCookieValue(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
}

function setCookieValue(name: string, value: string) {
    const expires = new Date(Date.now() + 7 * 864e5).toUTCString();
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax`;
}

function calculateUptime(): number {
    const startTime = getCookieValue("app_start_time");
    if (!startTime) {
        const now = Date.now();
        setCookieValue("app_start_time", now.toString());
        return 0;
    }
    const elapsed = Date.now() - parseInt(startTime);
    return Math.round(elapsed / (1000 * 60 * 60));
}

async function fetchDashboardStats(): Promise<DashboardStats> {
    const [lastRegistro, varianceStats, dbPing, externalLatencies] = await Promise.all([getLastRegistro(), getVarianceStats(), measureDatabaseLatency(), measureAllLatencies()]);

    const isActive = dbPing !== -1 && dbPing < 5000;

    return {
        connection: {
            status: isActive ? "active" : "inactive",
            ping: dbPing,
            uptime: calculateUptime()
        },
        lastRegistry: lastRegistro
            ? {
                  totalSteam: lastRegistro.totalsteam ?? 0,
                  totalGamepay: lastRegistro.totalgamerpay ?? 0,
                  totalCsfloat: lastRegistro.totalcsfloat ?? 0
              }
            : null,
        latency: externalLatencies,
        variance: varianceStats
    };
}

export function useDashboard() {
    return useQuery({
        queryKey: ["dashboard"],
        queryFn: fetchDashboardStats,
        refetchInterval: 30_000
    });
}
