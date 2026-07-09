import React from "react";
import { motion } from "motion/react";
import { TrendingUp, Monitor, Database, Brain, Check, ArrowRight, Sparkles } from "lucide-react";
import { servicesData } from "../data";
import { Service } from "../types";

interface ServicesProps {
  onSelectService: (serviceId: string) => void;
}

// Mapeamento dinâmico e seguro de ícones Lucide para evitar imports pesados
const iconMap: Record<string, React.ComponentType<any>> = {
  TrendingUp: TrendingUp,
  Monitor: Monitor,
  Database: Database,
  BrainCircuit: Brain,
};

export default function Services({ onSelectService }: ServicesProps) {
  return (
    <section
      id="servicos"
      className="py-24 bg-slate-50/50 dark:bg-[#05070D] transition-colors border-y border-slate-100 dark:border-blue-950/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4" id="services-header">
          <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-blue-950/40 text-neutral-800 dark:text-blue-400 border border-transparent dark:border-blue-500/20 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Nossos Serviços
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Tecnologia e marketing de elite <br className="hidden sm:inline" /> para tracionar o seu faturamento.
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg font-light">
            Soluções completas desenhadas para automatizar processos, atrair tráfego hiper-qualificado e transformar cliques em lucro real.
          </p>
        </div>

        {/* Grid de Serviços */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8" id="services-grid">
          {servicesData.map((service: Service, idx) => {
            const IconComponent = iconMap[service.icon] || Monitor;
            
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="group relative rounded-3xl border border-slate-200/60 dark:border-blue-500/20 bg-white dark:bg-[#05070D] p-8 hover:border-[#2563EB]/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] hover:shadow-blue-500/5 transition-all duration-300 flex flex-col justify-between"
                id={`service-card-${service.id}`}
              >
                <div className="space-y-6">
                  {/* Ícone & Categoria */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 bg-neutral-100 dark:bg-blue-950/40 text-neutral-800 dark:text-[#2563EB] group-hover:bg-[#2563EB] dark:group-hover:bg-[#2563EB] group-hover:text-white dark:group-hover:text-white rounded-xl flex items-center justify-center transition-all duration-300">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-slate-50 dark:bg-blue-950/20 text-slate-500 dark:text-blue-400 border border-transparent dark:border-blue-500/10">
                      {service.priceEstimate}
                    </span>
                  </div>

                  {/* Detalhes do Serviço */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-xl text-slate-900 dark:text-white">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 dark:text-neutral-400 text-sm leading-relaxed font-light">
                      {service.description}
                    </p>
                  </div>

                  {/* Bullet Points */}
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2.5 pt-4 border-t border-slate-100 dark:border-blue-950/50">
                    {service.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2 text-xs text-slate-500 dark:text-neutral-400 leading-tight">
                        <Check className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Botão de Solicitação Conectado */}
                <div className="pt-8 mt-6">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-xl border border-slate-200 dark:border-blue-500/20 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white dark:hover:bg-[#2563EB] dark:hover:text-white text-slate-900 dark:text-white font-bold text-sm transition-all active:scale-[0.99] cursor-pointer hover:shadow-[0_0_15px_rgba(37,99,235,0.3)]"
                  >
                    <span>Selecionar para Orçamento</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
