import React, {useState} from 'react'
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

    const handleForgotPassword = () => {
        // Implementa la lógica para recuperar contraseña
        console.log('Forgot password clicked')
    }

    const [accessRequested, setAccessRequested] = useState(false)

    const handleRequestAccess = (email: string) => {
        console.log('Request access for:', email)
        setAccessRequested(true)
    }


    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C]">
            <LoginForm
                onSubmit={handleSubmit}
                onForgotPassword={handleForgotPassword}
                onRequestAccess={handleRequestAccess}
                loading={isLoading}
                error={error}
                requestAccessSuccess={accessRequested}/>
        </div>
    )
}
