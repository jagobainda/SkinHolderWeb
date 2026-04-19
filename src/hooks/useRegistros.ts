import { useState, useCallback } from "react";
import { getUserItems } from "@lib/userItems";
import { getSteamPrice } from "@lib/steam";
import { getGamerPayItems } from "@lib/extSites";
import { createRegistro } from "@lib/registros";
import { createItemPrecios } from "@lib/itemPrecios";
import type { Registro, UserItem, ItemPrecio, GamerPayItemInfo, RegistrosState } from "@app-types/index";

const initialState: RegistrosState = {
    totalSteam: 0,
    totalGamerPay: 0,
    totalCSFloat: 0,
    progresoSteam: 0,
    progresoGamerPay: 0,
    progresoCSFloat: 0,
    totalItems: 0,
    itemsNoListadosGamerPay: 0,
    itemsWarningSteam: 0,
    itemsErrorSteam: 0,
    detallesSteamEnabled: false,
    detallesGamerPayEnabled: false,
    detallesCSFloatEnabled: false,
    botonesHabilitados: true,
    isLoading: false,
    error: null
};

export const useRegistros = () => {
    const [state, setState] = useState<RegistrosState>({ ...initialState });
    const [currentRegistro, setCurrentRegistro] = useState<Registro | null>(null);
    const [itemPrecios, setItemPrecios] = useState<ItemPrecio[]>([]);

    const reset = useCallback(() => {
        setState({ ...initialState });
        setItemPrecios([]);
        setCurrentRegistro(null);
    }, []);

    const obtenerUserItems = useCallback(async (): Promise<UserItem[]> => {
        return await getUserItems();
    }, []);

    const obtenerPrecios = useCallback(
        async (
            items: UserItem[]
        ): Promise<{
            precios: ItemPrecio[];
            totalSteam: number;
            totalGamerPay: number;
            totalCSFloat: number;
        }> => {
            const gamerPayResponse = await getGamerPayItems();

            const precios: ItemPrecio[] = [];
            let totalSteam = 0;
            let totalGamerPay = 0;
            const totalCSFloat = 0;
            let warningSteam = 0;
            let errorSteam = 0;
            let noListadosGamerPay = 0;

            for (let i = 0; i < items.length; i++) {
                const userItem = items[i];

                const steamResponse = await getSteamPrice(userItem.steamHashName);

                const gamerPayItem = gamerPayResponse.find((gp: GamerPayItemInfo) => gp.name === userItem.gamerPayName);

                if (steamResponse.isWarning) warningSteam++;
                if (steamResponse.isError) errorSteam++;
                if (!gamerPayItem) noListadosGamerPay++;

                if (steamResponse.price > 0) totalSteam += steamResponse.price * userItem.cantidad;
                if (gamerPayItem) totalGamerPay += gamerPayItem.price * userItem.cantidad;

                precios.push({
                    itemprecioid: 0,
                    preciosteam: Math.max(steamResponse.price, 0),
                    preciogamerpay: gamerPayItem?.price ?? 0,
                    preciocsfloat: 0,
                    useritemid: userItem.useritemid,
                    registroid: 0
                });

                setState(prev => ({
                    ...prev,
                    progresoSteam: i + 1,
                    progresoGamerPay: i + 1,
                    progresoCSFloat: i + 1,
                    totalSteam,
                    totalGamerPay,
                    totalCSFloat,
                    itemsWarningSteam: warningSteam,
                    itemsErrorSteam: errorSteam,
                    itemsNoListadosGamerPay: noListadosGamerPay
                }));

                await new Promise(resolve => setTimeout(resolve, 3000));
            }

            setState(prev => ({
                ...prev,
                totalSteam,
                totalGamerPay,
                totalCSFloat
            }));

            return { precios, totalSteam, totalGamerPay, totalCSFloat };
        },
        []
    );

    const guardarRegistro = useCallback(async (precios: ItemPrecio[], totalSteam: number, totalGamerPay: number, totalCSFloat: number): Promise<boolean> => {
        const userIdMatch = document.cookie.match(/(?:^|; )sh_userId=([^;]*)/);
        const userId = userIdMatch ? decodeURIComponent(userIdMatch[1]) : null;
        if (!userId) throw new Error("No se encontró el ID del usuario");

        const registro: Registro = {
            registroid: 0,
            fechahora: new Date().toISOString(),
            totalsteam: totalSteam,
            totalgamerpay: totalGamerPay,
            totalcsfloat: totalCSFloat,
            userid: parseInt(userId)
        };

        const registroId = await createRegistro(registro);
        if (registroId < 1) throw new Error("Error al crear el registro");

        const preciosConRegistro = precios.map(precio => ({
            ...precio,
            registroid: registroId
        }));

        const successItemPrecios = await createItemPrecios(preciosConRegistro);
        if (!successItemPrecios) throw new Error("Error al guardar los precios de los items");

        setCurrentRegistro({ ...registro, registroid: registroId });
        setItemPrecios(preciosConRegistro);

        return true;
    }, []);

    const consultar = useCallback(async () => {
        setState(prev => ({
            ...prev,
            botonesHabilitados: false,
            isLoading: true,
            error: null,
            detallesSteamEnabled: false,
            detallesGamerPayEnabled: false,
            detallesCSFloatEnabled: false
        }));

        try {
            reset();
            setState(prev => ({ ...prev, isLoading: true, botonesHabilitados: false }));

            const items = await obtenerUserItems();
            setState(prev => ({ ...prev, totalItems: items.length }));

            const { precios, totalSteam, totalGamerPay, totalCSFloat } = await obtenerPrecios(items);
            await guardarRegistro(precios, totalSteam, totalGamerPay, totalCSFloat);

            setState(prev => ({
                ...prev,
                detallesSteamEnabled: totalSteam > 0,
                detallesGamerPayEnabled: totalGamerPay > 0,
                detallesCSFloatEnabled: totalCSFloat > 0
            }));
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Error desconocido al consultar precios";
            setState(prev => ({
                ...prev,
                error: errorMessage
            }));
        } finally {
            setState(prev => ({
                ...prev,
                isLoading: false,
                botonesHabilitados: true
            }));
        }
    }, [reset, obtenerUserItems, obtenerPrecios, guardarRegistro]);

    const mostrarDetalles = useCallback(() => {
        console.log("Mostrar detalles:", currentRegistro, itemPrecios);
    }, [currentRegistro, itemPrecios]);

    const historialRegistros = useCallback(() => {
        window.location.href = "/historial";
    }, []);

    return {
        state,
        currentRegistro,
        consultar,
        mostrarDetalles,
        historialRegistros
    };
};
