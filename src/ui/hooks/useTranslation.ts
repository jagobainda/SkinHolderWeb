import { useMemo } from 'react'

const translations = {
    es: {
        login: {
            title: 'SKINHOLDER',
            username: 'Usuario',
            password: 'Contraseña',
            forgotPassword: '¿Olvidaste tu contraseña?',
            loginButton: 'Iniciar sesión',
            noAccess: '¿No tienes acceso? Solicítalo aquí',
            requestAccessTitle: 'Solicitar Acceso',
            requestAccessDescription: 'Esta es una herramienta privada.',
            requestAccessSubtitle: 'Introduce tu email para solicitar acceso. Te enviaremos las credenciales una vez que tu solicitud sea aprobada.',
            emailPlaceholder: 'tu@email.com',
            requestAccessButton: 'Solicitar Acceso',
            aboutLink: 'About SkinHolder',
            madeBy: 'Made by jagoba.dev',
        },
        about: {
            title: 'SKINHOLDER',
            subtitle: 'Seguimiento técnico de inversiones en skins de CS2',
            whatIs: '¿Qué es SkinHolder?',
            whatIsDescription: 'SkinHolder es una herramienta de análisis y seguimiento de inversiones en Counter-Strike 2. Está diseñada específicamente para gestionar skins, cajas, pegatinas y cápsulas que se mantienen en inventario a largo plazo. Ofrece métricas detalladas, históricos de precios y análisis de rentabilidad para inversores que buscan maximizar el valor de sus activos digitales.',
            features: 'Características técnicas',
            feature1: 'Análisis histórico de precios y tendencias de mercado',
            feature2: 'Cálculo automático de ROI y rentabilidad por ítem',
            feature3: 'Seguimiento de variaciones de valor en tiempo real',
            feature4: 'Alertas de cambios significativos en el mercado',
            feature5: 'Sincronización periódica con Steam API',
            architecture: 'Arquitectura del sistema',
            architectureDesc: 'Arquitectura cliente-servidor de tres capas con múltiples frontends:',
            backend: 'Backend',
            backendDesc: 'API RESTful en .NET 8 con Clean Architecture, implementando patrón Repository, Entity Framework Core, AutoMapper para mapeo de DTOs, autenticación JWT y Rate Limiting.',
            database: 'Base de datos',
            databaseDesc: 'MySQL 8.0 con optimización de índices para consultas de alto rendimiento en históricos de precios.',
            clients: 'Clientes',
            webClient: 'WEB CLIENT',
            androidClient: 'ANDROID APP',
            desktopClient: 'WINDOWS DESKTOP',
            dataFlow: 'Flujo de datos',
            steamApi: 'Steam API',
            syncProcess: 'Proceso de sincronización automática cada 24h',
            backToLogin: 'Volver al Login',
            madeBy: 'Made by jagoba.dev',
        },
        main: {
            // TODO
        }
    },
    en: {
        login: {
            title: 'SKINHOLDER',
            username: 'Username',
            password: 'Password',
            forgotPassword: 'Forgot your password?',
            loginButton: 'Sign in',
            noAccess: "Don't have access? Request it here",
            requestAccessTitle: 'Request Access',
            requestAccessDescription: 'This is a private tool.',
            requestAccessSubtitle: 'Enter your email to request access. We will send you the credentials once your request is approved.',
            emailPlaceholder: 'your@email.com',
            requestAccessButton: 'Request Access',
            aboutLink: 'About SkinHolder',
            madeBy: 'Made by jagoba.dev',
        },
        about: {
            title: 'SKINHOLDER',
            subtitle: 'Technical tracking of CS2 skin investments',
            whatIs: 'What is SkinHolder?',
            whatIsDescription: 'SkinHolder is an analysis and tracking tool for Counter-Strike 2 investments. It is specifically designed to manage skins, cases, stickers, and capsules held in inventory long-term. It provides detailed metrics, price histories, and profitability analysis for investors looking to maximize the value of their digital assets.',
            features: 'Technical features',
            feature1: 'Historical price analysis and market trends',
            feature2: 'Automatic ROI and profitability calculation per item',
            feature3: 'Real-time value change tracking',
            feature4: 'Alerts for significant market changes',
            feature5: 'Periodic synchronization with Steam API',
            architecture: 'System architecture',
            architectureDesc: 'Three-tier client-server architecture with multiple frontends:',
            backend: 'Backend',
            backendDesc: 'RESTful API in .NET 8 with Clean Architecture, implementing the Repository pattern, Entity Framework Core, AutoMapper for DTO mapping, JWT authentication, and Rate Limiting.',
            database: 'Database',
            databaseDesc: 'MySQL 8.0 with optimized indexes for high-performance queries on price histories.',
            clients: 'Clients',
            webClient: 'WEB CLIENT',
            androidClient: 'ANDROID APP',
            desktopClient: 'WINDOWS DESKTOP',
            dataFlow: 'Data flow',
            steamApi: 'Steam API',
            syncProcess: 'Automatic synchronization process every 24h',
            backToLogin: 'Back to Login',
            madeBy: 'Made by jagoba.dev',
        },
        main: {
            // TODO
        }
    }
}

export const useTranslation = () => {
    const language = useMemo(() => {
        const browserLang = navigator.language.split('-')[0]
        return browserLang === 'es' ? 'es' : 'en'
    }, [])

    return { t: translations[language], language }
}