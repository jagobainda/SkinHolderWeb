import React from 'react'

export const FeatureItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="flex items-start">
        <span className="text-primary mr-3 mt-1">✓</span>
        <span>{children}</span>
    </li>
)