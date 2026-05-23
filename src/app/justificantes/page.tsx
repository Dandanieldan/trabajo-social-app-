"use client";

import { motion } from "framer-motion";
import { Plus, Search, FileText, Download, Printer, Filter } from "lucide-react";
import Link from "next/link";

const recentJustificantes = [
  { id: "JUS-001", student: "Carlos Ramírez", group: "3A", reason: "Médico", date: "22 May 2026", status: "Impreso" },
  { id: "JUS-002", student: "Ana Sofía Martínez", group: "1B", reason: "Familiar", date: "21 May 2026", status: "Generado" },
  { id: "JUS-003", student: "Luis Gerardo Silva", group: "5C", reason: "Trámite", date: "20 May 2026", status: "Impreso" },
  { id: "JUS-004", student: "María Fernanda López", group: "2A", reason: "Médico", date: "19 May 2026", status: "Generado" },
];

export default function JustificantesPage() {
  return (
    <motion.div 
      className="max-w-6xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Justificantes</h1>
          <p className="text-muted-foreground mt-1">Genera y administra los justificantes de los estudiantes.</p>
        </div>
        <Link href="/justificantes/nuevo">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium flex items-center shadow-sm transition-all hover:shadow-md">
            <Plus className="h-5 w-5 mr-2" />
            Nuevo Justificante
          </button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden flex flex-col h-[calc(100vh-220px)]">
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div className="flex items-center bg-background px-3 py-2 rounded-lg w-80 border border-border focus-within:border-primary/50 transition-colors">
            <Search className="h-4 w-4 text-muted-foreground mr-2" />
            <input 
              type="text" 
              placeholder="Buscar por alumno o folio..." 
              className="bg-transparent border-none outline-none text-sm w-full"
            />
          </div>
          <button className="flex items-center px-4 py-2 text-sm font-medium text-foreground bg-background border border-border rounded-lg hover:bg-muted transition-colors">
            <Filter className="h-4 w-4 mr-2" />
            Filtros
          </button>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted/50 text-muted-foreground sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 font-medium">Folio</th>
                <th className="px-6 py-4 font-medium">Estudiante</th>
                <th className="px-6 py-4 font-medium">Grupo</th>
                <th className="px-6 py-4 font-medium">Motivo</th>
                <th className="px-6 py-4 font-medium">Fecha</th>
                <th className="px-6 py-4 font-medium">Estado</th>
                <th className="px-6 py-4 font-medium text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {recentJustificantes.map((item) => (
                <tr key={item.id} className="hover:bg-muted/30 transition-colors group">
                  <td className="px-6 py-4 font-medium text-foreground">{item.id}</td>
                  <td className="px-6 py-4">{item.student}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-muted rounded-md text-xs font-medium">{item.group}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full mr-2 ${
                        item.reason === 'Médico' ? 'bg-blue-500' :
                        item.reason === 'Familiar' ? 'bg-amber-500' : 'bg-purple-500'
                      }`} />
                      {item.reason}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{item.date}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.status === 'Impreso' ? 'bg-emerald-100 text-emerald-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Descargar PDF">
                        <Download className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-lg transition-colors" title="Imprimir">
                        <Printer className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
