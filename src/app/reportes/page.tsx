"use client";

import { motion } from "framer-motion";
import { Plus, AlertTriangle, MessageSquare, Clock, Filter } from "lucide-react";
import Link from "next/link";

const reports = {
  abiertos: [
    { id: "REP-001", student: "Eduardo Medina", type: "Conducta", priority: "Alta", date: "Hace 2 horas" },
    { id: "REP-002", student: "Valeria Gómez", type: "Asistencia", priority: "Media", date: "Ayer" },
  ],
  proceso: [
    { id: "REP-003", student: "Luis Gerardo Silva", type: "Riesgo Emocional", priority: "Alta", date: "Hace 2 días" },
  ],
  cerrados: [
    { id: "REP-004", student: "Ana Sofía Martínez", type: "Problema Familiar", priority: "Media", date: "Hace 1 semana" },
  ]
};

export default function ReportesPage() {
  return (
    <motion.div 
      className="max-w-7xl mx-auto space-y-6 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Reportes e Incidencias</h1>
          <p className="text-muted-foreground mt-1">Gestiona los reportes de los estudiantes en tablero Kanban.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center px-4 py-2 text-sm font-medium text-foreground bg-card border border-border rounded-xl hover:bg-muted transition-colors shadow-sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
          <Link href="/reportes/nuevo">
            <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center shadow-sm transition-all hover:shadow-md">
              <Plus className="h-5 w-5 mr-2" />
              Nuevo Reporte
            </button>
          </Link>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {/* Columna: Abiertos */}
        <div className="flex flex-col h-full bg-muted/30 rounded-2xl p-4 border border-border/50">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-semibold text-foreground flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 mr-2" />
              Abiertos
            </h3>
            <span className="bg-border text-xs px-2 py-1 rounded-md font-medium text-muted-foreground">
              {reports.abiertos.length}
            </span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {reports.abiertos.map(report => (
              <ReportCard key={report.id} data={report} />
            ))}
          </div>
        </div>

        {/* Columna: En Proceso */}
        <div className="flex flex-col h-full bg-muted/30 rounded-2xl p-4 border border-border/50">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-semibold text-foreground flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-2" />
              En Proceso
            </h3>
            <span className="bg-border text-xs px-2 py-1 rounded-md font-medium text-muted-foreground">
              {reports.proceso.length}
            </span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {reports.proceso.map(report => (
              <ReportCard key={report.id} data={report} />
            ))}
          </div>
        </div>

        {/* Columna: Cerrados */}
        <div className="flex flex-col h-full bg-muted/30 rounded-2xl p-4 border border-border/50">
          <div className="flex items-center justify-between mb-4 px-2">
            <h3 className="font-semibold text-foreground flex items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2" />
              Cerrados
            </h3>
            <span className="bg-border text-xs px-2 py-1 rounded-md font-medium text-muted-foreground">
              {reports.cerrados.length}
            </span>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {reports.cerrados.map(report => (
              <ReportCard key={report.id} data={report} />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ReportCard({ data }: { data: any }) {
  return (
    <div className="bg-card border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-medium text-muted-foreground">{data.id}</span>
        <span className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full ${
          data.priority === 'Alta' ? 'bg-red-100 text-red-700' : 
          data.priority === 'Media' ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'
        }`}>
          {data.priority}
        </span>
      </div>
      <h4 className="font-semibold text-foreground mb-1">{data.student}</h4>
      <p className="text-sm text-muted-foreground flex items-center mb-4">
        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
        {data.type}
      </p>
      
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5 mr-1" />
          {data.date}
        </div>
        <div className="flex items-center gap-2">
          <button className="text-muted-foreground hover:text-primary transition-colors">
            <MessageSquare className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
