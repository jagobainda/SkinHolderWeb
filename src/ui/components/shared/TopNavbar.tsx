import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FiHome, FiFileText, FiPackage, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

export const TopNavbar: React.FC = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/')
        setIsMenuOpen(false)
    }

    const navItems = [
        { path: '/home', label: 'Inicio', icon: FiHome },
        { path: '/registros', label: 'Registros', icon: FiFileText },
        { path: '/items', label: 'Items', icon: FiPackage },
        { path: '/settings', label: 'Configuración', icon: FiUser }
    ]

    const isActive = (path: string) => location.pathname === path

    const handleNavigate = (path: string) => {
        navigate(path)
        setIsMenuOpen(false)
    }

    return (
        <nav className="bg-[#333333] border-b border-gray-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Botón hamburguesa (visible solo en móvil) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-gray-300 hover:text-primary transition-colors p-2"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                    </button>

                    {/* Logo y nombre (centrado en móvil) */}
                    <button
                        onClick={() => handleNavigate('/home')}
                        className="flex items-center gap-3 hover:opacity-80 transition-opacity lg:flex-none absolute left-1/2 transform -translate-x-1/2 lg:relative lg:left-auto lg:transform-none"
                    >
                        <img
                            src="/images/logo_login.png"
                            alt="Logo"
                            className="h-10 w-auto"
                        />
                        <span className="text-2xl font-bold text-primary">SkinHolder</span>
                    </button>

                    {/* Menú desktop */}
                    <div className="hidden lg:flex items-center gap-2">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <button
                                key={path}
                                onClick={() => navigate(path)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                                    isActive(path)
                                        ? 'bg-primary text-gray-900 font-semibold'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-primary'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{label}</span>
                            </button>
                        ))}

                        <div className="w-px h-8 bg-gray-700 mx-2" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>

                    {/* Espaciador para equilibrar el layout en móvil */}
                    <div className="lg:hidden w-10" />
                </div>

                {/* Menú móvil desplegable */}
                {isMenuOpen && (
                    <div className="lg:hidden py-4 space-y-2 border-t border-gray-700">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <button
                                key={path}
                                onClick={() => handleNavigate(path)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                    isActive(path)
                                        ? 'bg-primary text-gray-900 font-semibold'
                                        : 'text-gray-300 hover:bg-gray-700 hover:text-primary'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{label}</span>
                            </button>
                        ))}

                        <div className="h-px bg-gray-700 my-2" />

                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span>Cerrar sesión</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    )
}