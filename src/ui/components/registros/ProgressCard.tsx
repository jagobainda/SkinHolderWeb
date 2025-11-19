import React from 'react'

interface ProgressCardProps {
    platform: 'steam' | 'gamerpay' | 'csfloat'
    progress: number
    total: number
    totalPrice: number
    onShowDetails: () => void
    isEnabled: boolean
}

const platformConfig = {
    steam: {
        label: 'STEAM',
        color: '#5d79ae',
        bgColor: 'bg-steam'
    },
    gamerpay: {
        label: 'GAMERPAY',
        color: '#ea8f3e',
        bgColor: 'bg-gamerpay'
    },
    csfloat: {
        label: 'CSFLOAT',
        color: '#ff6b35',
        bgColor: 'bg-csfloat'
    }
}

export const ProgressCard: React.FC<ProgressCardProps> = ({ platform, progress, total, totalPrice, onShowDetails, isEnabled }) => {
    const config = platformConfig[platform]
    const percentage = total > 0 ? (progress / total) * 100 : 100

    return (
        <div className="group relative h-full">
            <div className="absolute -inset-0.5 bg-primary rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

            <div className="relative bg-[#333333] rounded-xl p-6 shadow-lg border border-gray-700 h-full flex flex-col justify-between">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                        <div className="text-white text-2xl font-bold mb-6">
                            {progress} / {total}
                        </div>
                        <div className="text-white text-xl mb-4">
                            TOTAL {config.label}: <span className="text-primary">{totalPrice.toFixed(2)} €</span>
                        </div>
                    </div>
                    <button
                        onClick={onShowDetails}
                        disabled={!isEnabled}
                        className={`p-2.5 rounded-lg transition-all duration-200 border ${
                            isEnabled
                                ? 'bg-[#222222] text-primary border-transparent hover:bg-[#444444] cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
                                : 'bg-[#333333] text-[#666666] border-[#444444] cursor-not-allowed'
                        }`}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </button>
                </div>
                <div className="w-full bg-gray-700 rounded h-6 overflow-hidden">
                    <div
                        className={`${config.bgColor} h-full transition-all duration-300 rounded`}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    )
}