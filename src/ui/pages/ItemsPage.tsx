import React from 'react'
import { TopNavbar } from '@ui/components/shared/TopNavbar'
import { useDocumentTitle } from "@ui/hooks/useDocumentTitle.ts"
import {useTranslation} from "@ui/hooks/useTranslation.ts";

export const ItemsPage: React.FC = () => {
    const { t } = useTranslation()
    useDocumentTitle(`SkinHolder - ${t.main.navbar.items}`)

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C] pt-16">
            <TopNavbar />

            <main className="flex items-center justify-center min-h-[calc(100vh-4rem)] px-4 py-8">

            </main>
        </div>
    )
}