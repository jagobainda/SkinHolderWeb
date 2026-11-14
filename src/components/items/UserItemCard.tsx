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

    const nameColor =
        saveStatus === "success"
            ? "text-primary"
            : saveStatus === "error"
              ? "text-red-400"
              : isDirty
                ? "text-primary"
                : "text-white";

    return (
        <div className="flex min-h-[3.6rem] items-center gap-3 rounded-lg border border-white/8 bg-surface-card p-3">
            <span
                onClick={() => setExpanded(prev => !prev)}
                className={`min-w-0 flex-1 cursor-pointer text-sm font-medium transition-colors duration-200 ${expanded ? "" : "truncate"} ${nameColor}`}
            >
                {userItem.itemName}
            </span>
            {!expanded && (
                <div className="flex shrink-0 items-center gap-1.5">
                    <input
                        type="text"
                        inputMode="numeric"
                        value={cantidad}
                        onChange={handleCantidadChange}
                        maxLength={9}
                        disabled={isBusy}
                        className="h-8 w-16 rounded-lg border border-white/8 bg-surface text-center text-sm text-white focus:border-primary focus:outline-none disabled:opacity-50"
                    />
                    <button
                        onClick={handleDecrement}
                        disabled={isBusy}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/8 bg-surface text-white transition-colors hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiMinus size={13} />
                    </button>
                    <button
                        onClick={handleIncrement}
                        disabled={isBusy}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-white/8 bg-surface text-white transition-colors hover:bg-surface-elevated disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiPlus size={13} />
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={isBusy || !isDirty}
                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-primary font-bold text-surface transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        <FiSave size={13} />
                    </button>
                </div>
            )}
        </div>
    );
};
