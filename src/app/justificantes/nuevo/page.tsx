"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Search, Calendar, User, FileText, Printer } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const dummyStudents = [
  { id: "202601", name: "Carlos Ramírez", group: "3A", shift: "Matutino" },
  { id: "202602", name: "Ana Sofía Martínez", group: "1B", shift: "Vespertino" },
];

export default function NuevoJustificante() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [reason, setReason] = useState("");
  const [observations, setObservations] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setStep(3); // Success step
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/justificantes">
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <ArrowLeft className="h-5 w-5 text-muted-foreground" />
          </button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Nuevo Justificante</h1>
          <p className="text-sm text-muted-foreground">Generación rápida en menos de 1 minuto</p>
        </div>
      </div>

      <div className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden p-8">
        {/* Step 1: Select Student */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="text-lg font-semibold flex items-center">
              <span className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2">1</span>
              Buscar Estudiante
            </h2>
            
            <div className="relative">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-muted-foreground" />
              <input 
                type="text" 
                autoFocus
                placeholder="Ingresa matrícula, nombre o grupo..." 
                className="w-full pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {searchQuery.length > 2 && (
              <div className="space-y-2 mt-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider ml-1">Resultados</p>
                {dummyStudents.map(student => (
                  <div 
                    key={student.id} 
                    onClick={() => { setSelectedStudent(student); setStep(2); }}
                    className="flex items-center justify-between p-4 border border-border rounded-xl hover:border-primary cursor-pointer hover:bg-primary/5 transition-all"
                  >
                    <div className="flex items-center">
                      <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center mr-4">
                        <User className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{student.name}</p>
                        <p className="text-xs text-muted-foreground">Matrícula: {student.id} • Grupo: {student.group} {student.shift}</p>
                      </div>
                    </div>
                    <ArrowLeft className="h-5 w-5 text-muted-foreground rotate-180" />
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* Step 2: Fill Details */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold flex items-center">
                <span className="bg-primary/10 text-primary h-6 w-6 rounded-full flex items-center justify-center text-xs mr-2">2</span>
                Detalles del Justificante
              </h2>
              <button 
                onClick={() => setStep(1)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Cambiar estudiante
              </button>
            </div>

            <div className="bg-muted/30 p-4 rounded-xl border border-border flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-lg text-foreground">{selectedStudent?.name}</p>
                  <p className="text-sm text-muted-foreground">Grupo {selectedStudent?.group} • Turno {selectedStudent?.shift}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Motivo</label>
                <div className="grid grid-cols-1 gap-2">
                  {['Médico', 'Familiar', 'Trámite', 'Otro'].map(r => (
                    <button
                      key={r}
                      onClick={() => setReason(r)}
                      className={`p-3 text-left border rounded-xl transition-all ${
                        reason === r ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:bg-muted'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    Fecha que ampara
                  </label>
                  <input type="date" className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Observaciones (Opcional)
                  </label>
                  <textarea 
                    rows={4} 
                    className="w-full p-3 bg-background border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                    placeholder="Detalles adicionales..."
                    value={observations}
                    onChange={(e) => setObservations(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border flex justify-end">
              <button 
                onClick={handleGenerate}
                disabled={!reason || isGenerating}
                className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-8 py-3 rounded-xl font-medium flex items-center shadow-sm transition-all"
              >
                {isGenerating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generando PDF...
                  </span>
                ) : (
                  "Generar Justificante"
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center space-y-6 flex flex-col items-center">
            <div className="h-20 w-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Check className="h-10 w-10 text-emerald-600" />
            </div>
            <h2 className="text-3xl font-bold text-foreground">¡Generado con éxito!</h2>
            <p className="text-muted-foreground max-w-md">
              El justificante para {selectedStudent?.name} ha sido guardado y el PDF está listo para imprimir.
            </p>
            
            <div className="flex gap-4 pt-8">
              <button className="bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium flex items-center shadow-sm hover:bg-primary/90 transition-all">
                <Printer className="h-5 w-5 mr-2" />
                Imprimir Documento
              </button>
              <button 
                onClick={() => {
                  setStep(1);
                  setSearchQuery("");
                  setSelectedStudent(null);
                  setReason("");
                }}
                className="bg-muted text-foreground px-6 py-3 rounded-xl font-medium flex items-center shadow-sm hover:bg-muted/80 transition-all"
              >
                Crear Otro
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
