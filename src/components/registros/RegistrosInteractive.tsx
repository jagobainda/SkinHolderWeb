import React, { useState, useCallback } from "react";
import { useRegistros } from "@hooks/useRegistros";
import { getTranslations } from "@i18n/index";
import { ActionsCard } from "./ActionsCard";
import { ProgressCard } from "./ProgressCard";
import { RegistroDetailsModal } from "./RegistroDetailsModal";

export const RegistrosInteractive: React.FC = () => {
    const t = getTranslations();
    const { state, currentRegistro, consultar, historialRegistros } = useRegistros();
    const [detailRegistroId, setDetailRegistroId] = useState<number | null>(null);
    const [detailFecha, setDetailFecha] = useState<string | null>(null);

    const handleShowDetails = useCallback(() => {
        if (currentRegistro) {
            setDetailRegistroId(currentRegistro.registroid);
            setDetailFecha(currentRegistro.fechahora);
        }
    }, [currentRegistro]);

    if (state.isLoading && state.totalItems === 0) {
        return (
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-white text-xl">{t.registros.loadingItems}</span>
            </div>
        );
    }

    if (state.error) {
        return <div className="text-red-400 text-xl">{state.error}</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
            <ActionsCard onConsultar={consultar} onHistorial={historialRegistros} isEnabled={state.botonesHabilitados} />

            <ProgressCard platform="steam" progress={state.progresoSteam} total={state.totalItems} totalPrice={state.totalSteam} onShowDetails={handleShowDetails} isEnabled={state.detallesSteamEnabled} />

            <ProgressCard platform="gamerpay" progress={state.progresoGamerPay} total={state.totalItems} totalPrice={state.totalGamerPay} onShowDetails={handleShowDetails} isEnabled={state.detallesGamerPayEnabled} />

            <ProgressCard platform="csfloat" progress={state.progresoCSFloat} total={state.totalItems} totalPrice={state.totalCSFloat} onShowDetails={handleShowDetails} isEnabled={state.detallesCSFloatEnabled} />

            <RegistroDetailsModal registroId={detailRegistroId} fecha={detailFecha} onClose={() => setDetailRegistroId(null)} />
        </div>
    );
};
