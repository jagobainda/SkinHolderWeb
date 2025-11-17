import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiFileText, FiPackage, FiUser, FiLogOut } from 'react-icons/fi'

export const TopNavbar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    const navItems = [
        { path: '/home', label: 'Inicio', icon: FiHome },
        { path: '/registros', label: 'Registros', icon: FiFileText },
        { path: '/items', label: 'Items', icon: FiPackage },
        { path: '/settings', label: 'Configuración', icon: FiUser }
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <nav className="bg-[#333333] border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <button
                        onClick={() => navigate('/home')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity hover:cursor-pointer"
                    >
                        <img
                            src="/images/logo_login.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                        <span className="text-2xl font-bold text-primary">SkinHolder</span>
                    </button>

                    <div className="flex items-center gap-2">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <button
                                key={path}
                                onClick={() => navigate(path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:cursor-pointer ${
                                    isActive(path)
                                        ? 'bg-primary text-gray-900 font-semibold'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-primary'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="hidden sm:inline">{label}</span>
                            </button>
                        ))}

                        <div className="w-px h-8 bg-gray-700 mx-2" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200 hover:cursor-pointer"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span className="hidden sm:inline">Cerrar sesión</span>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}