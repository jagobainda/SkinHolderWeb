import React from "react";
import { ProtectedPage } from "@components/shared/ProtectedPage";
import { TopNavbar } from "@components/shared/TopNavbar";

export const ConfigPage: React.FC = () => {
    return (
        <ProtectedPage>
            <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C] pt-16">
                <TopNavbar />
                <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">
                    <span className="text-white text-xl">Configuración — coming soon</span>
                </main>
            </div>
        </ProtectedPage>
    );
};
