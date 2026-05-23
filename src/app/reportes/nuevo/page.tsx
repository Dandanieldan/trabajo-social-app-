"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, AlertTriangle, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NuevoReporte() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      router.push("/reportes");
    }, 1200);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/reportes">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground flex items-center">
            <AlertTriangle className="h-6 w-6 mr-2 text-red-500" />
            Nuevo Reporte
          </h1>
          <p className="text-sm text-muted-foreground">Registra un incidente o reporte disciplinario</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-6 md:p-8 space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Estudiante</label>
          <input required type="text" placeholder="Buscar estudiante por nombre o matrícula..." className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Tipo de Reporte</label>
            <select required className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="">Seleccionar...</option>
              <option>Conducta</option>
              <option>Asistencia</option>
              <option>Riesgo Emocional</option>
              <option>Problema Familiar</option>
              <option>Riesgo Académico</option>
              <option>Otro</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Prioridad</label>
            <select required className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Descripción de los hechos</label>
          <textarea 
            required 
            rows={5} 
            placeholder="Describe detalladamente qué sucedió..." 
            className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
          />
        </div>

        <div className="pt-4 border-t border-border flex justify-end gap-4">
          <Link href="/reportes">
            <button type="button" className="px-6 py-3 rounded-xl font-medium text-foreground hover:bg-muted transition-colors">
              Cancelar
            </button>
          </Link>
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium flex items-center shadow-sm transition-all"
          >
            {isSaving ? "Guardando..." : "Crear Reporte"}
          </button>
        </div>
      </form>
    </div>
  );
}
