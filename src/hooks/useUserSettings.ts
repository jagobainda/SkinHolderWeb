import { useState, useEffect, useCallback } from "react";
import { getUserInfo, changePassword, deleteAccount } from "@lib/userSettings";
import { logout } from "@lib/auth";
import { getTranslations, type Lang } from "@i18n/index";
import type { UserInfo } from "@app-types/index";

export function useUserSettings(lang: Lang) {
    const t = getTranslations(lang);

    // Account info
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loadingInfo, setLoadingInfo] = useState(true);

    // Change password
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [passwordStatus, setPasswordStatus] = useState<{ message: string; success: boolean } | null>(null);
    const [loadingPassword, setLoadingPassword] = useState(false);

    // Delete account
    const [deletePassword, setDeletePassword] = useState("");
    const [deleteStatus, setDeleteStatus] = useState<{ message: string; success: boolean } | null>(null);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    useEffect(() => {
        getUserInfo().then(info => {
            setUserInfo(info);
            setLoadingInfo(false);
        });
    }, []);

    const handleChangePassword = useCallback(async () => {
        setPasswordStatus(null);

        if (!currentPassword.trim()) {
            setPasswordStatus({ message: t.config.changePassword.emptyCurrentPassword, success: false });
            return;
        }
        if (!newPassword.trim()) {
            setPasswordStatus({ message: t.config.changePassword.emptyNewPassword, success: false });
            return;
        }
        if (newPassword.length < 6) {
            setPasswordStatus({ message: t.config.changePassword.minLength, success: false });
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setPasswordStatus({ message: t.config.changePassword.mismatch, success: false });
            return;
        }
        if (currentPassword === newPassword) {
            setPasswordStatus({ message: t.config.changePassword.samePassword, success: false });
            return;
        }

        setLoadingPassword(true);
        try {
            const result = await changePassword(currentPassword, newPassword);
            if (result.success) {
                setPasswordStatus({ message: t.config.changePassword.success, success: true });
                setCurrentPassword("");
                setNewPassword("");
                setConfirmNewPassword("");
            } else {
                setPasswordStatus({ message: result.error ?? t.config.changePassword.error, success: false });
            }
        } finally {
            setLoadingPassword(false);
        }
    }, [currentPassword, newPassword, confirmNewPassword, t]);

    const handleDeleteAccount = useCallback(async () => {
        setDeleteStatus(null);

        if (!deletePassword.trim()) {
            setDeleteStatus({ message: t.config.deleteAccount.emptyPassword, success: false });
            return;
        }

        setShowDeleteConfirm(true);
    }, [deletePassword, t]);

    const confirmDeleteAccount = useCallback(async () => {
        setShowDeleteConfirm(false);
        setLoadingDelete(true);

        try {
            const result = await deleteAccount(deletePassword);
            if (result.success) {
                logout();
                window.location.href = "/";
            } else {
                setDeleteStatus({ message: result.error ?? t.config.deleteAccount.error, success: false });
            }
        } finally {
            setLoadingDelete(false);
        }
    }, [deletePassword, t]);

    const cancelDeleteAccount = useCallback(() => {
        setShowDeleteConfirm(false);
    }, []);

    return {
        // Account info
        userInfo,
        loadingInfo,
        // Change password
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        confirmNewPassword,
        setConfirmNewPassword,
        passwordStatus,
        loadingPassword,
        handleChangePassword,
        // Delete account
        deletePassword,
        setDeletePassword,
        deleteStatus,
        loadingDelete,
        showDeleteConfirm,
        handleDeleteAccount,
        confirmDeleteAccount,
        cancelDeleteAccount
    };
}
