import React from "react";
import { FiUser, FiCalendar, FiLock, FiAlertTriangle } from "react-icons/fi";
import { getTranslations, type Lang } from "@i18n/index";
import { useUserSettings } from "@hooks/useUserSettings";

export const ConfigPage: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = getTranslations(lang);
    const {
        userInfo,
        loadingInfo,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        passwordStatus,
        loadingPassword,
        handleChangePassword,
        deletePassword,
        setDeletePassword,
        deleteStatus,
        loadingDelete,
        showDeleteConfirm,
        handleDeleteAccount,
        confirmDeleteAccount,
        cancelDeleteAccount,
    } = useUserSettings(lang);

    const formattedDate = userInfo?.createdAt
        ? new Date(userInfo.createdAt).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")
        : t.config.accountInfo.notAvailable;

    return (
        <div className="min-h-screen pt-16">
            <main className="mx-auto flex max-w-2xl flex-col gap-6 px-4 py-8">
                <h1 className="text-2xl font-bold text-white">{t.config.title}</h1>

                {/* Account Info */}
                <section className="rounded-xl border border-white/8 bg-surface-card p-6">
                    <h2 className="mb-4 text-lg font-semibold text-white">{t.config.accountInfo.title}</h2>
                    {loadingInfo ? (
                        <div className="flex gap-4">
                            <div className="skeleton h-5 w-40 rounded" />
                            <div className="skeleton h-5 w-32 rounded" />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 sm:flex-row">
                            <div className="flex items-center gap-2 text-gray-300">
                                <FiUser className="text-primary" />
                                <span className="text-gray-400">{t.config.accountInfo.username}:</span>
                                <span className="font-medium text-white">{userInfo?.username ?? "—"}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-300">
                                <FiCalendar className="text-primary" />
                                <span className="text-gray-400">{t.config.accountInfo.memberSince}:</span>
                                <span className="font-medium text-white">{formattedDate}</span>
                            </div>
                        </div>
                    )}
                </section>

                {/* Change Password */}
                <section className="rounded-xl border border-white/8 bg-surface-card p-6">
                    <h2 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
                        <FiLock className="text-primary" />
                        {t.config.changePassword.title}
                    </h2>
                    <div className="flex flex-col gap-3">
                        <input
                            type="password"
                            placeholder={t.config.changePassword.currentPassword}
                            value={currentPassword}
                            onChange={e => setCurrentPassword(e.target.value)}
                            className="rounded-lg border border-white/8 bg-surface px-3 py-2 text-gray-200 placeholder-gray-500 transition-colors focus:border-primary focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder={t.config.changePassword.newPassword}
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className="rounded-lg border border-white/8 bg-surface px-3 py-2 text-gray-200 placeholder-gray-500 transition-colors focus:border-primary focus:outline-none"
                        />
                        <input
                            type="password"
                            placeholder={t.config.changePassword.confirmPassword}
                            value={confirmNewPassword}
                            onChange={e => setConfirmNewPassword(e.target.value)}
                            className="rounded-lg border border-white/8 bg-surface px-3 py-2 text-gray-200 placeholder-gray-500 transition-colors focus:border-primary focus:outline-none"
                        />

                        {passwordStatus && (
                            <p className={`text-sm ${passwordStatus.success ? "text-green-400" : "text-red-400"}`}>
                                {passwordStatus.message}
                            </p>
                        )}

                        <button
                            onClick={handleChangePassword}
                            disabled={loadingPassword}
                            className="flex min-h-[42px] items-center justify-center self-start rounded-lg bg-primary px-4 py-2 font-semibold text-gray-700 transition-colors hover:cursor-pointer hover:bg-primary-hover active:bg-primary-active disabled:cursor-not-allowed disabled:bg-gray-600"
                        >
                            {loadingPassword ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-700 border-t-transparent" />
                            ) : (
                                t.config.changePassword.submit
                            )}
                        </button>
                    </div>
                </section>

                {/* Delete Account */}
                <section className="rounded-xl border border-red-500/30 bg-surface-card p-6">
                    <h2 className="mb-2 flex items-center gap-2 text-lg font-semibold text-red-400">
                        <FiAlertTriangle />
                        {t.config.deleteAccount.title}
                    </h2>
                    <p className="mb-4 text-sm text-gray-400">{t.config.deleteAccount.warning}</p>

                    <div className="flex flex-col gap-3">
                        <input
                            type="password"
                            placeholder={t.config.deleteAccount.passwordPlaceholder}
                            value={deletePassword}
                            onChange={e => setDeletePassword(e.target.value)}
                            className="rounded-lg border border-white/8 bg-surface px-3 py-2 text-gray-200 placeholder-gray-500 transition-colors focus:border-red-500 focus:outline-none"
                        />

                        {deleteStatus && (
                            <p className={`text-sm ${deleteStatus.success ? "text-green-400" : "text-red-400"}`}>
                                {deleteStatus.message}
                            </p>
                        )}

                        <button
                            onClick={handleDeleteAccount}
                            disabled={loadingDelete}
                            className="flex min-h-[42px] items-center justify-center self-start rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-red-700 active:bg-red-800 disabled:cursor-not-allowed disabled:bg-gray-600"
                        >
                            {loadingDelete ? (
                                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                            ) : (
                                t.config.deleteAccount.submit
                            )}
                        </button>
                    </div>
                </section>
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="animate-fade-slide-up mx-4 w-full max-w-md rounded-xl border border-white/8 bg-surface-card p-6">
                        <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-red-400">
                            <FiAlertTriangle />
                            {t.config.deleteAccount.confirmTitle}
                        </h3>
                        <p className="mb-6 text-sm text-gray-300">{t.config.deleteAccount.confirmMessage}</p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={cancelDeleteAccount}
                                className="rounded-lg border border-white/8 px-4 py-2 text-gray-300 transition-colors hover:cursor-pointer hover:bg-surface-elevated"
                            >
                                {t.config.deleteAccount.confirmNo}
                            </button>
                            <button
                                onClick={confirmDeleteAccount}
                                className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition-colors hover:cursor-pointer hover:bg-red-700"
                            >
                                {t.config.deleteAccount.confirmYes}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
