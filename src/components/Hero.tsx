import { motion } from "motion/react";
import { ArrowUpRight, MessageSquare, Play, Sparkles, Star, ShieldCheck, Zap } from "lucide-react";
import { agencyConfig, getWhatsAppLink } from "../data";

interface HeroProps {
  onBudgetClick: () => void;
}

export default function Hero({ onBudgetClick }: HeroProps) {
  const handleWAContact = () => {
    window.open(getWhatsAppLink("Olá! Gostaria de falar com um especialista sobre o crescimento da minha empresa."), "_blank");
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-slate-50/50 dark:bg-[#0A0A0C] transition-colors bg-dot-pattern"
    >
      {/* Decorative Blur Backdrops for Apple/Vercel visual mood */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-slate-400/10 dark:bg-neutral-800/5 rounded-full blur-[120px] animate-pulse-slow pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[300px] h-[300px] bg-slate-400/10 dark:bg-neutral-800/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Lado Esquerdo - Chamada Textual */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left" id="hero-text-container">
            
            {/* Badge de Destaque Premium */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full mb-6"
            >
              Agência Digital Premium
            </motion.div>

            {/* Título Principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[54px] text-slate-900 dark:text-white tracking-tight leading-[1.1]"
              id="hero-title"
            >
              Crescimento digital para <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500 dark:from-white dark:to-neutral-400">
                empresas escaláveis.
              </span>
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-md mx-auto lg:mx-0 text-slate-500 dark:text-neutral-400 text-lg mb-8 leading-relaxed font-light"
              id="hero-subtitle"
            >
              Criamos sites profissionais, sistemas e tráfego pago para transformar visitantes em clientes reais.
            </motion.p>

            {/* Botões de Ação */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              id="hero-actions"
            >
              {/* Botão Solicitar Orçamento */}
              <button
                onClick={onBudgetClick}
                className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white dark:bg-white dark:text-slate-900 rounded-2xl font-bold hover:bg-black dark:hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                id="hero-cta-primary"
              >
                <span>Solicitar Orçamento</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
              </button>

              {/* Botão Falar no WhatsApp */}
              <button
                onClick={handleWAContact}
                className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-[#0D0D11] border border-slate-200 dark:border-neutral-800 text-slate-900 dark:text-white rounded-2xl font-bold hover:bg-slate-50 dark:hover:bg-neutral-900 transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                id="hero-cta-secondary"
              >
                <span>Falar no WhatsApp</span>
              </button>
            </motion.div>

            {/* Trust Badges - Metas de Elite */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="pt-6 border-t border-slate-100 dark:border-neutral-900 flex flex-wrap items-center justify-center lg:justify-start gap-y-4 gap-x-8"
              id="hero-trust-row"
            >
              <div className="flex items-center space-x-1.5">
                <ShieldCheck className="w-4.5 h-4.5 text-slate-900 dark:text-neutral-300" />
                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                  +120 Projetos Premium Entregues
                </span>
              </div>

              <div className="flex items-center space-x-1.5">
                <Zap className="w-4.5 h-4.5 text-emerald-500" />
                <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                  Lighthouse Speed &gt;95%
                </span>
              </div>
            </motion.div>

          </div>

          {/* Lado Direito - Mockup Interativo e Animado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative w-full h-[460px] sm:h-[500px] rounded-3xl border border-slate-200/60 dark:border-neutral-800 bg-white dark:bg-[#0D0D11] shadow-sm p-6 overflow-hidden flex flex-col justify-between"
            id="hero-interactive-dashboard"
          >
            {/* Header do Mockup */}
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="flex items-center space-x-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <span className="text-xs font-mono text-neutral-400 dark:text-neutral-500 pl-2">
                  vertex-analytics-stream
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-500 text-[10px] font-mono uppercase tracking-wider animate-pulse">
                  ● live
                </span>
              </div>
            </div>

            {/* Gráfico Simulado */}
            <div className="flex-1 py-4 flex flex-col justify-end space-y-3 relative">
              
              {/* Backlight de Fundo do Dashboard */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-slate-300/10 dark:bg-neutral-800/10 rounded-full blur-[60px] pointer-events-none" />

              {/* Estatísticas Principais */}
              <div className="grid grid-cols-1 gap-4 relative z-10">
                <div className="p-3.5 rounded-xl border border-neutral-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-950/40">
                  <div className="text-[10px] font-mono text-neutral-400 uppercase">Leads Qualificados</div>
                  <div className="text-2xl font-display font-semibold text-neutral-900 dark:text-white mt-1">4.821</div>
                  <div className="text-[10px] text-emerald-500 font-semibold flex items-center mt-0.5">
                    ↑ 38.4% esta semana
                  </div>
                </div>
              </div>

              {/* Colunas do Gráfico de Conversão */}
              <div className="h-28 flex items-end justify-between px-2 pt-4 border-b border-neutral-200 dark:border-neutral-800 relative z-10">
                {[40, 55, 30, 80, 45, 95, 75, 85, 60, 100].map((h, index) => (
                  <motion.div
                    key={index}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1.2, delay: index * 0.05, ease: "easeOut" }}
                    className="w-[7%] rounded-t-sm bg-gradient-to-t from-slate-950 via-slate-700 to-slate-400 dark:from-white dark:via-neutral-300 dark:to-neutral-500 relative group"
                  >
                    {/* Tooltip de valor */}
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-[10px] font-mono px-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-30">
                      +{h}%
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terminal de Atividade Inteligente Simulado */}
            <div className="p-4.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 font-mono text-xs text-neutral-500 space-y-1.5 relative z-10">
              <div className="flex items-center text-slate-900 dark:text-neutral-250 font-semibold">
                <Zap className="w-3.5 h-3.5 mr-1.5 animate-pulse text-slate-900 dark:text-white" />
                <span>Vertex IA Agent #049: ATIVO</span>
              </div>
              <div className="text-[11px] text-neutral-600 dark:text-neutral-400 truncate">
                &gt; Qualificando lead "Guilherme S. - Vanguard Imóveis"...
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-2 animate-ping" />
                [IA] Lead qualificado com sucesso! Agendando orçamento...
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
