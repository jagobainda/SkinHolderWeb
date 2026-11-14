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
            <div className="absolute -inset-0.5 rounded-xl bg-primary opacity-0 blur transition duration-300 group-hover:opacity-75"></div>

            <div className="relative h-full rounded-xl border border-white/8 bg-surface-card p-6 transition-colors hover:border-primary/50">
                <div className="mb-4 flex items-center justify-between gap-3 border-b border-white/8 pb-3">
                    <div className="flex items-center gap-3">
                        <Icon className={`h-7 w-7 ${iconColor}`} />
                        <h3 className="text-xl font-bold text-primary">{title}</h3>
                    </div>
                    {actions}
                </div>

                <div className="space-y-3">{children}</div>
            </div>
        </div>
    );
};
