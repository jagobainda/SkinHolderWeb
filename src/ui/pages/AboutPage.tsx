import React from 'react'
    import { useDocumentTitle } from "@ui/hooks/useDocumentTitle.ts";
    import { useTranslation } from "@ui/hooks/useTranslation.ts";
    import { Link } from "react-router-dom";
    import { InfoCard } from "@ui/components/about/InfoCard.tsx";
    import { FeatureItem } from "@ui/components/about/FeatureItem.tsx";
    import { ArchitectureDiagram } from "@ui/components/about/ArchitectureDiagram.tsx";

    export const AboutPage: React.FC = () => {
        const { t } = useTranslation()
        useDocumentTitle("SkinHolder - About")

        return (
            <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C] py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <div className="flex justify-center mb-6">
                            <img
                                src="/images/logo_login.png"
                                alt="Logo"
                                className="h-32 w-auto"
                            />
                        </div>
                        <h1 className="text-5xl font-bold text-primary mb-4">{t.about.title}</h1>
                        <p className="text-gray-300 text-xl">{t.about.subtitle}</p>
                    </div>

                    <div className="space-y-8">
                        <InfoCard title={t.about.whatIs}>
                            <p className="text-gray-300 leading-relaxed">
                                {t.about.whatIsDescription}
                            </p>
                        </InfoCard>

                        <InfoCard title={t.about.features}>
                            <ul className="space-y-3 text-gray-300">
                                <FeatureItem>{t.about.feature1}</FeatureItem>
                                <FeatureItem>{t.about.feature3}</FeatureItem>
                                <FeatureItem>{t.about.feature5}</FeatureItem>
                            </ul>
                        </InfoCard>

                        <InfoCard title={t.about.architecture}>
                            <p className="text-gray-300 mb-6">
                                {t.about.architectureDesc}
                            </p>
                            <ArchitectureDiagram t={t} />
                        </InfoCard>
                    </div>

                    <div className="mt-12 text-center space-y-4">
                        <Link
                            to="/"
                            className="inline-block px-8 py-3 bg-primary text-gray-700 rounded-lg hover:bg-primary-hover transition-colors font-semibold"
                        >
                            {t.about.backToLogin}
                        </Link>

                        <div className="flex justify-center gap-8 text-sm">
                            <a
                                href="https://jagoba.dev"
                                className="text-primary hover:text-primary-hover transition-colors"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {t.about.madeBy}
                            </a>
                            <a
                                href="mailto:skinholder@jagoba.dev"
                                className="text-gray-400 hover:text-primary transition-colors"
                            >
                                skinholder@jagoba.dev
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }