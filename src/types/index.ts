// Auth
export type LoginRequest = {
    username: string;
    password: string;
};

export type AuthResult = {
    token: string;
    username: string;
    userId: string;
};

// Items
export interface Item {
    itemId: number;
    nombre: string;
    hashNameSteam: string;
    gamerPayNombre: string;
}

export interface UserItem {
    useritemid: number;
    cantidad: number;
    itemid: number;
    userid: number;
    itemName: string;
    steamHashName: string;
    gamerPayName: string;
    csFloatMarketHashName: string;
}

export interface ItemPrecio {
    itemprecioid: number;
    preciosteam: number;
    preciogamerpay: number;
    preciocsfloat: number;
    useritemid: number;
    registroid: number;
}

// Steam / External
export interface SteamItemInfo {
    hashName: string;
    price: number;
    isError: boolean;
    isWarning: boolean;
}

export interface GamerPayItemInfo {
    name: string;
    price: number;
}

// Registros
export interface Registro {
    registroid: number;
    fechahora: string;
    totalsteam: number;
    totalgamerpay: number;
    totalcsfloat: number;
    userid: number;
}

// Dashboard
export interface ConnectionStats {
    status: "active" | "inactive";
    ping: number;
    uptime: number;
}

export interface LastRegistryStats {
    totalSteam: number;
    totalGamepay: number;
    totalCsfloat: number;
}

export interface LatencyStats {
    steam: number;
    gamerpay: number;
    csfloat: number;
}

export interface VarianceStats {
    weeklyVariancePercentSteam: number;
    monthlyVariancePercentSteam: number;
    yearlyVariancePercentSteam: number;
    weeklyVariancePercentGamerPay: number;
    monthlyVariancePercentGamerPay: number;
    yearlyVariancePercentGamerPay: number;
    weeklyVariancePercentCSFloat: number;
    monthlyVariancePercentCSFloat: number;
    yearlyVariancePercentCSFloat: number;
}

export interface DashboardStats {
    connection: ConnectionStats;
    lastRegistry: LastRegistryStats | null;
    latency: LatencyStats;
    variance: VarianceStats;
}

// Toast
export type ToastType = "success" | "danger" | "warning" | "info";

export interface Toast {
    id: number;
    type: ToastType;
    title: string;
    message: string;
}

// Registros State
export interface RegistrosState {
    totalSteam: number;
    totalGamerPay: number;
    totalCSFloat: number;
    progresoSteam: number;
    progresoGamerPay: number;
    progresoCSFloat: number;
    totalItems: number;
    itemsNoListadosGamerPay: number;
    itemsWarningSteam: number;
    itemsErrorSteam: number;
    detallesSteamEnabled: boolean;
    detallesGamerPayEnabled: boolean;
    detallesCSFloatEnabled: boolean;
    botonesHabilitados: boolean;
    isLoading: boolean;
    error: string | null;
}

// Registro Details
export interface ItemDetalle {
    itemName: string;
    cantidad: number;
    precioSteam: number;
    precioGamerPay: number;
    precioCSFloat: number;
    totalSteam: number;
    totalGamerPay: number;
    totalCSFloat: number;
}
