import React from 'react'

interface ActionsCardProps {
    onConsultar: () => void
    onHistorial: () => void
    onExportarJson: () => void
    isEnabled: boolean
}

export const ActionsCard: React.FC<ActionsCardProps> = ({ onConsultar, onHistorial, isEnabled }) => {

    return (
        <div className="group relative h-full">
            <div className="absolute -inset-0.5 bg-primary rounded-xl blur opacity-0 group-hover:opacity-75 transition duration-300"></div>

            <div className="relative bg-[#333333] rounded-xl py-6 px-8 shadow-lg border border-gray-700 h-full flex flex-col justify-center gap-3">
                <button
                    onClick={onConsultar}
                    disabled={!isEnabled}
                    className={`py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 border ${
                        isEnabled
                            ? 'bg-[#222222] text-primary border-transparent hover:bg-[#444444] cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
                            : 'bg-[#333333] text-[#666666] border-[#444444] cursor-not-allowed'
                    }`}
                >
                    CONSULTAR
                </button>
                <button
                    onClick={onHistorial}
                    disabled={!isEnabled}
                    className={`py-2.5 px-4 rounded-lg font-semibold transition-all duration-200 border ${
                        isEnabled
                            ? 'bg-[#222222] text-primary border-transparent hover:bg-[#444444] cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.2)]'
                            : 'bg-[#333333] text-[#666666] border-[#444444] cursor-not-allowed'
                    }`}
                >
                    HISTORIAL DE REGISTROS
                </button>
            </div>
        </div>
    )
}