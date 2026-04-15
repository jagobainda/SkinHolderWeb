import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { DashboardContent } from "./DashboardContent";

export const Dashboard: React.FC = () => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <div className="min-h-screen pt-16">
                <DashboardContent />
            </div>
        </QueryClientProvider>
    );
};
