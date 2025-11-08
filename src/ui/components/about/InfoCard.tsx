import React from 'react'

export const InfoCard: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="group relative">
        <div className="absolute -inset-0.5 bg-primary rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>
        <div className="relative bg-[#333333] rounded-2xl p-8 transform transition-all duration-300 group-hover:-translate-y-1">
            <h2 className="text-2xl font-bold text-primary mb-4">{title}</h2>
            {children}
        </div>
    </div>
)