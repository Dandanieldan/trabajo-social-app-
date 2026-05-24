"use client";

import { motion, Variants } from "framer-motion";
import { 
  Users, 
  FileText, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import Link from "next/link";

const stats = [
  { id: 1, name: "Estudiantes Activos", value: "842", icon: Users, change: "+12", trend: "up" },
  { id: 2, name: "Justificantes Hoy", value: "14", icon: FileText, change: "+3", trend: "up" },
  { id: 3, name: "Reportes Pendientes", value: "5", icon: AlertTriangle, change: "-2", trend: "down" },
  { id: 4, name: "Seguimientos Abiertos", value: "28", icon: Clock, change: "+5", trend: "up" },
];

const recentActivity = [
  { id: 1, type: "reporte", title: "Nuevo reporte de disciplina", student: "Carlos Gómez", time: "Hace 10 min", color: "bg-red-500" },
  { id: 2, type: "seguimiento", title: "Actualización de caso psicológico", student: "María López", time: "Hace 45 min", color: "bg-blue-500" },
  { id: 3, type: "justificante", title: "Justificante médico generado", student: "Juan Pérez", time: "Hace 2 horas", color: "bg-emerald-500" },
  { id: 4, type: "justificante", title: "Justificante familiar generado", student: "Ana Sofía Martínez", time: "Hace 3 horas", color: "bg-emerald-500" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0, filter: "blur(8px)" },
  visible: { 
    opacity: 1, 
    filter: "blur(0px)", 
    transition: { 
      staggerChildren: 0.04,
      duration: 0.5,
      ease: "easeOut"
    } 
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } }
};

export default function Dashboard() {
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="visible" 
      className="max-w-6xl mx-auto space-y-6"
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-foreground">
            Hola, Juana
          </h1>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Aquí está el resumen de tu departamento al día de hoy.
          </p>
        </div>
        <div>
          <Link href="/justificantes/nuevo">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-xs font-medium transition-colors shadow-sm cursor-pointer">
              Crear Justificante
            </button>
          </Link>
        </div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {stats.map((stat) => (
          <motion.div key={stat.id} variants={itemVariants} className="bg-card border border-border p-4 rounded-xl flex flex-col backdrop-blur-sm relative overflow-hidden group hover:border-white/10 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <div className="p-2 bg-white/[0.03] rounded-lg border border-white/[0.05]">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className={`flex items-center text-[10px] font-medium px-1.5 py-0.5 rounded-sm ${stat.trend === 'up' ? 'text-emerald-400 bg-emerald-400/10' : 'text-red-400 bg-red-400/10'}`}>
                {stat.trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium text-muted-foreground mb-0.5">{stat.name}</p>
              <h3 className="text-2xl font-bold text-foreground tracking-tight">{stat.value}</h3>
            </div>
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </motion.div>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Recent Activity */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="lg:col-span-2">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">Actividad Reciente</h2>
            <Link href="/seguimientos" className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center">
              Ver todo <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden backdrop-blur-sm">
            <div className="divide-y divide-border">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="p-3.5 flex items-start gap-3 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                  <div className={`mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0 ${activity.color} shadow-[0_0_8px_currentColor] opacity-70 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex-1 flex justify-between items-start">
                    <div>
                      <p className="text-xs font-medium text-foreground">{activity.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{activity.student}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground bg-white/[0.03] px-2 py-0.5 rounded-md">{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xs font-semibold text-foreground uppercase tracking-wider">Acciones Rápidas</h2>
          </div>
          <div className="bg-card border border-border rounded-xl overflow-hidden backdrop-blur-sm p-2 space-y-1">
            {[
              { label: "Registrar Estudiante", href: "/estudiantes/nuevo", icon: Users },
              { label: "Nuevo Reporte", href: "/reportes/nuevo", icon: AlertTriangle },
              { label: "Agendar Seguimiento", href: "/seguimientos/nuevo", icon: Clock },
            ].map((action, i) => (
              <Link key={i} href={action.href}>
                <div className="flex items-center p-2.5 rounded-lg hover:bg-white/[0.03] transition-colors group cursor-pointer border border-transparent hover:border-white/[0.05]">
                  <div className="h-7 w-7 rounded-md bg-white/[0.03] border border-white/[0.05] flex items-center justify-center mr-3 group-hover:bg-white/[0.06] transition-colors">
                    <action.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">{action.label}</span>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
