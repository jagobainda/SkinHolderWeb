import { useState, useCallback } from 'react'

type ToastType = 'success' | 'danger' | 'warning' | 'info'

interface Toast {
    id: number
    type: ToastType
    title: string
    message: string
}

export const useToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([])

    const showToast = useCallback((type: ToastType, title: string, message: string) => {
        const id = Date.now()
        setToasts(prev => [...prev, { id, type, title, message }])

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id))
        }, 3000)
    }, [])

    const removeToast = useCallback((id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id))
    }, [])

    return { toasts, showToast, removeToast }
}
