import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Search, Bell } from "lucide-react";
import MouseGlow from "@/components/MouseGlow";
import ThemeToggle from "@/components/ThemeToggle";
import { createClient } from "@/utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Trabajo Social - Inicio",
  description: "Plataforma asistente para Trabajo Social",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // If the user is NOT logged in, render a completely clean viewport layout without Sidebar or Header.
  // This allows the Login modal to center globally and prevents unauthenticated layout leaks.
  if (!user) {
    return (
      <html lang="es" className="h-full antialiased dark">
        <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground relative overflow-hidden transition-colors duration-400`}>
          <MouseGlow />
          {/* Global Texture Overlay */}
          <div className="absolute inset-0 z-[-2] pointer-events-none">
            <div 
              className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
            />
          </div>
          <main className="flex-1 w-full h-full relative z-10 flex items-center justify-center">
            {children}
          </main>
        </body>
      </html>
    );
  }

  // Authenticated Layout (with Sidebar, Topbar Header, and Main grid)
  return (
    <html lang="es" className="h-full antialiased dark">
      <body className={`${inter.className} min-h-full flex flex-col bg-background text-foreground relative overflow-hidden transition-colors duration-400`}>
        
        {/* Global Pure Black & Neutral Glow Background to make Glassmorphism pop */}
        <MouseGlow />
        <div className="absolute inset-0 z-[-2] pointer-events-none">
          {/* Subtle neutral glow at the top-left to contrast the sidebar glass */}
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-[radial-gradient(circle,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_70%)] rounded-full" />
          {/* Subtle neutral glow at the bottom-right */}
          <div className="absolute -bottom-[20%] -right-[10%] w-[60%] h-[60%] bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_70%)] rounded-full" />
          
          <div 
            className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
          />
        </div>

        <div className="flex h-screen overflow-hidden">
          {/* Sidebar is now transparent with backdrop blur */}
          <Sidebar />
          
          <div className="flex-1 flex flex-col overflow-hidden relative z-0">
            {/* Topbar: Tempered Glass */}
            <header className="h-14 flex items-center justify-between px-4 md:px-6 border-b border-border bg-[var(--header-bg)] backdrop-blur-xl z-10 sticky top-0 transition-colors duration-300 gap-2 md:gap-4">
              <div className="flex items-center group flex-1 md:flex-none">
                <div className="flex items-center bg-white/[0.03] dark:bg-white/[0.03] bg-black/[0.02] px-3 py-1.5 border border-border rounded-md group-focus-within:border-foreground/20 transition-all w-full md:w-80 relative shadow-inner">
                  <Search className="h-3.5 w-3.5 text-muted-foreground shrink-0 mr-2.5" />
                  <input 
                    type="text" 
                    placeholder="Buscar estudiante, folio..." 
                    className="bg-transparent border-none outline-none text-xs w-full placeholder:text-muted-foreground/60 text-foreground"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ThemeToggle />
                <button className="relative text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-white/5 rounded-full cursor-pointer">
                  <Bell className="h-4 w-4" />
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full dark:shadow-[0_0_8px_rgba(255,255,255,0.8)] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
                </button>
              </div>
            </header>
            
            {/* Main Content Area */}
            {/* Added pb-20 md:pb-8 so content isn't covered by mobile bottom nav */}
            <main className="flex-1 overflow-y-auto p-4 pb-24 md:p-8 relative">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
