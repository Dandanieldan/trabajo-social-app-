"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  AlertTriangle, 
  Clock, 
  Settings,
  LogOut
} from "lucide-react";
import { signout } from "@/app/login/actions";

const routes = [
  { label: "Inicio", icon: LayoutDashboard, href: "/" },
  { label: "Estudiantes", icon: Users, href: "/estudiantes" },
  { label: "Justificantes", icon: FileText, href: "/justificantes" },
  { label: "Reportes", icon: AlertTriangle, href: "/reportes" },
  { label: "Seguimientos", icon: Clock, href: "/seguimientos" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    // Narrower width w-60 (240px) or w-56 (224px), more blur, theme-responsive bg
    <div className="space-y-4 py-5 flex flex-col h-full w-56 bg-[var(--sidebar-bg)] backdrop-blur-2xl border-r border-border text-xs font-medium z-20 transition-all duration-300">
      <div className="px-4 flex-1">
        <Link href="/" className="flex items-center mb-8 group pl-2">
          <div className="h-6 w-6 bg-white/10 border border-white/10 rounded-md flex items-center justify-center mr-2.5 text-white font-bold shadow-inner transition-colors group-hover:bg-white group-hover:text-black text-[10px]">
            TS
          </div>
          <h1 className="text-sm font-semibold text-foreground tracking-tight">Trabajo Social</h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`) && route.href !== "/";
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center px-3 py-2 w-full justify-start cursor-pointer transition-all relative rounded-lg",
                  isActive ? "text-primary bg-white/[0.06] dark:bg-white/[0.06] bg-black/[0.03] border border-white/5 dark:border-white/5 border-black/5 shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/[0.03] dark:hover:bg-white/[0.03] hover:bg-black/[0.02] border border-transparent"
                )}
              >
                <route.icon strokeWidth={2.5} className={cn("h-3.5 w-3.5 mr-2.5 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {route.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="px-4 pb-2 space-y-3">
        <Link
          href="/configuracion"
          className="group flex items-center px-3 py-2 w-full justify-start cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-white/[0.03] rounded-lg border border-transparent"
        >
          <Settings strokeWidth={2.5} className="h-3.5 w-3.5 mr-2.5" />
          Configuración
        </Link>
        <div className="pt-3 border-t border-border flex justify-between items-center px-1">
          <div className="flex items-center gap-2.5">
            <div className="h-7 w-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-foreground font-semibold text-[10px] shadow-inner">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-foreground font-medium line-clamp-1">Juana Díaz</span>
              <span className="text-[10px] text-muted-foreground line-clamp-1">Trabajadora Social</span>
            </div>
          </div>
          <form action={signout}>
            <button title="Cerrar sesión" className="p-1.5 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-md transition-colors">
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
