import React from 'react'
import { TopNavbar } from '@ui/components/shared/TopNavbar'
import { useDocumentTitle } from "@ui/hooks/useDocumentTitle.ts"
import { useTranslation } from "@ui/hooks/useTranslation.ts"
import { useRegistrosViewModel } from '@presentation/viewmodels/useRegistrosViewModel'
import { ActionsCard } from '@ui/components/registros/ActionsCard'
import { ProgressCard } from "@ui/components/registros/ProgressCard.tsx";

export const RegistrosPage: React.FC = () => {
    const { t } = useTranslation()
    useDocumentTitle(`SkinHolder - ${t.main.navbar.records}`)

    const { state, consultar, mostrarDetalles, historialRegistros } = useRegistrosViewModel()

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C] pt-16">
            <TopNavbar />

            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
                {state.isLoading && state.totalItems === 0 ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white text-xl">Cargando items...</span>
                    </div>
                ) : state.error ? (
                    <div className="text-red-400 text-xl">{state.error}</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
                        <ActionsCard
                            onConsultar={consultar}
                            onHistorial={historialRegistros}
                            isEnabled={state.botonesHabilitados}
                        />

                        <ProgressCard
                            platform="steam"
                            progress={state.progresoSteam}
                            total={state.totalItems}
                            totalPrice={state.totalSteam}
                            onShowDetails={mostrarDetalles}
                            isEnabled={state.detallesSteamEnabled}
                        />

                        <ProgressCard
                            platform="gamerpay"
                            progress={state.progresoGamerPay}
                            total={state.totalItems}
                            totalPrice={state.totalGamerPay}
                            onShowDetails={mostrarDetalles}
                            isEnabled={state.detallesGamerPayEnabled}
                        />

                        <ProgressCard
                            platform="csfloat"
                            progress={state.progresoCSFloat}
                            total={state.totalItems}
                            totalPrice={state.totalCSFloat}
                            onShowDetails={mostrarDetalles}
                            isEnabled={state.detallesCSFloatEnabled}
                        />
                    </div>
                )}
            </main>
        </div>
    )
}