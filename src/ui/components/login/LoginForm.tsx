import React, { useState } from 'react'

type Props = {
    onSubmit: (username: string, password: string) => void
    loading: boolean
    error: string | null
}

export const LoginForm: React.FC<Props> = ({ onSubmit, loading, error }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(username, password)
    }

    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-primary rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

            <div className="relative bg-[#333333] rounded-2xl p-8">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
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
                        className="px-4 py-2 border text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />

                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="px-4 py-2 border text-gray-200 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />

                    <div className="h-5 flex items-center justify-center">
                        {error && <span className="text-red-500 text-sm">{error}</span>}
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="px-4 py-2 bg-primary text-gray-700 rounded-lg hover:bg-primary-hover active:bg-primary-active disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            'Iniciar sesión'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}
