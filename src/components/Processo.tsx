import { motion } from "motion/react";
import { Sparkles } from "lucide-react";
import { processData } from "../data";

export default function Process() {
  return (
    <section
      id="processo"
      className="py-24 bg-slate-50/50 dark:bg-[#08080A] transition-colors border-y border-slate-100 dark:border-neutral-900/60 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-20 space-y-4" id="process-header">
          <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Metodologia
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Como garantimos sua escala <br className="hidden sm:inline" /> de vendas em 4 etapas simples.
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg font-light">
            Nosso método de trabalho elimina incertezas, alinhando tecnologia robusta, design premium e tráfego pago estratégico desde o primeiro dia.
          </p>
        </div>

        {/* Linha do Tempo Reativa */}
        <div className="relative" id="process-timeline-container">
          
          {/* Linha Conectora de Fundo (Apenas Desktop) */}
          <div className="hidden lg:block absolute top-[43px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-slate-200 via-slate-400 to-slate-200 dark:from-neutral-900/10 dark:via-neutral-800/50 dark:to-neutral-900/10 -z-10" />

          {/* Grid de Passos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10" id="process-steps-grid">
            {processData.map((step, idx) => {
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                  className="group relative flex flex-col items-center lg:items-start text-center lg:text-left bg-white dark:bg-[#0D0D11] border border-slate-200/60 dark:border-neutral-800 p-8 rounded-3xl shadow-sm hover:border-slate-400 dark:hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-500/5 transition-all duration-300"
                >
                  {/* Número / Indicador Circular */}
                  <div className="w-12 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-neutral-800 dark:text-neutral-200 group-hover:bg-slate-950 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-950 transition-all duration-300 shadow-sm">
                    <span className="font-display font-bold text-lg">{step.step}</span>
                  </div>

                  {/* Tag de Cronograma / Duração */}
                  <div className="mt-4 inline-block px-2.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 font-mono text-[10px] font-bold tracking-wider uppercase">
                    {step.duration}
                  </div>

                  {/* Informações Textuais */}
                  <div className="mt-4 space-y-2">
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-slate-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
