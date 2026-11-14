import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FiPackage } from "react-icons/fi";
import { getUserItems, addUserItem } from "@lib/userItems";
import { getItems } from "@lib/items";
import { useToast } from "@hooks/useToast";
import { getTranslations } from "@i18n/index";
import type { Lang } from "@i18n/index";
import { ToastContainer } from "@components/shared/ToastContainer";
import { UserItemCard } from "./UserItemCard";
import type { UserItem, Item } from "@app-types/index";

function getUserIdFromCookie(): number | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|; )sh_userId=([^;]*)/);
    return match ? parseInt(decodeURIComponent(match[1]), 10) : null;
}

export const UserItemsView: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = getTranslations(lang);
    const { toasts, showToast, removeToast } = useToast();

    const [userItems, setUserItems] = useState<UserItem[]>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [searchText, setSearchText] = useState("");
    const [newItemNum, setNewItemNum] = useState("");
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const loadData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [ui, it] = await Promise.all([getUserItems(), getItems()]);
            setUserItems(ui);
            setItems(it);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const filteredUserItems = useMemo(() => {
        if (!searchText.trim()) return userItems;
        const q = searchText.toLowerCase();
        return userItems.filter(ui => ui.itemName?.toLowerCase().includes(q));
    }, [userItems, searchText]);

    const filteredItems = useMemo(() => {
        if (!searchText.trim()) return items;
        const q = searchText.toLowerCase();
        return items.filter(i => i.nombre?.toLowerCase().includes(q));
    }, [items, searchText]);

    const selectedItem = useMemo(
        () => filteredItems.find(i => i.itemId === selectedItemId) ?? null,
        [filteredItems, selectedItemId],
    );

    const handleAddItem = useCallback(async () => {
        const ti = t.items;

        if (items.length === 0) {
            showToast("danger", "Error", ti.noItemsAvailable);
            return;
        }
        if (!selectedItem) {
            showToast("warning", "Error", ti.selectItem);
            return;
        }
        if (userItems.some(ui => ui.itemid === selectedItem.itemId)) {
            showToast("info", ti.info, ti.alreadyOwned);
            return;
        }
        const cantidad = parseInt(newItemNum, 10);
        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            showToast("danger", "Error", ti.invalidQuantity);
            return;
        }

        const userId = getUserIdFromCookie();
        if (!userId) {
            showToast("danger", "Error", "User not found");
            return;
        }

        const newUserItem: UserItem = {
            useritemid: 0,
            itemid: selectedItem.itemId,
            userid: userId,
            cantidad,
            itemName: selectedItem.nombre,
            steamHashName: selectedItem.hashNameSteam ?? "",
            gamerPayName: selectedItem.gamerPayNombre ?? "",
            csFloatMarketHashName: "",
        };

        const success = await addUserItem(newUserItem);
        if (success) {
            setSearchText("");
            setNewItemNum("");
            setSelectedItemId(null);
            await loadData();
            showToast("success", ti.success, ti.itemAdded);
        } else {
            showToast("danger", "Error", ti.addError);
        }
    }, [items, selectedItem, userItems, newItemNum, loadData, showToast, t]);

    const handleNewItemNumChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.replace(/\D/g, "").slice(0, 9);
        setNewItemNum(val);
    }, []);

    const handleSaved = useCallback(() => {
        loadData();
    }, [loadData]);

    const ti = t.items;

    return (
        <div className="min-h-screen pt-16">
            <main className="mx-auto max-w-7xl px-4 py-8">
                {/* Search bar */}
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder={ti.searchPlaceholder}
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        className="h-10 w-full max-w-md rounded-lg border border-white/8 bg-surface-card px-4 text-sm text-white placeholder-gray-500 focus:border-primary focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Left panel — User items list */}
                    <div className="lg:col-span-2">
                        <h2 className="mb-4 text-lg font-semibold text-white">{ti.myItems}</h2>

                        <div className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
                            {isLoading ? (
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {[...Array(6)].map((_, i) => (
                                        <div
                                            key={i}
                                            className="flex items-center gap-3 rounded-lg border border-white/8 bg-surface-card p-4"
                                        >
                                            <div className="skeleton h-4 w-40 rounded" />
                                            <div className="ml-auto flex items-center gap-2">
                                                <div className="skeleton h-9 w-20 rounded-lg" />
                                                <div className="skeleton h-9 w-9 rounded-lg" />
                                                <div className="skeleton h-9 w-9 rounded-lg" />
                                                <div className="skeleton h-9 w-9 rounded-lg" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredUserItems.length === 0 ? (
                                <p className="text-sm text-gray-500">{ti.noUserItems}</p>
                            ) : (
                                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {filteredUserItems.map(ui => (
                                        <UserItemCard key={ui.useritemid} userItem={ui} onSaved={handleSaved} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right panel — Add new item */}
                    <div>
                        <div className="rounded-xl border border-white/8 bg-surface-card p-6">
                            <div className="mb-6 flex items-center gap-3">
                                <FiPackage className="text-primary" size={22} />
                                <h2 className="text-lg font-semibold text-white">{ti.newItem}</h2>
                            </div>

                            {/* Catalog listbox */}
                            <div className="mb-4">
                                <div className="overflow-hidden rounded-lg border border-white/8">
                                    <div className="max-h-64 overflow-y-auto">
                                        {filteredItems.length === 0 ? (
                                            <p className="p-3 text-sm text-gray-500">{ti.noItemsFound}</p>
                                        ) : (
                                            filteredItems.map((item, index) => (
                                                <button
                                                    key={`${item.itemId}-${index}`}
                                                    onClick={() => setSelectedItemId(item.itemId)}
                                                    className={`w-full cursor-pointer px-3 py-2 text-left text-sm transition-colors ${selectedItemId === item.itemId ? "bg-primary/20 text-primary" : "text-white hover:bg-surface-elevated"}`}
                                                >
                                                    {item.nombre}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quantity input */}
                            <div className="mb-4">
                                <label className="mb-1 block text-xs text-gray-400 uppercase">{ti.quantity}</label>
                                <input
                                    type="text"
                                    inputMode="numeric"
                                    value={newItemNum}
                                    onChange={handleNewItemNumChange}
                                    placeholder="0"
                                    maxLength={9}
                                    className="h-10 w-full rounded-lg border border-white/8 bg-surface px-4 text-sm text-white focus:border-primary focus:outline-none"
                                />
                            </div>

                            {/* Add button */}
                            <button
                                onClick={handleAddItem}
                                className="w-full cursor-pointer rounded-lg bg-primary px-4 py-2.5 font-semibold text-surface transition-colors hover:bg-primary-hover"
                            >
                                {ti.addItem}
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
};
