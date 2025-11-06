import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@ui/pages/LoginPage'
import { MainPage } from '@ui/pages/MainPage'
import { ProtectedRoute } from "@ui/components/shared/ProtectedRoute.tsx"
import { AboutPage } from "@ui/pages/AboutPage.tsx";

export const Router = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
            path="/home"
            element={
                <ProtectedRoute>
                    <MainPage />
                </ProtectedRoute>
            }
        />
    </Routes>
)