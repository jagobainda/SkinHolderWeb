import { useMemo } from 'react'

const translations = {
    es: {
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
            backendDesc: 'API RESTful desarrollada en .NET 8, implementando Clean Architecture con patrón Repository y Unit of Work.',
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
        }
    },
    en: {
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
            backendDesc: 'RESTful API built with .NET 8, implementing Clean Architecture with Repository and Unit of Work patterns.',
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