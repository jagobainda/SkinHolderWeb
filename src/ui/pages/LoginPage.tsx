import React from 'react'
import { useLoginViewModel } from '@presentation/viewmodels/useLoginViewModel'
import { LoginForm } from '@ui/components/login/LoginForm.tsx'
import { useNavigate } from 'react-router-dom'

export const LoginPage: React.FC = () => {
    const { login, isLoading, error } = useLoginViewModel()
    const navigate = useNavigate()

    const handleSubmit = async (username: string, password: string) => {
        const result = await login({ username, password })
        if (result) navigate('/home')
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]">
            <LoginForm onSubmit={handleSubmit} loading={isLoading} error={error} />
        </div>
    )
}
