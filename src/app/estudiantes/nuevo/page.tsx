"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, Home, GraduationCap, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NuevoEstudiante() {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    // Simular guardado
    setTimeout(() => {
      setIsSaving(false);
      router.push("/estudiantes");
    }, 1200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/estudiantes">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Registrar Estudiante</h1>
          <p className="text-sm text-muted-foreground">Añade un nuevo perfil al directorio institucional</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden">
          {/* Datos Personales */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center mb-6">
              <User className="h-5 w-5 mr-2 text-primary" />
              Datos Personales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre Completo</label>
                <input required type="text" placeholder="Ej. Carlos Ramírez García" className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">CURP</label>
                <input type="text" placeholder="18 caracteres" className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </div>

          {/* Datos Académicos */}
          <div className="p-6 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center mb-6">
              <GraduationCap className="h-5 w-5 mr-2 text-blue-500" />
              Datos Académicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Matrícula</label>
                <input required type="text" placeholder="Ej. 202601" className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Grupo</label>
                <select className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Seleccionar...</option>
                  <option>1A</option><option>1B</option><option>2A</option><option>3A</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Turno</label>
                <select className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Matutino</option>
                  <option>Vespertino</option>
                  <option>Nocturno</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contacto y Emergencia */}
          <div className="p-6">
            <h2 className="text-lg font-semibold flex items-center mb-6">
              <Phone className="h-5 w-5 mr-2 text-emerald-500" />
              Contacto y Tutores
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Nombre del Padre/Tutor</label>
                <input required type="text" placeholder="Nombre completo" className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Teléfono de Emergencia</label>
                <input required type="tel" placeholder="10 dígitos" className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-foreground flex items-center">
                  <Home className="h-4 w-4 mr-2" />
                  Dirección
                </label>
                <input type="text" placeholder="Calle, Número, Colonia" className="w-full p-3 bg-muted/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Link href="/estudiantes">
            <button type="button" className="px-6 py-3 rounded-xl font-medium text-foreground bg-muted hover:bg-muted/80 transition-colors">
              Cancelar
            </button>
          </Link>
          <button 
            type="submit" 
            disabled={isSaving}
            className="bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground px-8 py-3 rounded-xl font-medium flex items-center shadow-sm transition-all"
          >
            {isSaving ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </span>
            ) : (
              <span className="flex items-center">
                <Save className="h-5 w-5 mr-2" />
                Guardar Estudiante
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
