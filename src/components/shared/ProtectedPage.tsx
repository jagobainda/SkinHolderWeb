import React, { useEffect } from "react";
import { useAuth } from "@hooks/useAuth";
import { LoadingScreen } from "./LoadingScreen";

interface Props {
    children: React.ReactNode;
}

export const ProtectedPage: React.FC<Props> = ({ children }) => {
    const { isAuthenticated, isChecking, checkAuth } = useAuth();

    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    if (isChecking) return <LoadingScreen />;

    if (!isAuthenticated) {
        window.location.href = "/";
        return <LoadingScreen />;
    }

    return <>{children}</>;
};
