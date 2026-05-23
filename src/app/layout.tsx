import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Search, Bell } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trabajo Social - Inicio",
  description: "Plataforma asistente para Trabajo Social",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground`}>
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden bg-background relative">
            {/* Topbar */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-border bg-background/80 backdrop-blur-md z-10">
              <div className="flex items-center group">
                <div className="flex items-center bg-muted/40 px-4 py-2 border border-border/50 rounded-lg group-focus-within:border-primary/50 transition-colors w-96 relative">
                  <Search className="h-4 w-4 text-muted-foreground mr-3" />
                  <input 
                    type="text" 
                    placeholder="Buscar estudiante, folio o reporte..." 
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground text-foreground"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted/50 rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>
              </div>
            </header>
            
            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-8 relative z-0">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
