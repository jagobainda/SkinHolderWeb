import React, { useState } from "react";
import { FiHome, FiFileText, FiPackage, FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import { getTranslations } from "@i18n/index";
import { signOut } from "@hooks/useAuth";

export const TopNavbar: React.FC = () => {
    const t = getTranslations();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: "/home", label: t.main.navbar.home, icon: FiHome },
        { path: "/registros", label: t.main.navbar.records, icon: FiFileText },
        { path: "/items", label: t.main.navbar.items, icon: FiPackage },
        { path: "/config", label: t.main.navbar.config, icon: FiUser },
    ];

    const isActive = (path: string) => window.location.pathname === path;

    const handleNavigate = (path: string) => {
        window.location.href = path;
    };

    const handleLogout = () => {
        setIsMenuOpen(false);
        signOut();
    };

    return (
        <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-700 bg-[#333333] shadow-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center lg:justify-between">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 text-gray-300 transition-colors hover:text-primary lg:hidden"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
                    </button>

                    <a
                        href="/home"
                        className="absolute left-1/2 flex -translate-x-1/2 items-center gap-3 transition-opacity hover:opacity-80 lg:static lg:translate-x-0"
                    >
                        <img src="/images/logo_login.png" alt="Logo" className="h-10 w-auto" />
                        <span className="text-2xl font-bold text-primary">SkinHolder</span>
                    </a>

                    <div className="hidden items-center gap-2 lg:flex">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <a
                                key={path}
                                href={path}
                                className={`flex min-w-fit items-center gap-2 rounded-lg px-4 py-2 transition-all duration-200 ${isActive(path) ? "bg-primary font-semibold text-gray-900" : "font-medium text-gray-300 hover:bg-gray-700 hover:text-primary"}`}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="whitespace-nowrap">{label}</span>
                            </a>
                        ))}

                        <div className="mx-2 h-8 w-px bg-gray-700" />

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-white transition-colors duration-200 hover:cursor-pointer hover:bg-red-700"
                        >
                            <FiLogOut className="h-5 w-5" />
                            <span>{t.main.navbar.logout}</span>
                        </button>
                    </div>

                    <div className="w-10 lg:hidden" />
                </div>

                {isMenuOpen && (
                    <div className="space-y-2 border-t border-gray-700 py-4 lg:hidden">
                        {navItems.map(({ path, label, icon: Icon }) => (
                            <a
                                key={path}
                                href={path}
                                onClick={() => setIsMenuOpen(false)}
                                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 transition-all duration-200 ${isActive(path) ? "bg-primary font-semibold text-gray-900" : "text-gray-300 hover:bg-gray-700 hover:text-primary"}`}
                            >
                                <Icon className="h-5 w-5" />
                                <span>{label}</span>
                            </a>
                        ))}

                        <div className="my-2 h-px bg-gray-700" />

                        <button
                            onClick={handleLogout}
                            className="flex w-full items-center gap-3 rounded-lg bg-red-600 px-4 py-3 text-white transition-colors duration-200 hover:bg-red-700"
                        >
                            <FiLogOut className="h-5 w-5" />
                            <span>{t.main.navbar.logout}</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};
