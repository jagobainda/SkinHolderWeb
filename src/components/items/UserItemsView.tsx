import React, { useState, useEffect, useCallback, useMemo } from "react";
import { FiPackage } from "react-icons/fi";
import { getUserItems, addUserItem } from "@lib/userItems";
import { getItems } from "@lib/items";
import { useToast } from "@hooks/useToast";
import { getTranslations } from "@i18n/index";
import { ToastContainer } from "@components/shared/ToastContainer";
import { UserItemCard } from "./UserItemCard";
import type { UserItem, Item } from "@app-types/index";

function getUserIdFromCookie(): number | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(/(?:^|; )sh_userId=([^;]*)/);
    return match ? parseInt(decodeURIComponent(match[1]), 10) : null;
}

export const UserItemsView: React.FC = () => {
    const t = getTranslations();
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

    const selectedItem = useMemo(() => filteredItems.find(i => i.itemId === selectedItemId) ?? null, [filteredItems, selectedItemId]);

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
            csFloatMarketHashName: ""
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
            <main className="px-4 py-8 max-w-7xl mx-auto">
                {/* Search bar */}
                <div className="mb-6">
                    <input type="text" placeholder={ti.searchPlaceholder} value={searchText} onChange={e => setSearchText(e.target.value)} className="w-full max-w-md h-10 px-4 bg-surface-card border border-white/8 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:border-primary" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left panel — User items list */}
                    <div className="lg:col-span-2">
                        <h2 className="text-white font-semibold text-lg mb-4">{ti.myItems}</h2>

                        <div className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-1">
                            {isLoading ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="bg-surface-card rounded-lg border border-white/8 p-4 flex items-center gap-3">
                                            <div className="skeleton h-4 w-40 rounded" />
                                            <div className="ml-auto flex items-center gap-2">
                                                <div className="skeleton w-20 h-9 rounded-lg" />
                                                <div className="skeleton w-9 h-9 rounded-lg" />
                                                <div className="skeleton w-9 h-9 rounded-lg" />
                                                <div className="skeleton w-9 h-9 rounded-lg" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : filteredUserItems.length === 0 ? (
                                <p className="text-gray-500 text-sm">{ti.noUserItems}</p>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {filteredUserItems.map(ui => (
                                        <UserItemCard key={ui.useritemid} userItem={ui} onSaved={handleSaved} />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right panel — Add new item */}
                    <div>
                        <div className="bg-surface-card rounded-xl border border-white/8 p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <FiPackage className="text-primary" size={22} />
                                <h2 className="text-white font-semibold text-lg">{ti.newItem}</h2>
                            </div>

                            {/* Catalog listbox */}
                            <div className="mb-4">
                                <div className="border border-white/8 rounded-lg overflow-hidden">
                                    <div className="max-h-64 overflow-y-auto">
                                        {filteredItems.length === 0 ? (
                                            <p className="text-gray-500 text-sm p-3">{ti.noItemsFound}</p>
                                        ) : (
                                            filteredItems.map(item => (
                                                <button key={item.itemId} onClick={() => setSelectedItemId(item.itemId)} className={`w-full text-left px-3 py-2 text-sm transition-colors cursor-pointer ${selectedItemId === item.itemId ? "bg-primary/20 text-primary" : "text-white hover:bg-surface-elevated"}`}>
                                                    {item.nombre}
                                                </button>
                                            ))
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Quantity input */}
                            <div className="mb-4">
                                <label className="block text-gray-400 text-xs mb-1 uppercase">{ti.quantity}</label>
                                <input type="text" inputMode="numeric" value={newItemNum} onChange={handleNewItemNumChange} placeholder="0" maxLength={9} className="w-full h-10 px-4 bg-surface border border-white/8 rounded-lg text-white text-sm focus:outline-none focus:border-primary" />
                            </div>

                            {/* Add button */}
                            <button onClick={handleAddItem} className="w-full py-2.5 px-4 rounded-lg font-semibold bg-primary text-surface hover:bg-primary-hover transition-colors cursor-pointer">
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
