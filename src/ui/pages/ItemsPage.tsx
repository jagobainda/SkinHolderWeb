import React from 'react'
import { TopNavbar } from '@ui/components/shared/TopNavbar'
import { useDocumentTitle } from "@ui/hooks/useDocumentTitle.ts"

export const ItemsPage: React.FC = () => {
    useDocumentTitle("SkinHolder - Items")

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]">
            <TopNavbar />

            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">

            </main>
        </div>
    )
}