import React from "react";
import { FiUser, FiCalendar, FiLock, FiAlertTriangle } from "react-icons/fi";
import { getTranslations, type Lang } from "@i18n/index";
import { useUserSettings } from "@hooks/useUserSettings";

export const ConfigPage: React.FC<{ lang: Lang }> = ({ lang }) => {
    const t = getTranslations(lang);
    const { userInfo, loadingInfo, currentPassword, setCurrentPassword, newPassword, setNewPassword, confirmNewPassword, setConfirmNewPassword, passwordStatus, loadingPassword, handleChangePassword, deletePassword, setDeletePassword, deleteStatus, loadingDelete, showDeleteConfirm, handleDeleteAccount, confirmDeleteAccount, cancelDeleteAccount } = useUserSettings(lang);

    const formattedDate = userInfo?.createdAt ? new Date(userInfo.createdAt).toLocaleDateString(lang === "es" ? "es-ES" : "en-US") : t.config.accountInfo.notAvailable;

    return (
        <div className="min-h-screen pt-16">
            <main className="max-w-2xl mx-auto px-4 py-8 flex flex-col gap-6">
                <h1 className="text-2xl font-bold text-white">{t.config.title}</h1>

                {/* Account Info */}
                <section className="bg-surface-card rounded-xl border border-white/8 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4">{t.config.accountInfo.title}</h2>
                    {loadingInfo ? (
                        <div className="flex gap-4">
                            <div className="skeleton h-5 w-40 rounded" />
                            <div className="skeleton h-5 w-32 rounded" />
                        </div>
                    ) : (
                        <div className="flex flex-col sm:flex-row gap-4">
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
                <section className="bg-surface-card rounded-xl border border-white/8 p-6">
                    <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                        <FiLock className="text-primary" />
                        {t.config.changePassword.title}
                    </h2>
                    <div className="flex flex-col gap-3">
                        <input type="password" placeholder={t.config.changePassword.currentPassword} value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} className="px-3 py-2 rounded-lg bg-surface border border-white/8 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" />
                        <input type="password" placeholder={t.config.changePassword.newPassword} value={newPassword} onChange={e => setNewPassword(e.target.value)} className="px-3 py-2 rounded-lg bg-surface border border-white/8 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" />
                        <input type="password" placeholder={t.config.changePassword.confirmPassword} value={confirmNewPassword} onChange={e => setConfirmNewPassword(e.target.value)} className="px-3 py-2 rounded-lg bg-surface border border-white/8 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-primary transition-colors" />

                        {passwordStatus && <p className={`text-sm ${passwordStatus.success ? "text-green-400" : "text-red-400"}`}>{passwordStatus.message}</p>}

                        <button onClick={handleChangePassword} disabled={loadingPassword} className="self-start px-4 py-2 bg-primary text-gray-700 rounded-lg hover:bg-primary-hover active:bg-primary-active disabled:bg-gray-600 disabled:cursor-not-allowed hover:cursor-pointer transition-colors font-semibold flex items-center justify-center min-h-[42px]">
                            {loadingPassword ? <div className="w-5 h-5 border-2 border-gray-700 border-t-transparent rounded-full animate-spin" /> : t.config.changePassword.submit}
                        </button>
                    </div>
                </section>

                {/* Delete Account */}
                <section className="bg-surface-card rounded-xl border border-red-500/30 p-6">
                    <h2 className="text-lg font-semibold text-red-400 mb-2 flex items-center gap-2">
                        <FiAlertTriangle />
                        {t.config.deleteAccount.title}
                    </h2>
                    <p className="text-sm text-gray-400 mb-4">{t.config.deleteAccount.warning}</p>

                    <div className="flex flex-col gap-3">
                        <input type="password" placeholder={t.config.deleteAccount.passwordPlaceholder} value={deletePassword} onChange={e => setDeletePassword(e.target.value)} className="px-3 py-2 rounded-lg bg-surface border border-white/8 text-gray-200 placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors" />

                        {deleteStatus && <p className={`text-sm ${deleteStatus.success ? "text-green-400" : "text-red-400"}`}>{deleteStatus.message}</p>}

                        <button onClick={handleDeleteAccount} disabled={loadingDelete} className="self-start px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 active:bg-red-800 disabled:bg-gray-600 disabled:cursor-not-allowed hover:cursor-pointer transition-colors font-semibold flex items-center justify-center min-h-[42px]">
                            {loadingDelete ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : t.config.deleteAccount.submit}
                        </button>
                    </div>
                </section>
            </main>

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                    <div className="bg-surface-card rounded-xl border border-white/8 p-6 max-w-md w-full mx-4 animate-fade-slide-up">
                        <h3 className="text-lg font-semibold text-red-400 flex items-center gap-2 mb-3">
                            <FiAlertTriangle />
                            {t.config.deleteAccount.confirmTitle}
                        </h3>
                        <p className="text-gray-300 text-sm mb-6">{t.config.deleteAccount.confirmMessage}</p>
                        <div className="flex justify-end gap-3">
                            <button onClick={cancelDeleteAccount} className="px-4 py-2 rounded-lg border border-white/8 text-gray-300 hover:bg-surface-elevated hover:cursor-pointer transition-colors">
                                {t.config.deleteAccount.confirmNo}
                            </button>
                            <button onClick={confirmDeleteAccount} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 hover:cursor-pointer transition-colors font-semibold">
                                {t.config.deleteAccount.confirmYes}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
