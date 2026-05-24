"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, Search, Bell, LayoutDashboard, Users, FileText, AlertTriangle, Clock, Settings, LogOut } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      console.error("Supabase Auth Error:", authError);
      setError(authError.message || "Credenciales incorrectas o error de conexión.");
      setIsLoading(false);
    } else {
      setIsSuccess(true);
      // Retardamos la redirección para dejar que la animación se complete
      setTimeout(() => {
        window.location.href = "/";
      }, 700);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      
      {/* 
        MOCK DASHBOARD IN THE BACKGROUND (Highly blurred)
        Matches the exact layout of the real app.
        When isSuccess is true, the blur fades out to 0px.
      */}
      <motion.div 
        initial={{ filter: "blur(20px)", opacity: 0.15 }}
        animate={{ 
          filter: isSuccess ? "blur(0px)" : "blur(20px)", 
          opacity: isSuccess ? 1 : 0.15 
        }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute inset-0 z-0 flex select-none pointer-events-none"
      >
        {/* Mock Sidebar */}
        <div className="w-56 border-r border-border h-full py-5 px-4 flex flex-col justify-between bg-black/20">
          <div className="space-y-6">
            <div className="flex items-center pl-2">
              <div className="h-6 w-6 bg-foreground/20 rounded-md mr-2.5" />
              <div className="h-4 w-24 bg-foreground/20 rounded-md" />
            </div>
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-8 w-full bg-foreground/10 rounded-lg" />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="h-8 w-full bg-foreground/10 rounded-lg" />
            <div className="pt-3 border-t border-border flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-foreground/20" />
              <div className="space-y-1">
                <div className="h-3 w-16 bg-foreground/20 rounded" />
                <div className="h-2.5 w-20 bg-foreground/10 rounded" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Mock Main Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Mock Header */}
          <div className="h-14 border-b border-border px-6 flex items-center justify-between bg-black/10">
            <div className="h-7 w-80 bg-foreground/10 rounded-md" />
            <div className="h-7 w-7 bg-foreground/10 rounded-full" />
          </div>
          {/* Mock Content */}
          <div className="p-6 md:p-8 space-y-6 flex-1">
            <div className="flex justify-between items-end">
              <div className="space-y-2">
                <div className="h-6 w-32 bg-foreground/20 rounded" />
                <div className="h-3 w-48 bg-foreground/10 rounded" />
              </div>
              <div className="h-8 w-28 bg-foreground/20 rounded-md" />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 bg-foreground/10 rounded-xl" />
              ))}
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-48 bg-foreground/10 rounded-xl" />
              <div className="h-48 bg-foreground/10 rounded-xl" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Global Grain / Texture Overlay */}
      <div 
        className="absolute inset-0 z-1 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* 
        THE LOGIN MODAL (Frosted Glass)
        Will slide out and fade away when isSuccess is true.
      */}
      <AnimatePresence>
        {!isSuccess && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative z-10 w-full max-w-[380px] p-8 rounded-2xl bg-card border border-border backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
          >
            <div className="text-center mb-8">
              <div className="h-10 w-10 rounded-lg bg-foreground/10 border border-border flex items-center justify-center text-foreground font-semibold text-sm mx-auto mb-4 shadow-inner">
                TS
              </div>
              <h1 className="text-lg font-semibold tracking-tight text-foreground">
                Acceso al Sistema
              </h1>
              <p className="text-xs text-muted-foreground mt-1 font-light">
                Departamento de Trabajo Social
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2.5 text-red-400 text-xs"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </motion.div>
              )}
              
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                    Correo Institucional
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 text-xs text-foreground placeholder:text-muted-foreground/40 transition-all"
                    placeholder="usuario@instituto.edu.mx"
                  />
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                      Contraseña
                    </label>
                    <a href="#" className="text-[10px] font-medium text-muted-foreground hover:text-foreground transition-colors">
                      ¿Olvidaste tu contraseña?
                    </a>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 text-xs text-foreground placeholder:text-muted-foreground/40 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/95 py-2.5 rounded-lg font-medium shadow-sm transition-all text-xs mt-6 cursor-pointer flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="h-3 w-3 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : null}
                {isLoading ? "Iniciando..." : "Iniciar Sesión"}
              </button>
            </form>

            <div className="mt-6 pt-5 border-t border-border text-center">
              <p className="text-[9px] text-muted-foreground font-light tracking-wide uppercase">
                Plataforma Segura • Acceso Restringido
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
