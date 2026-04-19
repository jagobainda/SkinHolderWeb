import React, { useEffect, useState, useMemo } from "react";
import { getItemPrecios } from "@lib/itemPrecios";
import { getUserItems } from "@lib/userItems";
import { getTranslations } from "@i18n/index";
import type { Lang } from "@i18n/index";
import type { ItemDetalle } from "@app-types/index";

interface RegistroDetailsModalProps {
    registroId: number | null;
    fecha: string | null;
    onClose: () => void;
    lang: Lang;
}

type SortColumn = "itemName" | "cantidad" | "precioSteam" | "precioGamerPay" | "precioCSFloat";
type SortDirection = "asc" | "desc";

export const RegistroDetailsModal: React.FC<RegistroDetailsModalProps> = ({ registroId, fecha, onClose, lang }) => {
    const t = getTranslations(lang);
    const [items, setItems] = useState<ItemDetalle[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sortColumn, setSortColumn] = useState<SortColumn | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

    useEffect(() => {
        if (registroId === null) return;

        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [itemPrecios, userItems] = await Promise.all([getItemPrecios(registroId), getUserItems()]);

                const detalles: ItemDetalle[] = itemPrecios.map(precio => {
                    const userItem = userItems.find(ui => ui.useritemid === precio.useritemid);
                    const cantidad = userItem?.cantidad ?? 1;
                    return {
                        itemName: userItem?.itemName ?? t.registros.details.unknown,
                        cantidad,
                        precioSteam: precio.preciosteam,
                        precioGamerPay: precio.preciogamerpay,
                        precioCSFloat: precio.preciocsfloat,
                        totalSteam: precio.preciosteam * cantidad,
                        totalGamerPay: precio.preciogamerpay * cantidad,
                        totalCSFloat: precio.preciocsfloat * cantidad
                    };
                });

                setItems(detalles);
            } catch (error) {
                console.error("Error fetching registro details:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [registroId]);

    const handleSort = (column: SortColumn) => {
        if (sortColumn === column) {
            setSortDirection(prev => (prev === "asc" ? "desc" : "asc"));
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    const sortedItems = useMemo(() => {
        if (!sortColumn) return items;
        return [...items].sort((a, b) => {
            const aVal = a[sortColumn];
            const bVal = b[sortColumn];
            if (typeof aVal === "string" && typeof bVal === "string") {
                return sortDirection === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
            }
            return sortDirection === "asc" ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
        });
    }, [items, sortColumn, sortDirection]);

    const totals = useMemo(
        () => ({
            steam: items.reduce((sum, i) => sum + i.totalSteam, 0),
            gamerPay: items.reduce((sum, i) => sum + i.totalGamerPay, 0),
            csFloat: items.reduce((sum, i) => sum + i.totalCSFloat, 0)
        }),
        [items]
    );

    const formatFecha = (fecha: string | null) => {
        if (!fecha) return "-";
        const date = new Date(fecha);
        return date.toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
    };

    if (registroId === null) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
            <div className="relative bg-surface-card rounded-xl shadow-2xl border border-white/8 w-full max-w-5xl max-h-[85vh] overflow-hidden animate-fade-slide-up mx-4" onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/8">
                    <h2 className="text-xl font-bold text-white">{t.registros.details.title}</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-surface-elevated cursor-pointer">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(85vh-5rem)]">
                    {isLoading ? (
                        <>
                            {/* Skeleton stat cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-surface rounded-lg p-4 border border-white/8 border-t-3 border-t-gray-600">
                                        <div className="skeleton h-3 w-24 rounded mb-2" />
                                        <div className="skeleton h-6 w-20 rounded" />
                                    </div>
                                ))}
                            </div>
                            {/* Skeleton table rows */}
                            <div className="space-y-2">
                                <div className="flex gap-4 py-3 px-4 border-b border-white/8">
                                    <div className="skeleton h-4 w-24 rounded" />
                                    <div className="skeleton h-4 w-16 rounded" />
                                    <div className="skeleton h-4 w-16 rounded" />
                                    <div className="skeleton h-4 w-16 rounded" />
                                    <div className="skeleton h-4 w-16 rounded" />
                                </div>
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex gap-4 py-3 px-4">
                                        <div className="skeleton h-4 w-40 rounded" />
                                        <div className="skeleton h-4 w-10 rounded" />
                                        <div className="skeleton h-4 w-16 rounded" />
                                        <div className="skeleton h-4 w-16 rounded" />
                                        <div className="skeleton h-4 w-16 rounded" />
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <>
                            {/* Stat Cards */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                                <StatCard label={t.registros.details.consultDate} value={formatFecha(fecha)} borderColor="#b8d600" />
                                <StatCard label={t.registros.details.totalSteam} value={`${totals.steam.toFixed(2)} €`} borderColor="#5d79ae" />
                                <StatCard label={t.registros.details.totalGamerPay} value={`${totals.gamerPay.toFixed(2)} €`} borderColor="#ea8f3e" />
                                <StatCard label={t.registros.details.totalCSFloat} value={`${totals.csFloat.toFixed(2)} €`} borderColor="#ff6b35" />
                            </div>

                            {/* Table */}
                            {items.length === 0 ? (
                                <div className="text-center text-gray-400 py-8">{t.registros.details.noItems}</div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-white/8">
                                                <SortHeader label={t.registros.details.article} column="itemName" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} />
                                                <SortHeader label={t.registros.details.quantity} column="cantidad" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="center" />
                                                <SortHeader label="STEAM" column="precioSteam" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="right" />
                                                <SortHeader label="GAMERPAY" column="precioGamerPay" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="right" />
                                                <SortHeader label="CSFLOAT" column="precioCSFloat" currentColumn={sortColumn} direction={sortDirection} onSort={handleSort} align="right" />
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sortedItems.map((item, idx) => (
                                                <tr key={idx} className="border-b border-white/5 border-l-2 border-l-transparent hover:border-l-primary hover:bg-surface-elevated transition-colors">
                                                    <td className="py-3 px-4 text-white">{item.itemName}</td>
                                                    <td className="py-3 px-4 text-white text-center">{item.cantidad}</td>
                                                    <td className="py-3 px-4 text-white text-right" title={`${t.registros.details.totalTooltip}: ${item.totalSteam.toFixed(2)} €`}>
                                                        {item.precioSteam.toFixed(2)} €
                                                    </td>
                                                    <td className="py-3 px-4 text-white text-right" title={`${t.registros.details.totalTooltip}: ${item.totalGamerPay.toFixed(2)} €`}>
                                                        {item.precioGamerPay.toFixed(2)} €
                                                    </td>
                                                    <td className="py-3 px-4 text-white text-right" title={`${t.registros.details.totalTooltip}: ${item.totalCSFloat.toFixed(2)} €`}>
                                                        {item.precioCSFloat.toFixed(2)} €
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- Sub-components ---

interface StatCardProps {
    label: string;
    value: string;
    borderColor: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, borderColor }) => (
    <div className="bg-surface rounded-lg p-4 border border-white/8" style={{ borderTopColor: borderColor, borderTopWidth: "3px" }}>
        <div className="text-xs text-gray-400 font-semibold mb-1">{label}</div>
        <div className="text-white font-bold text-lg">{value}</div>
    </div>
);

interface SortHeaderProps {
    label: string;
    column: SortColumn;
    currentColumn: SortColumn | null;
    direction: SortDirection;
    onSort: (column: SortColumn) => void;
    align?: "left" | "center" | "right";
}

const SortHeader: React.FC<SortHeaderProps> = ({ label, column, currentColumn, direction, onSort, align = "left" }) => {
    const isActive = currentColumn === column;
    const indicator = isActive ? (direction === "asc" ? " ▲" : " ▼") : "";
    const alignClass = align === "right" ? "text-right" : align === "center" ? "text-center" : "text-left";

    return (
        <th className={`py-3 px-4 ${alignClass}`}>
            <button onClick={() => onSort(column)} className={`font-semibold text-xs tracking-wider cursor-pointer transition-colors ${isActive ? "text-primary" : "text-gray-400 hover:text-gray-200"}`}>
                {label}
                {indicator}
            </button>
        </th>
    );
};
