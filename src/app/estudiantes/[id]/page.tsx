"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, Phone, MapPin, AlertTriangle, FileText, Clock, Edit } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock data
const studentData = {
  id: "202601",
  name: "Carlos Ramírez García",
  group: "3A",
  shift: "Matutino",
  status: "Activo",
  risk: "Bajo",
  phone: "618-123-4567",
  tutor: "María García (Madre)",
  emergencyPhone: "618-999-8888",
  address: "Calle Benito Juárez #123, Centro",
};

export default function EstudianteDetalle() {
  const params = useParams();
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/estudiantes">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <ArrowLeft className="h-5 w-5 text-muted-foreground" />
            </button>
          </Link>
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-foreground">{studentData.name}</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-2 mt-1">
                Matrícula: {studentData.id} • Grupo {studentData.group} {studentData.shift}
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-md">
                  {studentData.status}
                </span>
              </p>
            </div>
          </div>
        </div>
        <button className="px-4 py-2 border border-border rounded-xl font-medium text-foreground bg-card hover:bg-muted transition-colors flex items-center shadow-sm">
          <Edit className="h-4 w-4 mr-2" />
          Editar Perfil
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-border flex gap-6 overflow-x-auto hide-scrollbar">
        {[
          { id: "general", label: "Información General", icon: User },
          { id: "seguimientos", label: "Seguimientos (2)", icon: Clock },
          { id: "reportes", label: "Reportes (0)", icon: AlertTriangle },
          { id: "justificantes", label: "Justificantes (5)", icon: FileText },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-4 text-sm font-medium transition-colors flex items-center border-b-2 whitespace-nowrap ${
              activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
            }`}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {activeTab === "general" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4 flex items-center">
                <Phone className="h-5 w-5 mr-2 text-primary" />
                Contacto
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Teléfono Personal</p>
                  <p className="font-medium">{studentData.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Padre / Tutor</p>
                  <p className="font-medium">{studentData.tutor}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">Tel. Emergencia</p>
                  <p className="font-medium text-red-600">{studentData.emergencyPhone}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1 flex items-center"><MapPin className="h-3 w-3 mr-1"/> Dirección</p>
                  <p className="text-sm">{studentData.address}</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-semibold text-lg mb-4">Acciones Rápidas</h3>
              <div className="space-y-3">
                <Link href={`/justificantes/nuevo?estudiante=${studentData.id}`} className="flex items-center p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group cursor-pointer">
                  <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                    <FileText className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Generar Justificante</p>
                    <p className="text-xs text-muted-foreground">Menos de 1 minuto</p>
                  </div>
                </Link>
                <Link href={`/seguimientos/nuevo?estudiante=${studentData.id}`} className="flex items-center p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group cursor-pointer">
                  <div className="h-10 w-10 bg-amber-100 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Añadir Seguimiento</p>
                    <p className="text-xs text-muted-foreground">Registrar nota o cita</p>
                  </div>
                </Link>
                <Link href={`/reportes/nuevo?estudiante=${studentData.id}`} className="flex items-center p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors group cursor-pointer">
                  <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center mr-3 group-hover:scale-105 transition-transform">
                    <AlertTriangle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Crear Reporte</p>
                    <p className="text-xs text-muted-foreground">Conducta, asistencia, etc.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        )}

        {activeTab === "seguimientos" && (
          <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-lg">Historial de Seguimientos</h3>
              <Link href={`/seguimientos/nuevo?estudiante=${studentData.id}`}>
                <button className="text-sm font-medium text-amber-600 hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors">
                  + Añadir Nota
                </button>
              </Link>
            </div>
            <div className="space-y-6 border-l-2 border-border ml-3 pl-6">
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-amber-500 ring-4 ring-background" />
                <p className="text-xs text-muted-foreground font-medium mb-1">10 de Mayo, 2026</p>
                <p className="text-sm text-foreground">Entrevista con madre de familia sobre inasistencias.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[31px] top-1 h-4 w-4 rounded-full bg-muted border-2 border-border ring-4 ring-background" />
                <p className="text-xs text-muted-foreground font-medium mb-1">15 de Abril, 2026</p>
                <p className="text-sm text-foreground">Asesoría emocional inicial, canalización psicológica recomendada.</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Placeholder for other tabs */}
        {(activeTab === "reportes" || activeTab === "justificantes") && (
          <div className="bg-card border border-border rounded-2xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mb-4">
              {activeTab === "reportes" ? <AlertTriangle className="h-8 w-8 text-muted-foreground" /> : <FileText className="h-8 w-8 text-muted-foreground" />}
            </div>
            <h3 className="font-semibold text-lg mb-1">No hay {activeTab} recientes</h3>
            <p className="text-muted-foreground text-sm max-w-sm mb-6">
              Este estudiante no tiene registros recientes en esta sección.
            </p>
            <Link href={`/${activeTab}/nuevo?estudiante=${studentData.id}`}>
              <button className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium shadow-sm transition-all hover:bg-primary/90">
                Crear Nuevo
              </button>
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}
