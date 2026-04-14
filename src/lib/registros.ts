import { api } from "./api";
import type { Registro, VarianceStats } from "@types/index";

export async function getLastRegistro(): Promise<Registro | null> {
    try {
        const { data } = await api.get<Registro>("/Registros/GetLastRegistro");
        return data;
    } catch {
        return null;
    }
}

export async function getRegistros(): Promise<Registro[]> {
    try {
        const { data } = await api.get<Registro[]>("/Registros");
        return data;
    } catch {
        return [];
    }
}

export async function createRegistro(registro: Registro): Promise<number> {
    try {
        const { data } = await api.post<number>("/Registros", registro);
        const registroId = Number(data);
        return isNaN(registroId) ? 0 : registroId;
    } catch {
        return 0;
    }
}

export async function deleteRegistro(registroId: number): Promise<boolean> {
    try {
        const { status } = await api.del(`/Registros?registroId=${registroId}`);
        return status >= 200 && status < 300;
    } catch {
        return false;
    }
}

export async function getVarianceStats(): Promise<VarianceStats> {
    try {
        const { data } = await api.get<VarianceStats>("/Registros/GetVarianceStats");
        return data;
    } catch {
        return {
            weeklyVariancePercentSteam: -101,
            monthlyVariancePercentSteam: -101,
            yearlyVariancePercentSteam: -101,
            weeklyVariancePercentGamerPay: -101,
            monthlyVariancePercentGamerPay: -101,
            yearlyVariancePercentGamerPay: -101,
            weeklyVariancePercentCSFloat: -101,
            monthlyVariancePercentCSFloat: -101,
            yearlyVariancePercentCSFloat: -101
        };
    }
}
