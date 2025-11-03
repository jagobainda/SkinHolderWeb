import { Routes, Route } from 'react-router-dom'
import { LoginPage } from '@ui/pages/LoginPage'
import { MainPage } from '@ui/pages/MainPage'
import { ProtectedRoute } from "@ui/components/shared/ProtectedRoute.tsx"

export const Router = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
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