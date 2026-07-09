import React from "react";
import { motion } from "motion/react";
import { Zap, Code, Cpu, Target, Sparkles, ShieldCheck } from "lucide-react";
import { differentialsData } from "../data";
import { Differential } from "../types";

// Mapeamento estático e seguro de ícones Lucide para os diferenciais
const iconMap: Record<string, React.ComponentType<any>> = {
  Zap: Zap,
  CodeXml: Code,
  Cpu: Cpu,
  Target: Target,
  Sparkles: Sparkles,
  ShieldCheck: ShieldCheck,
};

export default function Differentials() {
  return (
    <section
      id="diferenciais"
      className="py-24 bg-white dark:bg-[#0A0A0C] transition-colors overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4" id="differentials-header">
          <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Diferenciais
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Por que empresas líderes <br className="hidden sm:inline" /> escolhem a Vertex Digital?
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg font-light">
            Nós removemos toda a fricção de desenvolvimento e marketing. Entregamos tecnologia robusta e estratégias comerciais refinadas para que você foque apenas no seu faturamento.
          </p>
        </div>

        {/* Grid de Diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="differentials-grid">
          {differentialsData.map((diff: Differential, idx) => {
            const IconComponent = iconMap[diff.icon] || Sparkles;
            
            return (
              <motion.div
                key={diff.title}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group p-8 rounded-3xl border border-slate-200/60 dark:border-neutral-800 bg-white dark:bg-[#0D0D11] hover:border-slate-400 dark:hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-500/5 transition-all duration-300 flex flex-col items-start space-y-4"
              >
                {/* Ícone de Destaque com efeito de pulso de colres */}
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-900 dark:text-neutral-100 group-hover:scale-110 transition-transform duration-300">
                  <IconComponent className="w-5 h-5" />
                </div>

                {/* Textos */}
                <div className="space-y-2">
                  <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white flex items-center space-x-1">
                    <span>{diff.title}</span>
                  </h3>
                  <p className="text-slate-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                    {diff.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
