import React, { useEffect } from 'react'
import { useLoginViewModel } from '@presentation/viewmodels/useLoginViewModel'
import { LoginForm } from '@ui/components/login/LoginForm.tsx'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@ui/hooks/useToast'
import { ToastContainer } from '@ui/components/shared/ToastContainer'
import { AuthApi } from "@data/datasources/AuthApi.ts";
import {useDocumentTitle} from "@ui/hooks/useDocumentTitle.ts";

export const LoginPage: React.FC = () => {
    const { login, requestAccess, isLoading, requestAccessLoading } = useLoginViewModel()
    const { toasts, showToast, removeToast } = useToast()
    const navigate = useNavigate()

    useDocumentTitle("SkinHolder - Login")

    useEffect(() => {
        const checkToken = async () => {
            const token = localStorage.getItem('token')

            if (token) {
                const isValid = await AuthApi.validate()

                if (isValid) {
                    navigate('/home')
                } else {
                    localStorage.removeItem('token')
                }
            }
        }

        checkToken().catch(error => {
            console.error('Error validating token:', error)
            localStorage.removeItem('token')
        })
    }, [navigate])

    const handleSubmit = async (username: string, password: string) => {
        const result = await login({ username, password }, showToast)
        if (result) navigate('/home')
    }

    const handleForgotPassword = () => {
        console.log('Forgot password clicked')
    }

    const handleRequestAccess = async (email: string) => {
        return await requestAccess(email, showToast)
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
