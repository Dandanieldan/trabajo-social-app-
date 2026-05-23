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
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden bg-[#0a0a0c]">
      {/* Background Texture & Ambient Light - "Carbon black" feel */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(39,39,42,0.6),rgba(10,10,12,1)_70%)]" />
        {/* Subtle noise texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />
      </div>

      {/* The Tempered Glass Modal */}
      <div className="relative z-10 w-full max-w-[420px] p-8 md:p-10 rounded-2xl bg-zinc-950/40 backdrop-blur-xl border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
        <div className="text-center mb-10">
          <div className="h-12 w-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-white font-semibold text-xl mx-auto mb-5 shadow-inner">
            TS
          </div>
          <h1 className="text-2xl font-medium tracking-tight text-white">
            Acceso al Sistema
          </h1>
          <p className="text-sm text-zinc-400 mt-2 font-light">
            Departamento de Trabajo Social
          </p>
        </div>

        <form className="space-y-6">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <p>Credenciales incorrectas o error de conexión.</p>
            </div>
          )}
          
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
                Correo Institucional
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-sm text-white placeholder:text-zinc-600 transition-all"
                placeholder="usuario@instituto.edu.mx"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-xs font-medium text-zinc-300 uppercase tracking-wider">
                  Contraseña
                </label>
                <a href="#" className="text-xs font-medium text-zinc-500 hover:text-white transition-colors">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 bg-black/30 border border-white/10 rounded-xl focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 text-sm text-white placeholder:text-zinc-600 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            formAction={login}
            className="w-full bg-white text-black hover:bg-zinc-200 py-3 rounded-xl font-medium shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all text-sm mt-8"
          >
            Iniciar Sesión
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-[11px] text-zinc-500 font-light tracking-wide uppercase">
            Plataforma Segura • Acceso Restringido
          </p>
        </div>
      </div>
    </div>
  );
}
