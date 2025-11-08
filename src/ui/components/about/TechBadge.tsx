import React from 'react'

export const TechBadge: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <span className="px-4 py-2 bg-[#2C2C2C] text-primary rounded-full text-sm font-medium border border-primary/20">
        {children}
    </span>
)