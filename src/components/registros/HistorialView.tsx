import React, { useEffect, useState, useMemo, useCallback } from "react";
import { getRegistros, deleteRegistro } from "@lib/registros";
import { deleteItemPrecios } from "@lib/itemPrecios";
import { getTranslations } from "@i18n/index";
import type { Lang } from "@i18n/index";
import { RegistroDetailsModal } from "./RegistroDetailsModal";
import type { Registro } from "@app-types/index";

type SortColumn = "fechahora" | "totalsteam" | "totalgamerpay" | "totalcsfloat";
type SortDirection = "asc" | "desc";

export const HistorialView: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = getTranslations(lang);
    const [registros, setRegistros] = useState<Registro[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState(false);
    const [sortColumn, setSortColumn] = useState<SortColumn>("fechahora");
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
    const [detailRegistroId, setDetailRegistroId] = useState<number | null>(null);
    const [detailFecha, setDetailFecha] = useState<string | null>(null);

    useEffect(() => {
        const fetchRegistros = async () => {
            setIsLoading(true);
            try {
                const data = await getRegistros();
                setRegistros(data);
            } catch (error) {
                console.error("Error fetching registros:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchRegistros();
    }, []);

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const sortedRegistros = useMemo(() => {
        return [...registros].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            if (sortColumn === "fechahora") {
                const aDate = new Date(aVal as string).getTime();
                const bDate = new Date(bVal as string).getTime();
                return sortDirection === "asc" ? aDate - bDate : bDate - aDate;
            }
            return sortDirection === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
        });
    }, [registros, sortColumn, sortDirection]);

    const handleDelete = useCallback(async (registroId: number) => {
        if (!window.confirm(t.registros.historial.deleteConfirm)) return;

        setIsDeleting(true);
        try {
            const preciosDeleted = await deleteItemPrecios(registroId);
            if (!preciosDeleted) {
                console.error("Error deleting item precios");
                return;
            }
            const registroDeleted = await deleteRegistro(registroId);
            if (!registroDeleted) {
                console.error("Error deleting registro");
                return;
            }
            setRegistros(prev => prev.filter(r => r.registroid !== registroId));
        } catch (error) {
            console.error("Error deleting registro:", error);
        } finally {
            setIsDeleting(false);
        }
    }, []);

    const handleViewDetails = (registro: Registro) => {
        setDetailRegistroId(registro.registroid);
        setDetailFecha(registro.fechahora);
    };

    const formatFecha = (fecha: string) => {
        const date = new Date(fecha);
        return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    const getSortIndicator = (column: SortColumn) => {
        if (sortColumn !== column) return "";
        return sortDirection === "asc" ? " ▲" : " ▼";
    };

    return (
        <div className="w-full max-w-5xl mx-auto">
            {/* Title */}
            <h1 className="text-2xl font-bold text-white mb-6">{t.registros.historial.title}</h1>

            {/* Loading / Content */}
            <div className="relative bg-surface-card rounded-xl shadow-lg border border-white/8 overflow-hidden">
                {isDeleting && (
                    <div className="absolute inset-0 bg-surface/80 z-10 flex items-center justify-center rounded-xl">
                        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-white text-lg ml-3">{t.registros.historial.deleting}</span>
                    </div>
                )}

                {isLoading ? (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/8">
                                    <th className="py-3 px-4 text-left">
                                        <div className="skeleton h-4 w-16 rounded" />
                                    </th>
                                    <th className="py-3 px-4 text-right">
                                        <div className="skeleton h-4 w-14 rounded ml-auto" />
                                    </th>
                                    <th className="py-3 px-4 text-right">
                                        <div className="skeleton h-4 w-18 rounded ml-auto" />
                                    </th>
                                    <th className="py-3 px-4 text-right">
                                        <div className="skeleton h-4 w-16 rounded ml-auto" />
                                    </th>
                                    <th className="py-3 px-4 text-right">
                                        <div className="skeleton h-4 w-20 rounded ml-auto" />
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {[...Array(8)].map((_, i) => (
                                    <tr key={i} className="border-b border-white/5">
                                        <td className="py-3 px-4">
                                            <div className="skeleton h-4 w-32 rounded" />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="skeleton h-4 w-16 rounded ml-auto" />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="skeleton h-4 w-16 rounded ml-auto" />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="skeleton h-4 w-16 rounded ml-auto" />
                                        </td>
                                        <td className="py-3 px-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <div className="skeleton h-8 w-8 rounded-lg" />
                                                <div className="skeleton h-8 w-8 rounded-lg" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : registros.length === 0 ? (
                    <div className="text-center text-gray-400 py-16">{t.registros.historial.noRegistros}</div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/8">
                                    <SortHeader label={t.registros.historial.date} column="fechahora" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} />
                                    <SortHeader label="STEAM" column="totalsteam" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="right" />
                                    <SortHeader label="GAMERPAY" column="totalgamerpay" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="right" />
                                    <SortHeader label="CSFLOAT" column="totalcsfloat" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="right" />
                                    <th className="py-3 px-4 text-right">
                                        <span className="font-semibold text-xs tracking-wider text-gray-400">{t.registros.historial.actions}</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedRegistros.map(registro => (
                                    <tr key={registro.registroid} className="border-b border-white/5 border-l-2 border-l-transparent hover:border-l-primary hover:bg-surface-elevated transition-colors">
                                        <td className="py-3 px-4 text-white">{formatFecha(registro.fechahora)}</td>
                                        <td className="py-3 px-4 text-white text-right">{registro.totalsteam.toFixed(2)} €</td>
                                        <td className="py-3 px-4 text-white text-right">{registro.totalgamerpay.toFixed(2)} €</td>
                                        <td className="py-3 px-4 text-white text-right">{registro.totalcsfloat.toFixed(2)} €</td>
                                        <td className="py-3 px-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => handleViewDetails(registro)} className="p-2 rounded-lg text-primary hover:bg-surface transition-colors cursor-pointer" title={t.registros.historial.viewDetails}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                </button>
                                                <button onClick={() => handleDelete(registro.registroid)} className="p-2 rounded-lg text-red-400 hover:bg-surface hover:text-red-300 transition-colors cursor-pointer" title={t.registros.historial.deleteRegistro}>
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            <RegistroDetailsModal registroId={detailRegistroId} fecha={detailFecha} onClose={() => setDetailRegistroId(null)} lang={lang} />
        </div>
    );
};

// --- Sub-components ---

interface SortHeaderProps {
    label: string;
    column: SortColumn;
    currentColumn: SortColumn;
    direction: SortDirection;
    onSort: (column: SortColumn) => void;
    align?: "left" | "right";
}

const SortHeader: React.FC<SortHeaderProps> = ({ label, column, currentColumn, direction, onSort, align = "left" }) => {
    const isActive = currentColumn === column;
    const indicator = isActive ? (direction === "asc" ? " ▲" : " ▼") : "";
    const alignClass = align === "right" ? "text-right" : "text-left";

    return (
        <th className={`py-3 px-4 ${alignClass}`}>
            <button onClick={() => onSort(column)} className={`font-semibold text-xs tracking-wider cursor-pointer transition-colors ${isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"}`}>
                {label}
                {indicator}
            </button>
        </th>
    );
};
