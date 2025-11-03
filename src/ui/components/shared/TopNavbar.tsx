import React from 'react'
import { useNavigate } from 'react-router-dom'

export const TopNavbar: React.FC = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <nav style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            backgroundColor: '#333',
            color: 'white'
        }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                Mi Aplicación
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <button
                    onClick={() => navigate('/home')}
                    style={{
                        background: 'none',
                        border: 'none',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Inicio
                </button>

                <button
                    onClick={handleLogout}
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#e74c3c',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '1rem'
                    }}
                >
                    Cerrar sesión
                </button>
            </div>
        </nav>
    )
}
