import React from 'react'
import { FaGithub } from 'react-icons/fa'

interface Translations {
    about: {
        clients: string
        webClient: string
        androidClient: string
        desktopClient: string
        backend: string
        backendDesc: string
        database: string
        databaseDesc: string
    }
}

interface ArchitectureDiagramProps {
    t: Translations
}

export const ArchitectureDiagram: React.FC<ArchitectureDiagramProps> = ({ t }) => (
    <div className="bg-[#2C2C2C] rounded-xl p-8">
        <div className="flex flex-col items-center space-y-6">
            <div className="flex gap-4 justify-center flex-wrap">
                <div className="bg-[#1a1a1a] border-2 border-steam rounded-lg px-6 py-3 hover:scale-105 transition-transform">
                    <div className="text-steam font-semibold text-sm">Steam API</div>
                </div>
                <div className="bg-[#1a1a1a] border-2 border-gamerpay rounded-lg px-6 py-3 hover:scale-105 transition-transform">
                    <div className="text-gamerpay font-semibold text-sm">GamerPay API</div>
                </div>
                <div className="bg-[#1a1a1a] border-2 border-csfloat rounded-lg px-6 py-3 hover:scale-105 transition-transform">
                    <div className="text-csfloat font-semibold text-sm">CSFloat API</div>
                </div>
            </div>

            <div className="text-primary text-2xl">↓</div>

            <div className="w-full max-w-5xl">
                <h3 className="text-2xl font-bold text-primary mb-6 text-center">{t.about.clients}</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-cyan-900/30 to-cyan-700/30 border-2 border-cyan-500 rounded-lg p-6 hover:scale-105 transition-transform relative">
                        <a
                            href="https://github.com/jagobainda/SkinHolderWeb"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-3 right-3 text-cyan-400 hover:text-cyan-300 transition-colors"
                        >
                            <FaGithub className="text-xl text-white hover:text-black transition-colors duration-200" />
                        </a>
                        <div className="text-4xl mb-3 text-center">🌐</div>
                        <h4 className="text-cyan-400 font-semibold text-center mb-2">{t.about.webClient}</h4>
                        <div className="flex flex-wrap gap-2 justify-center mt-3">
                            <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">React</span>
                            <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">TypeScript</span>
                            <span className="text-xs bg-cyan-900/50 text-cyan-300 px-2 py-1 rounded">Tailwind 4</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-900/30 to-green-700/30 border-2 border-green-500 rounded-lg p-6 hover:scale-105 transition-transform relative">
                        <a
                            href="https://github.com/jagobainda/SkinHolderApp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-3 right-3 text-green-400 hover:text-green-300 transition-colors"
                        >
                            <FaGithub className="text-xl text-white hover:text-black transition-colors duration-200" />
                        </a>
                        <div className="text-4xl mb-3 text-center">📱</div>
                        <h4 className="text-green-400 font-semibold text-center mb-2">{t.about.androidClient}</h4>
                        <div className="flex flex-wrap gap-2 justify-center mt-3">
                            <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">Kotlin</span>
                            <span className="text-xs bg-green-900/50 text-green-300 px-2 py-1 rounded">Jetpack Compose</span>
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-700/30 border-2 border-indigo-500 rounded-lg p-6 hover:scale-105 transition-transform relative">
                        <a
                            href="https://github.com/jagobainda/SkinHolderDesktop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute top-3 right-3 text-indigo-400 hover:text-indigo-300 transition-colors"
                        >
                            <FaGithub className="text-xl text-white hover:text-black transition-colors duration-200" />
                        </a>
                        <div className="text-4xl mb-3 text-center">💻</div>
                        <h4 className="text-indigo-400 font-semibold text-center mb-2">{t.about.desktopClient}</h4>
                        <div className="flex flex-wrap gap-2 justify-center mt-3">
                            <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">WPF</span>
                            <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">.NET 8</span>
                            <span className="text-xs bg-indigo-900/50 text-indigo-300 px-2 py-1 rounded">MVVM</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-primary text-2xl">↕</div>

            <div className="w-full max-w-4xl">
                <div className="bg-gradient-to-r from-purple-900/30 to-purple-700/30 border-2 border-purple-500 rounded-lg p-6 hover:scale-105 transition-transform relative">
                    <a
                        href="https://github.com/jagobainda/SkinHolderAPI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute top-3 right-3 text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <FaGithub className="text-xl text-white hover:text-black transition-colors duration-200" />
                    </a>
                    <h3 className="text-xl font-bold text-purple-400 mb-3 text-center">{t.about.backend}</h3>
                    <p className="text-gray-300 text-sm text-center mb-4">{t.about.backendDesc}</p>
                    <div className="flex justify-center">
                        <div className="bg-[#1a1a1a] border border-purple-400 rounded px-4 py-2">
                            <span className="text-purple-300 font-mono text-sm">.NET 8 RESTful API</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-primary text-2xl">↕</div>

            <div className="bg-gradient-to-r from-orange-900/30 to-orange-700/30 border-2 border-orange-500 rounded-lg px-8 py-4 hover:scale-105 transition-transform">
                <h3 className="text-xl font-bold text-orange-400 mb-2 text-center">{t.about.database}</h3>
                <p className="text-gray-300 text-sm text-center mb-2">{t.about.databaseDesc}</p>
                <div className="flex justify-center">
                    <span className="text-orange-300 font-mono text-sm">MySQL 8.0</span>
                </div>
            </div>
        </div>
    </div>
)