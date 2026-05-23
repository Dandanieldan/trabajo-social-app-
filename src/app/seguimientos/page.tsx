"use client";

import { motion } from "framer-motion";
import { Plus, Search, Calendar, User, CheckCircle2, Clock, MoreHorizontal, ArrowRight } from "lucide-react";
import Link from "next/link";

const followups = [
  { 
    id: 1, 
    student: "Eduardo Medina", 
    date: "Hoy, 10:30 AM", 
    note: "Se platicó con la madre sobre las inasistencias. Acuerdan justificar y comprometerse a no faltar el resto del mes.",
    nextAction: "Revisar asistencia el viernes",
    status: "Pendiente" 
  },
  { 
    id: 2, 
    student: "Valeria Gómez", 
    date: "Ayer, 12:15 PM", 
    note: "Cita con el alumno para revisar avance académico. Muestra mejora emocional pero requiere apoyo en matemáticas.",
    nextAction: "Cita con tutor académico",
    status: "Completado" 
  },
  { 
    id: 3, 
    student: "Luis Gerardo Silva", 
    date: "20 May 2026", 
    note: "Reporte de prefectura por llegar tarde. Se le dio un aviso preventivo.",
    nextAction: "Monitorear entradas",
    status: "Pendiente" 
  }
];

export default function SeguimientosPage() {
  return (
    <motion.div 
      className="max-w-5xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Seguimientos</h1>
          <p className="text-muted-foreground mt-1">Bitácora de seguimiento de estudiantes como un CRM moderno.</p>
        </div>
        <Link href="/seguimientos/nuevo">
          <button className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-xl font-medium flex items-center shadow-sm transition-all hover:shadow-md">
            <Plus className="h-5 w-5 mr-2" />
            Nueva Nota
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-4 relative">
            <Search className="absolute left-8 top-7 h-5 w-5 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Buscar en el historial de seguimientos..." 
              className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all"
            />
          </div>

          <div className="space-y-4 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {followups.map((item, index) => (
              <div key={item.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-background bg-amber-100 text-amber-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  {item.status === 'Completado' ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-card border border-border p-5 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-1">
                    <div className="flex items-center font-bold text-foreground">
                      <User className="h-4 w-4 mr-1.5 text-muted-foreground" />
                      {item.student}
                    </div>
                    <time className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded-md">{item.date}</time>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    {item.note}
                  </p>
                  <div className="mt-4 pt-3 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg">
                      <ArrowRight className="h-3 w-3 mr-1" />
                      Próxima acción: {item.nextAction}
                    </div>
                    <button className="text-muted-foreground hover:text-foreground">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border border-border rounded-2xl shadow-sm p-6">
            <h3 className="font-semibold text-lg mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-amber-500" />
              Próximas Acciones
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-amber-700">Hoy</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Llamar a tutor de Carlos</p>
                  <p className="text-xs text-muted-foreground">14:00 PM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-muted-foreground">Vie</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Revisar asistencia Eduardo</p>
                  <p className="text-xs text-muted-foreground">10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
