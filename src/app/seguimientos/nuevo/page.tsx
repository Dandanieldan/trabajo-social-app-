"use client";

import { useState } from "react";
import { ArrowLeft, Clock, Save, Calendar, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NuevoSeguimiento() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push("/seguimientos");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/seguimientos">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            <Clock className="h-6 w-6 mr-2 text-amber-500" />
            Añadir Seguimiento
          </h1>
          <p className="text-sm text-muted-foreground">Registra una nueva nota en la bitácora</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Estudiante</label>
            <input required type="text" placeholder="Buscar estudiante..." className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Fecha de la nota</label>
            <input required type="date" defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Notas de la sesión / entrevista</label>
          <textarea 
            required 
            rows={4} 
            placeholder="¿Qué temas se trataron?..." 
            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Acuerdos pactados</label>
          <textarea 
            rows={2} 
            placeholder="Compromisos del alumno o padres..." 
            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
          />
        </div>

        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-amber-900 flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-2" />
            Siguiente Acción (Recordatorio)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-medium text-amber-800">Fecha del recordatorio</label>
              <input type="date" className="w-full p-2.5 bg-background border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm" />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-medium text-amber-800">Acción a realizar</label>
              <input type="text" placeholder="Ej. Revisar calificaciones" className="w-full p-2.5 bg-background border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-sm" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-4">
          <Link href="/seguimientos">
            <button type="button" className="px-6 py-3 rounded-xl font-medium text-foreground hover:bg-muted transition-colors">
              Cancelar
            </button>
          </Link>
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium flex items-center shadow-sm transition-all"
          >
            {isSaving ? "Guardando..." : "Guardar Seguimiento"}
          </button>
        </div>
      </form>
    </div>
  );
}
