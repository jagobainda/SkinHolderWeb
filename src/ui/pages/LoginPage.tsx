import React from 'react'
import { useLoginViewModel } from '@presentation/viewmodels/useLoginViewModel'
import { LoginForm } from '@ui/components/login/LoginForm.tsx'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@ui/hooks/useToast'
import { ToastContainer } from '@ui/components/shared/ToastContainer'

export const LoginPage: React.FC = () => {
    const { login, requestAccess, isLoading, requestAccessLoading } = useLoginViewModel()
    const { toasts, showToast, removeToast } = useToast()
    const navigate = useNavigate()

    const handleSubmit = async (username: string, password: string) => {
        const result = await login({ username, password }, showToast)
        if (result) navigate('/home')
    }

    const handleForgotPassword = () => {
        console.log('Forgot password clicked')
    }

    const handleRequestAccess = async (email: string) => {
        await requestAccess(email, showToast)
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]">
            <LoginForm
                onSubmit={handleSubmit}
                onForgotPassword={handleForgotPassword}
                onRequestAccess={handleRequestAccess}
                loading={isLoading}
                requestAccessLoading={requestAccessLoading}
            />
            <ToastContainer toasts={toasts} onRemove={removeToast} />
        </div>
    )
}
