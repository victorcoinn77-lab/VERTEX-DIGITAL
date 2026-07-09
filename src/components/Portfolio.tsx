import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { portfolioData } from "../data";
import { PortfolioProject } from "../types";

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todos" },
    { id: "traffic", label: "Tráfego Pago" },
    { id: "web", label: "Sites & E-commerce" },
    { id: "saas", label: "Sistemas & SaaS" },
    { id: "ai", label: "Inteligência Artificial" },
  ];

  const filteredProjects = activeCategory === "all"
    ? portfolioData
    : portfolioData.filter((project) => project.category === activeCategory);

  return (
    <section
      id="portfolio"
      className="py-24 bg-white dark:bg-[#0A0A0C] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4" id="portfolio-header">
          <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Portfólio
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Nossos projetos de alta performance.
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg font-light">
            Conheça alguns dos ecossistemas digitais que desenvolvemos e campanhas de anúncios que escalaram faturamentos de marcas no Brasil e exterior.
          </p>
        </div>

        {/* Filtros por Categorias (Com Animação de LayoutId do Framer Motion) */}
        <div className="flex flex-wrap justify-center gap-2 mb-16" id="portfolio-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`relative px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                activeCategory === category.id
                  ? "text-white dark:text-slate-950 z-10"
                  : "text-slate-500 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-neutral-900"
              }`}
            >
              <span className="relative z-10">{category.label}</span>
              {activeCategory === category.id && (
                <motion.div
                  layoutId="activeCategoryBg"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-slate-950 dark:bg-white rounded-full -z-0"
                />
              )}
            </button>
          ))}
        </div>

        {/* Grid Animação de Projetos */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          id="portfolio-grid"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: PortfolioProject, idx) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={project.title}
                className="group relative rounded-3xl border border-slate-200/60 dark:border-neutral-800 bg-white dark:bg-[#0D0D11] overflow-hidden flex flex-col justify-between hover:border-slate-400 dark:hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-500/5 transition-all duration-300"
                id={`portfolio-card-${idx}`}
              >
                {/* Imagem do Projeto com Slow Zoom */}
                <div>
                  <div className="relative aspect-video overflow-hidden bg-slate-50 dark:bg-neutral-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />
                    
                    {/* Badge do Resultado (Esquerda) */}
                    <div className="absolute bottom-4 left-4 inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold shadow-md">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{project.results}</span>
                    </div>
                  </div>

                  {/* Informações */}
                  <div className="p-6 space-y-3">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded bg-slate-50 dark:bg-neutral-900 text-slate-500 dark:text-neutral-400">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white group-hover:text-slate-950 dark:group-hover:text-white transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-slate-500 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed font-light">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer do Card com Botão de Ação */}
                <div className="p-6 pt-0 border-t border-slate-100 dark:border-neutral-900/50 flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-neutral-400">
                  <span>VERTEX DIGITAL CASE</span>
                  <div className="flex items-center space-x-1 text-slate-900 dark:text-slate-200 group-hover:translate-x-1 transition-transform">
                    <span>Ver Estudo</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
