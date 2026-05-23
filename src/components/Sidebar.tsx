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
import { motion } from "framer-motion";
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
    <div className="space-y-4 py-6 flex flex-col h-full bg-background border-r border-border w-64 text-sm font-medium">
      <div className="px-6 flex-1">
        <Link href="/" className="flex items-center mb-10 group">
          <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center mr-3 text-primary-foreground font-bold">
            TS
          </div>
          <h1 className="text-base font-semibold text-foreground tracking-tight">Trabajo Social</h1>
        </Link>
        <div className="space-y-1.5">
          {routes.map((route) => {
            const isActive = pathname === route.href || pathname.startsWith(`${route.href}/`) && route.href !== "/";
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "group flex items-center px-3 py-2.5 w-full justify-start cursor-pointer transition-all relative rounded-lg",
                  isActive ? "text-primary bg-muted/50" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                )}
              >
                <route.icon className={cn("h-4 w-4 mr-3 transition-colors", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                {route.label}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="px-6 pb-4 space-y-4">
        <Link
          href="/configuracion"
          className="group flex items-center px-3 py-2.5 w-full justify-start cursor-pointer transition-colors text-muted-foreground hover:text-foreground hover:bg-muted/30 rounded-lg"
        >
          <Settings className="h-4 w-4 mr-3" />
          Configuración
        </Link>
        <div className="pt-4 border-t border-border flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-foreground font-semibold text-sm">
              JD
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-foreground font-medium line-clamp-1">Juana Díaz</span>
              <span className="text-xs text-muted-foreground line-clamp-1">Trabajadora Social</span>
            </div>
          </div>
          <form action={signout}>
            <button title="Cerrar sesión" className="p-2 text-muted-foreground hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
              <LogOut className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
