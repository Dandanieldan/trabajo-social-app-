"use client";

import React, { useState } from 'react';
import { 
  Search, FileText, Users, AlertCircle, 
  Calendar, Bell, Plus, Home, Settings, LogOut 
} from 'lucide-react';

export default function EduFlowDashboard() {
  const [activeTab, setActiveTab] = useState('inicio');

  return (
    // Contenedor principal: Fondo oscuro slate-950, texto gris claro
    // Usamos fixed inset-0 z-50 para que cubra la app real
    <div className="fixed inset-0 z-50 min-h-screen bg-slate-950 text-slate-300 font-sans flex overflow-hidden">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-slate-900/50 border-r border-white/5 flex flex-col justify-between backdrop-blur-xl">
        <div>
          {/* Logo / Título */}
          <div className="h-20 flex items-center px-8 border-b border-white/5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center mr-3 shadow-lg shadow-purple-500/20">
              <FileText size={18} className="text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-wide">EduFlow</span>
          </div>

          {/* Navegación */}
          <nav className="p-4 space-y-2 mt-4">
            <NavItem icon={<Home />} label="Inicio" active={activeTab === 'inicio'} onClick={() => setActiveTab('inicio')} />
            <NavItem icon={<Users />} label="Directorio 360°" active={activeTab === 'directorio'} onClick={() => setActiveTab('directorio')} />
            <NavItem icon={<FileText />} label="Justificantes" active={activeTab === 'justificantes'} onClick={() => setActiveTab('justificantes')} />
            <NavItem icon={<AlertCircle />} label="Reportes" active={activeTab === 'reportes'} onClick={() => setActiveTab('reportes')} />
            <NavItem icon={<Calendar />} label="Seguimientos" active={activeTab === 'seguimientos'} onClick={() => setActiveTab('seguimientos')} />
          </nav>
        </div>

        {/* Perfil Usuario Sidebar */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
            <img src="https://i.pravatar.cc/150?img=47" alt="Perfil" className="w-10 h-10 rounded-full border border-purple-500/50" />
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium text-white truncate">Lic. Andrea G.</p>
              <p className="text-xs text-slate-500 truncate">Trabajo Social</p>
            </div>
            <Settings size={16} className="text-slate-400 hover:text-white" />
          </div>
        </div>
      </aside>

      {/* ÁREA PRINCIPAL */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto">
        
        {/* HEADER */}
        <header className="h-20 px-8 flex items-center justify-between sticky top-0 z-10 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
          {/* Búsqueda Rápida */}
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Buscar alumno por nombre o matrícula..." 
              className="w-full bg-slate-900 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
            />
          </div>

          {/* Acciones de Header */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-purple-500 rounded-full"></span>
            </button>
            <button onClick={() => window.location.href='/'} className="bg-purple-600 hover:bg-purple-500 text-white px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20">
              <LogOut size={16} />
              Salir al real
            </button>
          </div>
        </header>

        {/* CONTENIDO DEL DASHBOARD */}
        <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
          
          {/* Bienvenida y Resumen */}
          <div>
            <h1 className="text-3xl font-semibold text-white mb-1">Hola, Andrea</h1>
            <p className="text-slate-400 text-sm">Resumen de tu turno de hoy. Tienes 3 seguimientos pendientes.</p>
          </div>

          {/* Tarjetas de Estadísticas (Glassmorphism) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard title="Justificantes Hoy" value="12" trend="+2 vs ayer" icon={<FileText size={20}/>} color="text-purple-400" />
            <StatCard title="Reportes Activos" value="4" trend="Prioridad media" icon={<AlertCircle size={20}/>} color="text-rose-400" />
            <StatCard title="Entrevistas Tutores" value="3" trend="Para esta semana" icon={<Users size={20}/>} color="text-emerald-400" />
          </div>

          {/* Accesos Directos (Menos clics) */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
            <h2 className="text-white font-medium mb-4">Procesos Frecuentes</h2>
            <div className="flex gap-4">
              <QuickActionButton icon={<FileText />} label="Nuevo Justificante" />
              <QuickActionButton icon={<AlertCircle />} label="Levantar Reporte" />
              <QuickActionButton icon={<Calendar />} label="Agendar Cita" />
            </div>
          </div>

          {/* Actividad Reciente */}
          <div>
            <h2 className="text-white font-medium mb-4">Actividad Reciente</h2>
            <div className="bg-slate-900/50 border border-white/5 rounded-2xl overflow-hidden">
              <ActivityRow name="Carlos Mendoza" id="MAT-202301" action="Justificante Médico generado" time="Hace 10 min" />
              <ActivityRow name="Lucía Fernández" id="MAT-202345" action="Nota psicológica actualizada" time="Hace 45 min" />
              <ActivityRow name="Javier Torres" id="MAT-202112" action="Reporte de disciplina" time="Hace 2 horas" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

/* COMPONENTES AUXILIARES CON TIPADO PARA NEXTJS */

function NavItem({ icon, label, active, onClick }: { icon: React.ReactElement, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
        active 
          ? 'bg-purple-600/10 text-purple-400 border border-purple-500/20' 
          : 'text-slate-400 hover:bg-white/5 hover:text-white'
      }`}
    >
      {React.cloneElement(icon as React.ReactElement<any>, { size: 18 })}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
}

function StatCard({ title, value, trend, icon, color }: { title: string, value: string, trend: string, icon: React.ReactNode, color: string }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-lg bg-white/5 ${color}`}>
          {icon}
        </div>
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium">{title}</h3>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-3xl font-semibold text-white">{value}</span>
          <span className="text-xs text-slate-500">{trend}</span>
        </div>
      </div>
    </div>
  );
}

function QuickActionButton({ icon, label }: { icon: React.ReactElement, label: string }) {
  return (
    <button className="flex-1 flex flex-col items-center justify-center gap-3 p-6 rounded-xl bg-slate-900 border border-white/5 hover:border-purple-500/50 hover:bg-purple-900/20 transition-all group">
      <div className="text-slate-400 group-hover:text-purple-400 transition-colors">
        {React.cloneElement(icon as React.ReactElement<any>, { size: 24 })}
      </div>
      <span className="text-sm font-medium text-slate-300 group-hover:text-white">{label}</span>
    </button>
  );
}

function ActivityRow({ name, id, action, time }: { name: string, id: string, action: string, time: string }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-white/5 hover:bg-white/5 transition-colors last:border-0">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-medium text-sm">
          {name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-medium text-white">{name} <span className="text-xs text-slate-500 ml-2">{id}</span></p>
          <p className="text-xs text-slate-400 mt-0.5">{action}</p>
        </div>
      </div>
      <span className="text-xs text-slate-500">{time}</span>
    </div>
  );
}
