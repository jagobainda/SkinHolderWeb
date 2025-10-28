import './LoginForm.module.css'
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <input
                placeholder="Usuario"
                value={username}
                onChange={e => setUsername(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={e => setPassword(e.target.value)}
            />
            {error && <span style={{ color: 'red' }}>{error}</span>}
            <button type="submit" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
            </button>
        </form>
    )
}
