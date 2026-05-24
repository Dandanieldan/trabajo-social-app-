"use client";

import { useEffect, useRef } from "react";
import { signout } from "@/app/login/actions";

export default function SessionGuard() {
  // 15 minutos de inactividad
  const INACTIVITY_TIMEOUT = 15 * 60 * 1000; 
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const resetTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(async () => {
      console.log("Sesión cerrada por inactividad");
      await signout();
    }, INACTIVITY_TIMEOUT);
  };

  useEffect(() => {
    // Iniciar el temporizador la primera vez
    resetTimer();

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];
    
    const handleActivity = () => {
      resetTimer();
    };

    events.forEach((event) => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, []);

  return null; // Este componente no renderiza nada visual
}
