import React from 'react'
import type { IconType } from 'react-icons'

interface Props {
    title: string
    icon: IconType
    iconColor: string
    actions?: React.ReactNode
    children: React.ReactNode
}

export const StatsCard: React.FC<Props> = ({ title, icon: Icon, iconColor, actions, children }) => {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-primary rounded-xl blur opacity-0 group-hover:opacity-50 transition duration-300"></div>

            <div className="relative bg-[#333333] rounded-xl p-6 border border-gray-700 hover:border-primary transition-colors h-full">
                <div className="flex items-center justify-between gap-3 mb-4 border-b border-gray-700 pb-3">
                    <div className="flex items-center gap-3">
                        <Icon className={`w-6 h-6 ${iconColor}`} />
                        <h3 className="text-xl font-bold text-primary">{title}</h3>
                    </div>
                    {actions}
                </div>

                <div className="space-y-3">
                    {children}
                </div>
            </div>
        </div>
    )
}