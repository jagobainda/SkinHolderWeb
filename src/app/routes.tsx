import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@ui/pages/LoginPage'
import { MainPage } from '@ui/pages/MainPage'
import { RegistrosPage } from '@ui/pages/RegistrosPage'
import { ItemsPage } from '@ui/pages/ItemsPage'
import { ConfigPage } from '@ui/pages/ConfigPage'
import { ProtectedRoute } from "@ui/components/shared/ProtectedRoute.tsx"
import { AboutPage } from "@ui/pages/AboutPage.tsx"

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
        <Route
            path="/registros"
            element={
                <ProtectedRoute>
                    <RegistrosPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/items"
            element={
                <ProtectedRoute>
                    <ItemsPage />
                </ProtectedRoute>
            }
        />
        <Route
            path="/config"
            element={
                <ProtectedRoute>
                    <ConfigPage />
                </ProtectedRoute>
            }
        />
    </Routes>
)