import React from "react";

interface Props {
    title: string;
    icon: React.FC<{ className?: string }>;
    iconColor: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
}

export const StatsCard: React.FC<Props> = ({ title, icon: Icon, iconColor, actions, children }) => {
    return (
        <div className="group relative">
            <div className="absolute -inset-0.5 bg-primary rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

            <div className="relative bg-surface-card rounded-xl p-6 border border-white/8 hover:border-primary/50 transition-colors h-full">
                <div className="flex items-center justify-between gap-3 mb-4 border-b border-white/8 pb-3">
                    <div className="flex items-center gap-3">
                        <Icon className={`w-7 h-7 ${iconColor}`} />
                        <h3 className="text-xl font-bold text-primary">{title}</h3>
                    </div>
                    {actions}
                </div>

                <div className="space-y-3">{children}</div>
            </div>
        </div>
    );
};
