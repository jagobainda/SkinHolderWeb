import React from 'react'
import { TopNavbar } from '@ui/components/shared/TopNavbar'
import { useDocumentTitle } from "@ui/hooks/useDocumentTitle.ts";

export const MainPage: React.FC = () => {
    useDocumentTitle("SkinHolder - Resumen")

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]">
            <TopNavbar />
            <main style={{ padding: '2rem' }}>
                <h1>Bienvenido</h1>
                <p>Esta es la página principal de la aplicación.</p>
            </main>
        </div>
    )
}