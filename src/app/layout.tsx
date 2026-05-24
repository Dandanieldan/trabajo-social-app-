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
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground relative overflow-hidden`}>
        
        {/* Global Pure Black & Neutral Glow Background to make Glassmorphism pop */}
        <div className="absolute inset-0 z-[-1] pointer-events-none">
          {/* Subtle neutral glow at the top-left to contrast the sidebar glass */}
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,rgba(0,0,0,0)_70%)] rounded-full" />
          {/* Subtle neutral glow at the bottom-right */}
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,rgba(0,0,0,0)_70%)] rounded-full" />
          
          <div 
            className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
        </div>

        <div className="flex h-screen overflow-hidden">
          {/* Sidebar is now transparent with backdrop blur */}
          <Sidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden relative z-0">
            {/* Topbar: Tempered Glass */}
            <header className="h-14 flex items-center justify-between px-6 border-b border-border bg-black/30 backdrop-blur-2xl z-10 sticky top-0">
              <div className="flex items-center group">
                <div className="flex items-center bg-white/[0.03] px-3 py-1.5 border border-border rounded-md group-focus-within:border-white/20 transition-all w-80 relative shadow-inner">
                  <Search className="h-3.5 w-3.5 text-muted-foreground mr-2.5" />
                  <input 
                    type="text" 
                    placeholder="Buscar estudiante, folio..." 
                    className="bg-transparent border-none outline-none text-xs w-full placeholder:text-muted-foreground/60 text-foreground"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button className="relative text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-white/5 rounded-full">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-neutral-300 rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"></span>
                </button>
              </div>
            </header>
            
            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
