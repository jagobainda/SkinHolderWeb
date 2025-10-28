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
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 100 }}>
            <LoginForm onSubmit={handleSubmit} loading={isLoading} error={error} />
        </div>
    )
}
