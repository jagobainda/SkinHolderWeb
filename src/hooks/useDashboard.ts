import { useQuery } from "@tanstack/react-query";
import { getLastRegistro, getVarianceStats } from "@lib/registros";
import { measureDatabaseLatency, measureAllLatencies } from "@lib/latency";
import type { DashboardStats } from "@types/index";

function calculateUptime(): number {
    const startTime = localStorage.getItem("app_start_time");
    if (!startTime) {
        const now = Date.now();
        localStorage.setItem("app_start_time", now.toString());
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
