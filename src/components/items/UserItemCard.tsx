import React, { useState, useEffect, useCallback } from "react";
import { FiMinus, FiPlus, FiSave } from "react-icons/fi";
import { updateUserItem } from "@lib/userItems";
import type { UserItem } from "@app-types/index";

interface UserItemCardProps {
    userItem: UserItem;
    onSaved: () => void;
}

export const UserItemCard: React.FC<UserItemCardProps> = ({ userItem, onSaved }) => {
    const [cantidad, setCantidad] = useState(userItem.cantidad);
    const [isBusy, setIsBusy] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        setCantidad(userItem.cantidad);
    }, [userItem.cantidad]);

    const isDirty = cantidad !== userItem.cantidad;

    const handleDecrement = useCallback(() => {
        setCantidad(prev => Math.max(1, prev - 1));
    }, []);

    const handleIncrement = useCallback(() => {
        setCantidad(prev => prev + 1);
    }, []);

    const handleCantidadChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 9);
        setCantidad(val === "" ? 0 : parseInt(val, 10));
    }, []);

    const handleSave = useCallback(async () => {
        setIsBusy(true);
        try {
            const success = await updateUserItem(userItem, cantidad);
            setSaveStatus(success ? "success" : "error");
            setTimeout(() => {
                setSaveStatus("idle");
                if (success) onSaved();
            }, 1000);
        } catch {
            setSaveStatus("error");
            setTimeout(() => setSaveStatus("idle"), 1000);
        } finally {
            setIsBusy(false);
        }
    }, [userItem, cantidad, onSaved]);

    const nameColor = saveStatus === "success" ? "text-primary" : saveStatus === "error" ? "text-red-400" : isDirty ? "text-primary" : "text-white";

    return (
        <div className="bg-surface-card rounded-lg border border-white/8 p-3 flex items-center gap-3 min-h-[3.6rem]">
            <span onClick={() => setExpanded(prev => !prev)} className={`font-medium text-sm transition-colors duration-200 min-w-0 flex-1 cursor-pointer ${expanded ? "" : "truncate"} ${nameColor}`}>
                {userItem.itemName}
            </span>
            {!expanded && (
                <div className="flex items-center gap-1.5 shrink-0">
                    <input type="text" inputMode="numeric" value={cantidad} onChange={handleCantidadChange} maxLength={9} disabled={isBusy} className="w-16 h-8 text-center bg-surface border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-primary disabled:opacity-50" />
                    <button onClick={handleDecrement} disabled={isBusy} className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface border border-white/8 text-white hover:bg-surface-elevated transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                        <FiMinus size={13} />
                    </button>
                    <button onClick={handleIncrement} disabled={isBusy} className="h-8 w-8 flex items-center justify-center rounded-lg bg-surface border border-white/8 text-white hover:bg-surface-elevated transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                        <FiPlus size={13} />
                    </button>
                    <button onClick={handleSave} disabled={isBusy || !isDirty} className="h-8 w-8 flex items-center justify-center rounded-lg bg-primary text-surface font-bold hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                        <FiSave size={13} />
                    </button>
                </div>
            )}
        </div>
    );
};
