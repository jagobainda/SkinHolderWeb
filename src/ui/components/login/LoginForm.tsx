import React, { useState } from 'react'
import { Link } from "react-router-dom";

type Props = {
    onSubmit: (username: string, password: string) => void
    onForgotPassword: () => void
    onRequestAccess: (email: string) => Promise<boolean>
    loading: boolean
    requestAccessLoading?: boolean
    requestAccessSuccess?: boolean
}

export const LoginForm: React.FC<Props> = ({ onSubmit, onForgotPassword, onRequestAccess, loading, requestAccessLoading = false }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showRegisterPanel, setShowRegisterPanel] = useState(false)
    const [email, setEmail] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(username, password)
    }

    const handleRequestAccess = async (e: React.FormEvent) => {
        e.preventDefault()

        if (await onRequestAccess(email)) setEmail('')
    }


    return (
        <div className="flex flex-col lg:flex-row gap-8 items-center py-8 lg:py-0">
            <div className="flex flex-col items-center gap-4">
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-primary rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

                    <div className="relative bg-[#333333] rounded-2xl p-8 w-88">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative w-full mb-6 flex justify-center">
                                <div className="relative">
                                    <img
                                        src="/images/logo_login.png"
                                        alt="Logo"
                                        className="h-52 w-auto"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h1 className="text-4xl font-bold text-primary drop-shadow-lg">
                                            SKINHOLDER
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <input
                                placeholder="Usuario"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="px-4 py-2 border text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent"
                            />

                            <input
                                type="password"
                                placeholder="Contraseña"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="px-4 py-2 border text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent"
                            />

                            <button
                                type="button"
                                onClick={onForgotPassword}
                                className="text-primary text-sm hover:underline hover:cursor-pointer self-center"
                            >
                                ¿Olvidaste tu contraseña?
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-2 bg-primary text-gray-700 rounded-lg hover:bg-primary-hover active:bg-primary-active disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer transition-colors flex items-center justify-center min-h-[42px]"
                            >
                                {loading ? (<div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>) : ('Iniciar sesión')}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowRegisterPanel(!showRegisterPanel)}
                                className="text-gray-400 text-sm hover:text-primary hover:cursor-pointer transition-colors"
                            >
                                ¿No tienes acceso? Solicítalo aquí
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex justify-between text-sm w-full px-2">
                    <Link to="/about" className="text-primary hover:text-primary-hover transition-colors">
                        About SkinHolder
                    </Link>
                    <a href="https://jagoba.dev" className="text-primary hover:text-primary-hover transition-colors">
                        Made by jagoba.dev
                    </a>
                </div>
            </div>

            {showRegisterPanel && (
                <div className="group relative">
                    <div className="absolute -inset-0.5 bg-primary rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

                    <div className="relative bg-[#333333] rounded-2xl p-8 w-88">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-primary">Solicitar Acceso</h2>
                            <button
                                onClick={() => setShowRegisterPanel(false)}
                                className="text-gray-400 hover:text-gray-200 hover:cursor-pointer text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="text-gray-300 text-sm mb-2">
                                Esta es una herramienta privada.
                            </p>
                            <p className="text-gray-400 text-xs">
                                Introduce tu email para solicitar acceso. Te enviaremos las credenciales una vez que tu solicitud sea aprobada.
                            </p>
                        </div>

                        <form onSubmit={handleRequestAccess} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="tu@email.com"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="px-4 py-2 border text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-transparent"
                            />

                            <button
                                type="submit"
                                disabled={requestAccessLoading}
                                className="px-4 py-2 bg-primary text-gray-700 rounded-lg hover:bg-primary-hover active:bg-primary-active disabled:bg-gray-400 disabled:cursor-not-allowed hover:cursor-pointer transition-colors flex items-center justify-center min-h-[42px]"
                            >
                                {requestAccessLoading ? (<div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>) : ('Solicitar Acceso')}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}
