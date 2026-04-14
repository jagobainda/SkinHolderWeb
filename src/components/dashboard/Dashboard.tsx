import React from "react";
import { ProtectedPage } from "@components/shared/ProtectedPage";
import { QueryProvider } from "@components/providers/QueryProvider";
import { TopNavbar } from "@components/shared/TopNavbar";
import { DashboardContent } from "./DashboardContent";

export const Dashboard: React.FC = () => {
    return (
        <ProtectedPage>
            <QueryProvider>
                <div className="min-h-screen bg-gradient-to-br from-[#4A4A4A] to-[#2C2C2C] pt-16">
                    <TopNavbar />
                    <DashboardContent />
                </div>
            </QueryProvider>
        </ProtectedPage>
    );
};
