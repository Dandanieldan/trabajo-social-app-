import { login } from "./actions";
import { AlertCircle } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error;

  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-background">
      
      {/* 
        MOCK DASHBOARD IN THE BACKGROUND (Highly blurred)
        This simulates the dashboard sitting behind a heavy frosted glass wall.
      */}
      <div className="absolute inset-0 z-0 flex select-none pointer-events-none filter blur-xl opacity-25 dark:opacity-[0.12] transition-opacity duration-500">
        {/* Mock Sidebar */}
        <div className="w-56 border-r border-border h-full p-5 space-y-4 flex flex-col">
          <div className="h-6 w-24 bg-foreground/20 rounded-md" />
          <div className="space-y-2 pt-6">
            <div className="h-8 w-full bg-foreground/10 rounded-md" />
            <div className="h-8 w-full bg-foreground/10 rounded-md" />
            <div className="h-8 w-full bg-foreground/10 rounded-md" />
            <div className="h-8 w-full bg-foreground/10 rounded-md" />
          </div>
        </div>
        
        {/* Mock Main Area */}
        <div className="flex-1 flex flex-col h-full">
          {/* Mock Header */}
          <div className="h-14 border-b border-border px-6 flex items-center justify-between">
            <div className="h-7 w-64 bg-foreground/10 rounded-md" />
            <div className="h-7 w-7 bg-foreground/10 rounded-full" />
          </div>
          {/* Mock Content */}
          <div className="p-6 md:p-8 space-y-6 flex-1">
            <div className="h-8 w-48 bg-foreground/20 rounded-md" />
            <div className="grid grid-cols-4 gap-4">
              <div className="h-24 bg-foreground/10 rounded-xl" />
              <div className="h-24 bg-foreground/10 rounded-xl" />
              <div className="h-24 bg-foreground/10 rounded-xl" />
              <div className="h-24 bg-foreground/10 rounded-xl" />
            </div>
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-2 h-64 bg-foreground/10 rounded-xl" />
              <div className="h-64 bg-foreground/10 rounded-xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Global Grain / Texture Overlay */}
      <div 
        className="absolute inset-0 z-1 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
      />

      {/* 
        THE LOGIN MODAL (Frosted Glass)
        Matches the layout's sidebar/header glassmorphism style perfectly.
      */}
      <div className="relative z-10 w-full max-w-[380px] p-8 rounded-2xl bg-card border border-border backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.2)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-300">
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

        <form className="space-y-5">
          {error && (
            <div className="p-2.5 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-2.5 text-red-400 text-xs">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>Credenciales incorrectas o error de conexión.</p>
            </div>
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
                className="w-full px-3 py-2 bg-foreground/[0.02] border border-border rounded-lg focus:outline-none focus:border-foreground/20 focus:ring-1 focus:ring-foreground/20 text-xs text-foreground placeholder:text-muted-foreground/40 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            formAction={login}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/95 py-2.5 rounded-lg font-medium shadow-sm transition-all text-xs mt-6 cursor-pointer"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-6 pt-5 border-t border-border text-center">
          <p className="text-[9px] text-muted-foreground font-light tracking-wide uppercase">
            Plataforma Segura • Acceso Restringido
          </p>
        </div>
      </div>
    </div>
  );
}
