"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const notifications = [
  { id: 1, title: "Nuevo reporte generado", time: "Hace 5 min", unread: true },
  { id: 2, title: "Seguimiento pendiente: Carlos Gómez", time: "Hace 1 hora", unread: true },
  { id: 3, title: "Justificante médico aprobado", time: "Hace 3 horas", unread: false },
];

export default function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Cierra el popover si haces click fuera de él
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative text-muted-foreground hover:text-foreground transition-colors p-1.5 hover:bg-white/5 rounded-full cursor-pointer"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-red-500 rounded-full dark:shadow-[0_0_8px_rgba(255,255,255,0.8)] shadow-[0_0_8px_rgba(239,68,68,0.8)]"></span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-72 rounded-xl bg-[var(--sidebar-bg)] border border-border backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] z-50 overflow-hidden"
          >
            <div className="p-3 border-b border-border bg-black/10">
              <h3 className="text-xs font-semibold text-foreground">Notificaciones</h3>
            </div>
            <div className="max-h-80 overflow-y-auto divide-y divide-border">
              {notifications.map((notif) => (
                <div key={notif.id} className={`p-3 hover:bg-white/[0.04] transition-colors cursor-pointer ${notif.unread ? "bg-white/[0.02]" : ""}`}>
                  <div className="flex justify-between items-start">
                    <p className={`text-[11px] ${notif.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {notif.title}
                    </p>
                    {notif.unread && (
                      <span className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5 shrink-0" />
                    )}
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-1">{notif.time}</p>
                </div>
              ))}
            </div>
            <div className="p-2 text-center border-t border-border bg-black/10">
              <button className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors">
                Marcar todas como leídas
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
