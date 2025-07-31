import { Toaster } from "@/components/ui/sonner";

import Navbar from "../components/ui/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Toaster 
            duration={3000} 
            closeButton={false}
             />
            <main className="p-4">
                {children}
            </main>
        </div>
    );
}