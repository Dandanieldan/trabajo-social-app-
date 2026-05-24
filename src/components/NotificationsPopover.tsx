"use client";

import { useState, useRef, useEffect } from "react";
import { Bell } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const initialNotifications = [
  { id: 1, title: "Nuevo reporte generado", time: "Hace 5 min", unread: true },
  { id: 2, title: "Seguimiento pendiente: Carlos Gómez", time: "Hace 1 hora", unread: true },
  { id: 3, title: "Justificante médico aprobado", time: "Hace 3 horas", unread: false },
];

export default function NotificationsPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
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

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, unread: false } : n));
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        type="button"
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
            className="absolute right-0 mt-2 w-72 z-50 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.2)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.6)] border border-black/10 dark:border-white/10"
          >
            {/* Background Wrapper para evitar bug de Safari con backdrop-blur y overflow-hidden */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden bg-white/40 dark:bg-black/40 backdrop-blur-3xl">
              {/* Efecto de textura/grano sutil y reflejo de cristal */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/[0.08] to-transparent" />
            </div>
            
            {/* Contenido (debe estar por encima del background) */}
            <div className="relative z-10 flex flex-col rounded-2xl overflow-hidden">
              <div className="p-3 border-b border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/20">
                <h3 className="text-xs font-semibold text-foreground">Notificaciones</h3>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-black/5 dark:divide-white/5">
                {notifications.length > 0 ? notifications.map((notif) => (
                  <div 
                    key={notif.id} 
                    onClick={() => markAsRead(notif.id)}
                    className={`p-3 hover:bg-black/5 dark:hover:bg-white/[0.04] transition-colors cursor-pointer ${notif.unread ? "bg-black/[0.03] dark:bg-white/[0.02]" : ""}`}
                  >
                    <div className="flex justify-between items-start">
                      <p className={`text-[11px] ${notif.unread ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                        {notif.title}
                      </p>
                      {notif.unread && (
                        <span className="h-1.5 w-1.5 bg-primary rounded-full mt-1.5 shrink-0 shadow-[0_0_8px_var(--tw-shadow-color)] shadow-primary" />
                      )}
                    </div>
                    <p className="text-[9px] text-muted-foreground mt-1">{notif.time}</p>
                  </div>
                )) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">No hay notificaciones</div>
                )}
              </div>
              <div className="p-2 text-center border-t border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-black/20">
                <button 
                  type="button" 
                  onClick={markAllAsRead}
                  disabled={unreadCount === 0}
                  className="text-[10px] text-primary hover:text-primary/80 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Marcar todas como leídas
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
