import { useState, useCallback } from 'react'
import { RegistroApi } from '@data/datasources/RegistroApi'
import { UserItemApi } from '@data/datasources/UserItemApi'
import { SteamApi } from '@data/datasources/SteamApi'
import { ExtSitesApi } from '@data/datasources/ExtSitesApi'
import { ItemPrecioApi } from '@data/datasources/ItemPrecioApi'
import type { Registro } from '@domain/models/Registro'
import type { UserItem } from '@domain/models/UserItem'
import type { ItemPrecio } from '@domain/models/ItemPrecio'
import type { GamerPayItemInfo } from '@domain/models/GamerPayItemInfo'
//import { ExtSitesRepositoryImpl } from "@data/repositories/ExtSitesRepositoryImpl.ts";
//import { RegistroRepositoryImpl } from "@data/repositories/RegistroRepositoryImpl.ts";
//import { UserItemRepositoryImpl } from "@data/repositories/UserItemRepositoryImpl.ts";

//const extSitesRepository = new ExtSitesRepositoryImpl()
//const registrosRepository = new RegistroRepositoryImpl()
//const userItemRepository = new UserItemRepositoryImpl()

interface RegistrosState {
    totalSteam: number
    totalGamerPay: number
    totalCSFloat: number
    progresoSteam: number
    progresoGamerPay: number
    progresoCSFloat: number
    totalItems: number
    itemsNoListadosGamerPay: number
    itemsWarningSteam: number
    itemsErrorSteam: number
    detallesSteamEnabled: boolean
    detallesGamerPayEnabled: boolean
    detallesCSFloatEnabled: boolean
    botonesHabilitados: boolean
    isLoading: boolean
    error: string | null
}

export const useRegistrosViewModel = () => {
    const [state, setState] = useState<RegistrosState>({
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
    })

    const [currentRegistro, setCurrentRegistro] = useState<Registro | null>(null)
    const [itemPrecios, setItemPrecios] = useState<ItemPrecio[]>([])

    const reset = useCallback(() => {
        setState({
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
        })
        setItemPrecios([])
        setCurrentRegistro(null)
    }, [])

    const obtenerUserItems = useCallback(async (): Promise<UserItem[]> => {
        return await UserItemApi.getUserItems()
    }, [])

    const obtenerPrecios = useCallback(async (items: UserItem[]): Promise<ItemPrecio[]> => {
        const gamerPayResponse = await ExtSitesApi.makeGamerPayRequestFromProxy()

        if (gamerPayResponse.length === 0) throw new Error('No se han podido obtener los items de GamerPay.')

        const precios: ItemPrecio[] = []
        let totalSteam = 0
        let totalGamerPay = 0
        const totalCSFloat = 0
        let warningSteam = 0
        let errorSteam = 0
        let noListadosGamerPay = 0

        for (let i = 0; i < items.length; i++) {
            const userItem = items[i]

            const steamResponse = await SteamApi.getPriceOverview(userItem.steamHashName)

            const gamerPayItem = gamerPayResponse.find((gp: GamerPayItemInfo) => gp.name === userItem.gamerPayName)

            if (steamResponse.isWarning) warningSteam++
            if (steamResponse.isError) errorSteam++
            if (!gamerPayItem) noListadosGamerPay++

            if (steamResponse.price > 0)totalSteam += steamResponse.price * userItem.cantidad

            if (gamerPayItem) totalGamerPay += gamerPayItem.price * userItem.cantidad

            // TODO: Implementar CSFloat

            precios.push({
                itemprecioid: 0,
                preciosteam: Math.max(steamResponse.price, 0),
                preciogamerpay: gamerPayItem?.price ?? 0,
                preciocsfloat: 0,
                useritemid: userItem.useritemid,
                registroid: 0
            })

            setState((prev) => ({
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
            }))

            await new Promise((resolve) => setTimeout(resolve, 3000))
        }

        setState((prev) => ({
            ...prev,
            totalSteam,
            totalGamerPay,
            totalCSFloat
        }))

        return precios
    }, [])

    const guardarRegistro = useCallback(async (precios: ItemPrecio[]): Promise<boolean> => {
        const userId = localStorage.getItem('userId')
        if (!userId) throw new Error('No se encontró el ID del usuario')

        const registro: Registro = {
            registroid: 0,
            fechahora: new Date().toISOString(),
            totalsteam: state.totalSteam,
            totalgamerpay: state.totalGamerPay,
            totalcsfloat: state.totalCSFloat,
            userid: parseInt(userId)
        }

        const registroId = await RegistroApi.createRegistro(registro)

        if (registroId < 1) throw new Error('Error al crear el registro')

        const preciosConRegistro = precios.map((precio) => ({
            ...precio,
            registroid: registroId
        }))

        const successItemPrecios = await ItemPrecioApi.createItemPrecios(preciosConRegistro)

        if (!successItemPrecios) throw new Error('Error al guardar los precios de los items')

        setCurrentRegistro({ ...registro, registroid: registroId })
        setItemPrecios(preciosConRegistro)

        return true
    }, [state.totalSteam, state.totalGamerPay, state.totalCSFloat])

    const consultar = useCallback(async () => {
        setState((prev) => ({
            ...prev,
            botonesHabilitados: false,
            isLoading: true,
            error: null,
            detallesSteamEnabled: false,
            detallesGamerPayEnabled: false,
            detallesCSFloatEnabled: false
        }))

        try {
            reset()
            setState((prev) => ({ ...prev, isLoading: true, botonesHabilitados: false }))

            const items = await obtenerUserItems()
            setState((prev) => ({ ...prev, totalItems: items.length }))

            const precios = await obtenerPrecios(items)
            await guardarRegistro(precios)

            setState((prev) => ({
                ...prev,
                detallesSteamEnabled: prev.totalSteam > 0,
                detallesGamerPayEnabled: prev.totalGamerPay > 0,
                detallesCSFloatEnabled: prev.totalCSFloat > 0
            }))
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al consultar precios'
            setState((prev) => ({
                ...prev,
                error: errorMessage
            }))
        } finally {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                botonesHabilitados: true
            }))
        }
    }, [reset, obtenerUserItems, obtenerPrecios, guardarRegistro])

    const mostrarDetalles = useCallback(() => {
        // TODO: Implementar modal de detalles
        console.log('Mostrar detalles:', currentRegistro, itemPrecios)
    }, [currentRegistro, itemPrecios])

    const historialRegistros = useCallback(() => {
        // TODO: Implementar modal de historial
        console.log('Mostrar historial de registros')
    }, [])

    return {
        state,
        consultar,
        mostrarDetalles,
        historialRegistros
    }
}

