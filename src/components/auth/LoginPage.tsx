import React, { useEffect } from "react";
import { useLogin } from "@hooks/useLogin";
import { useToast } from "@hooks/useToast";
import { validate, getCookie } from "@lib/auth";
import { LoginForm } from "./LoginForm";
import { ToastContainer } from "@components/shared/ToastContainer";

export const LoginPage: React.FC = () => {
    const { login, requestAccess, isLoading, requestAccessLoading } = useLogin();
    const { toasts, showToast, removeToast } = useToast();

    useEffect(() => {
        const checkToken = async () => {
            const token = getCookie("sh_token");

            if (token) {
                const isValid = await validate();

                if (isValid) {
                    window.location.href = "/home";
                } else {
                    document.cookie = "sh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
                }
            }
        };

        checkToken().catch(error => {
            console.error("Error validating token:", error);
            document.cookie = "sh_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax";
        });
    }, []);

    const handleSubmit = async (username: string, password: string) => {
        const result = await login({ username, password }, showToast);
        if (result) window.location.href = "/home";
    };

    const handleForgotPassword = () => {
        showToast("info", "Acceso Restringido", "Contacta con soporte en skinholder@jagoba.dev");
    };

    const handleRequestAccess = async (email: string) => {
        return await requestAccess(email, showToast);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <LoginForm onSubmit={handleSubmit} onForgotPassword={handleForgotPassword} onRequestAccess={handleRequestAccess} loading={isLoading} requestAccessLoading={requestAccessLoading} />
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    );
};
