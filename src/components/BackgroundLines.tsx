import React from "react";
import { motion } from "motion/react";

export default function BackgroundLines() {
  return (
    <div className="absolute inset-0 z-[-15] pointer-events-none overflow-hidden opacity-30">
      {/* Linha Vertical Esquerda Animada */}
      <div className="absolute left-[8%] sm:left-[12%] top-0 h-full w-[1px]">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="10000" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4 6" />
          <motion.line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="300"
            stroke="url(#glow-gradient-1)"
            strokeWidth="1.5"
            initial={{ y: -300 }}
            animate={{ y: "100vh" }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <defs>
            <linearGradient id="glow-gradient-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Linha Vertical Direita Animada */}
      <div className="absolute right-[8%] sm:right-[12%] top-0 h-full w-[1px]">
        <svg className="w-full h-full" fill="none" preserveAspectRatio="none">
          <line x1="0.5" y1="0" x2="0.5" y2="10000" stroke="rgba(255, 255, 255, 0.03)" strokeWidth="1" strokeDasharray="4 6" />
          <motion.line
            x1="0.5"
            y1="0"
            x2="0.5"
            y2="300"
            stroke="url(#glow-gradient-2)"
            strokeWidth="1.5"
            initial={{ y: "100vh" }}
            animate={{ y: -300 }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <defs>
            <linearGradient id="glow-gradient-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="transparent" />
              <stop offset="50%" stopColor="#2563EB" stopOpacity="0.8" />
              <stop offset="100%" stopColor="transparent" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Linha de Horizonte Holográfico na Transição */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#2563EB]/15 to-transparent" />
    </div>
  );
}
