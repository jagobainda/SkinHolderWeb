import React from 'react'
import { Alert } from './Alert'

interface Toast {
    id: number
    type: 'success' | 'danger' | 'warning' | 'info'
    title: string
    message: string
}

interface ToastContainerProps {
    toasts: Toast[]
    onRemove: (id: number) => void
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemove }) => {
    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2">
            {toasts.map(toast => (
                <div
                    key={toast.id}
                    className="animate-slide-in-bottom cursor-pointer"
                    onClick={() => onRemove(toast.id)}
                >
                    <Alert
                        variant={toast.type}
                        title={toast.title}
                        message={toast.message}
                    />
                </div>
            ))}
        </div>
    )
}
