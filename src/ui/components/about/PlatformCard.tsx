import React from 'react'

export const PlatformCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-[#2C2C2C] rounded-lg p-6 hover:bg-[#3A3A3A] transition-colors">
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-xl font-semibold text-primary mb-2">{title}</h3>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
)