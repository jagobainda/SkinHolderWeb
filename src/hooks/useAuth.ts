import { create } from "zustand";
import { validate, logout } from "@lib/auth";

interface AuthState {
    isAuthenticated: boolean;
    isChecking: boolean;
    username: string | null;
    checkAuth: () => Promise<void>;
    signOut: () => void;
}

export const useAuth = create<AuthState>(set => ({
    isAuthenticated: false,
    isChecking: true,
    username: typeof localStorage !== "undefined" ? localStorage.getItem("username") : null,

    checkAuth: async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            set({ isAuthenticated: false, isChecking: false });
            return;
        }

        const isValid = await validate();

        if (!isValid) {
            localStorage.removeItem("token");
            set({ isAuthenticated: false, isChecking: false, username: null });
        } else {
            set({
                isAuthenticated: true,
                isChecking: false,
                username: localStorage.getItem("username")
            });
        }
    },

    signOut: () => {
        logout();
        set({ isAuthenticated: false, isChecking: false, username: null });
        window.location.href = "/";
    }
}));
