import Navbar from "../components/ui/Navbar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="p-4">
                {children}
            </main>
        </div>
    );
}