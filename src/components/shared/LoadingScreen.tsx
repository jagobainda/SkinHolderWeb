import React from "react";

export const LoadingScreen: React.FC = () => (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C] gap-8">
        <div className="relative w-32 h-32">
            <img src="/images/logo.ico" alt="Loading" className="w-full h-full object-contain animate-pulse drop-shadow-lg" />
            <div className="absolute inset-0 -m-5 border-4 border-gray-200 border-t-primary rounded-full animate-spin" />
        </div>
    </div>
);
