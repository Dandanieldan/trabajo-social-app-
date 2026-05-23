"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, User, Filter, MoreVertical, Phone, AlertCircle } from "lucide-react";
import Link from "next/link";

const students = [
  { id: "202601", name: "Carlos Ramírez", group: "3A", shift: "Matutino", status: "Activo", risk: "Bajo", phone: "618-123-4567" },
  { id: "202602", name: "Ana Sofía Martínez", group: "1B", shift: "Vespertino", status: "Activo", risk: "Alto", phone: "618-987-6543" },
  { id: "202603", name: "Luis Gerardo Silva", group: "5C", shift: "Matutino", status: "Inactivo", risk: "Medio", phone: "618-456-7890" },
  { id: "202604", name: "María Fernanda López", group: "2A", shift: "Vespertino", status: "Activo", risk: "Bajo", phone: "618-234-5678" },
  { id: "202605", name: "Eduardo Medina", group: "4B", shift: "Matutino", status: "Activo", risk: "Alto", phone: "618-345-6789" },
  { id: "202606", name: "Valeria Gómez", group: "6A", shift: "Vespertino", status: "Activo", risk: "Medio", phone: "618-567-8901" },
];

export default function EstudiantesPage() {
  const [search, setSearch] = useState("");

  const filtered = students.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.id.includes(search)
  );

  return (
    <motion.div 
      className="max-w-6xl mx-auto space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Directorio de Estudiantes</h1>
          <p className="text-muted-foreground mt-1">Busca y administra perfiles de estudiantes, historiales y contactos.</p>
        </div>
        <Link href="/estudiantes/nuevo">
          <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2.5 rounded-xl font-medium flex items-center shadow-sm transition-all hover:shadow-md">
            <Plus className="h-5 w-5 mr-2" />
            Registrar Estudiante
          </button>
        </Link>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm p-4 flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Buscar por nombre o matrícula..." 
            className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select className="px-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 min-w-[150px] appearance-none">
          <option>Todos los Grupos</option>
          <option>1A - 1F</option>
          <option>2A - 2F</option>
          <option>3A - 3F</option>
        </select>
        <button className="flex items-center px-4 py-3 text-sm font-medium text-foreground bg-muted/50 border border-border rounded-xl hover:bg-muted transition-colors">
          <Filter className="h-5 w-5 mr-2" />
          Más Filtros
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(student => (
          <Link key={student.id} href={`/estudiantes/${student.id}`}>
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card border border-border rounded-2xl p-5 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer group h-full"
            >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground line-clamp-1">{student.name}</h3>
                  <p className="text-xs text-muted-foreground">Matrícula: {student.id}</p>
                </div>
              </div>
              <button className="p-1 text-muted-foreground hover:bg-muted rounded-md transition-colors opacity-0 group-hover:opacity-100">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
                Grupo {student.group}
              </span>
              <span className="px-2.5 py-1 bg-muted rounded-lg text-xs font-medium text-foreground">
                {student.shift}
              </span>
            </div>

            <div className="pt-4 border-t border-border flex items-center justify-between">
              <div className="flex items-center text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mr-1.5" />
                {student.phone}
              </div>
              {student.risk === "Alto" ? (
                <span className="flex items-center text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded-md border border-red-100">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Riesgo Alto
                </span>
              ) : student.risk === "Medio" ? (
                <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md border border-amber-100">
                  Riesgo Medio
                </span>
              ) : (
                <span className="flex items-center text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
                  Regular
                </span>
              )}
            </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
