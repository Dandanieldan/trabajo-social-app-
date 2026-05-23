"use client";

import { motion } from "framer-motion";
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowRight
} from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Estudiantes atendidos", value: "142", icon: Users, color: "text-blue-400" },
  { label: "Seguimientos activos", value: "28", icon: Clock, color: "text-amber-400" },
  { label: "Reportes pendientes", value: "7", icon: AlertTriangle, color: "text-red-400" },
  { label: "Justificantes del mes", value: "315", icon: FileText, color: "text-emerald-400" },
];

const quickActions = [
  { label: "Generar Justificante", icon: FileText, href: "/justificantes/nuevo" },
  { label: "Crear Reporte", icon: AlertTriangle, href: "/reportes/nuevo" },
  { label: "Añadir Seguimiento", icon: Clock, href: "/seguimientos/nuevo" },
  { label: "Registrar Estudiante", icon: Users, href: "/estudiantes/nuevo" },
];

const recentActivity = [
  { id: 1, type: "justificante", title: "Justificante médico generado", student: "Carlos Ramírez", time: "Hace 10 min", color: "bg-emerald-500" },
  { id: 2, type: "reporte", title: "Reporte de conducta abierto", student: "María Fernanda López", time: "Hace 45 min", color: "bg-red-500" },
  { id: 3, type: "seguimiento", title: "Nota de seguimiento agregada", student: "Luis Gerardo Silva", time: "Hace 2 horas", color: "bg-amber-500" },
  { id: 4, type: "justificante", title: "Justificante familiar generado", student: "Ana Sofía Martínez", time: "Hace 3 horas", color: "bg-emerald-500" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <motion.div 
      className="max-w-6xl mx-auto space-y-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex justify-between items-end">
        <div>
          <motion.h1 variants={itemVariants} className="text-3xl font-semibold tracking-tight text-foreground">
            Hola, Juana
          </motion.h1>
          <motion.p variants={itemVariants} className="text-muted-foreground mt-1 text-sm">
            Resumen de actividad de hoy. Tienes 2 prioridades por revisar.
          </motion.p>
        </div>
      </div>

      {/* Stats */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-2xl p-6 flex flex-col justify-between hover:border-primary/20 transition-colors">
            <div className="flex justify-between items-start mb-4">
              <span className="text-sm font-medium text-muted-foreground">{stat.label}</span>
              <stat.icon className={`h-4 w-4 ${stat.color} opacity-80`} />
            </div>
            <div>
              <h3 className="text-3xl font-semibold text-foreground tracking-tight">{stat.value}</h3>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div variants={itemVariants}>
        <h2 className="text-sm font-semibold text-foreground mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <Link key={index} href={action.href}>
              <div className="group bg-card border border-border rounded-xl p-4 flex items-center justify-between hover:border-primary/30 hover:bg-muted/10 transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-md bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground transition-colors">
                    <action.icon className="h-4 w-4" />
                  </div>
                  <span className="text-sm font-medium text-foreground">{action.label}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-4">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-foreground">Actividad Reciente</h2>
            <Link href="/seguimientos" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center">
              Ver todo <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </div>
          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="divide-y divide-border">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-4 flex items-start gap-4 hover:bg-muted/20 transition-colors">
                  <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${activity.color}`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{activity.student}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Priority Attention */}
        <motion.div variants={itemVariants}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              Atención Prioritaria
            </h2>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-red-400">Eduardo Medina</p>
                <AlertTriangle className="h-4 w-4 text-red-400" />
              </div>
              <p className="text-sm text-red-300/80 mb-3">Ausencias consecutivas críticas detectadas.</p>
              <Link href="/estudiantes/202605">
                <button className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors flex items-center">
                  Revisar caso <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </Link>
            </div>

            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-medium text-amber-400">Valeria Gómez</p>
                <Clock className="h-4 w-4 text-amber-400" />
              </div>
              <p className="text-sm text-amber-300/80 mb-3">Cita con tutor pendiente de programación.</p>
              <Link href="/estudiantes/202606">
                <button className="text-sm font-medium text-amber-400 hover:text-amber-300 transition-colors flex items-center">
                  Revisar caso <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
