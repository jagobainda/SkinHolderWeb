import React, { useState } from "react";
import { getTranslations } from "@i18n/index";

type Props = {
    onSubmit: (username: string, password: string) => void;
    onForgotPassword: () => void;
    onRequestAccess: (email: string) => Promise<boolean>;
    loading: boolean;
    requestAccessLoading?: boolean;
};

export const LoginForm: React.FC<Props> = ({
    onSubmit,
    onForgotPassword,
    onRequestAccess,
    loading,
    requestAccessLoading = false,
}) => {
    const t = getTranslations();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showRegisterPanel, setShowRegisterPanel] = useState(false);
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(username, password);
    };

    const handleRequestAccess = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (await onRequestAccess(email)) setEmail("");
    };

    return (
        <div className="animate-fade-slide-up flex flex-col items-center gap-8 py-8 lg:flex-row lg:py-0">
            <div className="flex flex-col items-center gap-4">
                <div className="group relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-primary opacity-0 blur transition duration-300 group-hover:opacity-75"></div>

                    <div className="relative w-88 rounded-xl border border-white/8 bg-surface-card p-8">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <div className="relative mb-6 flex w-full justify-center">
                                <div className="relative">
                                    <img src="/images/logo_login.png" alt="Logo" className="h-52 w-auto" />
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <h1 className="text-5xl font-bold text-primary drop-shadow-lg">
                                            {t.login.title}
                                        </h1>
                                    </div>
                                </div>
                            </div>

                            <input
                                placeholder={t.login.username}
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className="border-b-2 border-gray-600 bg-transparent px-2 py-2 text-gray-200 transition-colors focus:border-primary focus:outline-none"
                            />

                            <input
                                type="password"
                                placeholder={t.login.password}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="border-b-2 border-gray-600 bg-transparent px-2 py-2 text-gray-200 transition-colors focus:border-primary focus:outline-none"
                            />

                            <button
                                type="button"
                                onClick={onForgotPassword}
                                className="self-center text-sm text-primary hover:cursor-pointer hover:underline"
                            >
                                {t.login.forgotPassword}
                            </button>

                            <button
                                type="submit"
                                disabled={loading}
                                className="flex min-h-[42px] items-center justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-gray-700 transition-colors hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {loading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-transparent"></div>
                                ) : (
                                    t.login.loginButton
                                )}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowRegisterPanel(!showRegisterPanel)}
                                className="text-sm text-gray-400 transition-colors hover:cursor-pointer hover:text-primary"
                            >
                                {t.login.noAccess}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex w-full justify-between px-2 text-sm">
                    <a
                        href="https://jagoba.dev/projects/skinholder"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:text-primary-hover"
                    >
                        {t.login.aboutLink}
                    </a>
                    <a
                        href="https://jagoba.dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary transition-colors hover:text-primary-hover"
                    >
                        {t.login.madeBy}
                    </a>
                </div>
            </div>

            {showRegisterPanel && (
                <div className="group animate-fade-slide-up relative">
                    <div className="absolute -inset-0.5 rounded-xl bg-primary opacity-0 blur transition duration-300 group-hover:opacity-75"></div>

                    <div className="relative w-88 rounded-xl border border-white/8 bg-surface-card p-8">
                        <div className="mb-6 flex items-center justify-between">
                            <h2 className="text-2xl font-bold text-primary">{t.login.requestAccessTitle}</h2>
                            <button
                                onClick={() => setShowRegisterPanel(false)}
                                className="text-2xl text-gray-400 hover:cursor-pointer hover:text-gray-200"
                            >
                                ×
                            </button>
                        </div>

                        <div className="mb-6">
                            <p className="mb-2 text-sm text-gray-300">{t.login.requestAccessDescription}</p>
                            <p className="text-xs text-gray-400">{t.login.requestAccessSubtitle}</p>
                        </div>

                        <form onSubmit={handleRequestAccess} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder={t.login.emailPlaceholder}
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                                className="border-b-2 border-gray-600 bg-transparent px-2 py-2 text-gray-200 transition-colors focus:border-primary focus:outline-none"
                            />

                            <button
                                type="submit"
                                disabled={requestAccessLoading}
                                className="flex min-h-[42px] items-center justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-gray-700 transition-colors hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active disabled:cursor-not-allowed disabled:bg-gray-400"
                            >
                                {requestAccessLoading ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-transparent"></div>
                                ) : (
                                    t.login.requestAccessButton
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
