import React from "react";
import { motion } from "motion/react";

// 1. Ícone Animado de Tráfego Pago (Tendência de Crescimento + Grade)
export function TrafficIcon() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Grade de Fundo */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#2563EB]/25"
      >
        <path d="M4 4V44H44" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 4V44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <path d="M22 4V44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <path d="M32 4V44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <path d="M4 12H44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <path d="M4 22H44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
        <path d="M4 32H44" stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 3" />
      </svg>

      {/* Linha de Gráfico Animada */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 m-auto text-[#3B82F6] filter drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
      >
        <motion.path
          d="M6 38L16 26L26 30L42 10"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: 2.2,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1
          }}
        />
        {/* Ponto de Sucesso Piscante */}
        <motion.circle
          cx="42"
          cy="10"
          r="4"
          fill="#FFFFFF"
          stroke="#2563EB"
          strokeWidth="2.5"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}

// 2. Ícone Animado de Criação de Sites (Globo Conectado com Órbita)
export function WebsiteIcon() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#2563EB] filter drop-shadow-[0_0_8px_rgba(37,99,235,0.4)]"
      >
        {/* Círculo Principal do Globo */}
        <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" strokeDasharray="120" />
        
        {/* Linhas Meridianas */}
        <motion.path
          d="M24 6C24 6 15 14 15 24C15 34 24 42 24 42C24 42 33 34 33 24C33 14 24 6 24 6Z"
          stroke="currentColor"
          strokeWidth="1.5"
          animate={{ strokeDashoffset: [0, 80] }}
          transition={{
            duration: 3.5,
            repeat: Infinity,
            ease: "linear"
          }}
          strokeDasharray="40 40"
        />
        
        {/* Linha Horizontal (Equador) */}
        <line x1="6" y1="24" x2="42" y2="24" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>

      {/* Partícula Orbitando Externa */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 m-auto"
      >
        <motion.circle
          cx="24"
          cy="24"
          r="21"
          stroke="rgba(59, 130, 246, 0.25)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <motion.circle
          cx="24"
          cy="3"
          r="3"
          fill="#3B82F6"
          className="filter drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]"
          animate={{ rotate: 360 }}
          style={{ transformOrigin: "24px 24px" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </svg>
    </div>
  );
}

// 3. Ícone Animado de Mini SaaS (Engrenagem Operando com Processamento CPU)
export function SaasIcon() {
  return (
    <div className="relative w-14 h-14 flex items-center justify-center">
      {/* Grade Holográfica de Fundo */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30 scale-90">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="text-[#3B82F6]">
          <rect x="4" y="4" width="32" height="32" rx="4" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="0.75" />
        </svg>
      </div>

      {/* Engrenagem Giratória */}
      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#2563EB] filter drop-shadow-[0_0_8px_rgba(37,99,235,0.45)]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41a.5.5 0 00.12-.61l-1.5-2.6a.5.5 0 00-.54-.22l-2.18.79c-.43-.37-.92-.68-1.45-.92L15 4a.5.5 0 00-.47-.38h-3c-.23 0-.43.16-.47.38l-.34 2.15c-.53.24-1.02.55-1.45.92l-2.18-.79a.5.5 0 00-.54.22l-1.5 2.6a.5.5 0 00.12.61l1.86 1.41c-.02.23-.03.45-.03.68s.01.45.03.68l-1.86 1.41a.5.5 0 00-.12.61l1.5 2.6a.5.5 0 00.54.22l2.18-.79c.43.37.92.68 1.45.92l.34 2.15c.04.22.24.38.47.38h3c.23 0 .43-.16.47-.38l.34-2.15c.53-.24 1.02-.55 1.45-.92l2.18.79a.5.5 0 00.54-.22l1.5-2.6a.5.5 0 00-.12-.61l-1.86-1.41c.02-.23.03-.45.03-.68zm-7.5 3.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
          fill="currentColor"
        />
      </motion.svg>

      {/* Pulso de Processamento Interno */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 m-auto text-[#FFFFFF]"
      >
        <motion.circle
          cx="12"
          cy="12"
          r="2.5"
          fill="currentColor"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </svg>
    </div>
  );
}
