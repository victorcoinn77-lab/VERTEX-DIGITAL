import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Sparkles } from "lucide-react";
import { faqData } from "../data";
import { FAQItem } from "../types";

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<string>("all");

  const categories = [
    { id: "all", label: "Todas" },
    { id: "services", label: "Serviços" },
    { id: "process", label: "Processo" },
    { id: "investment", label: "Investimento" },
    { id: "support", label: "Suporte & Pós" },
  ];

  const toggleAccordion = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = activeTab === "all"
    ? faqData
    : faqData.filter((faq) => faq.category === activeTab);

  return (
    <section
      id="faq"
      className="py-24 bg-white dark:bg-[#05070D] transition-colors"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="text-center mb-16 space-y-4" id="faq-header">
          <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-blue-950/40 text-neutral-800 dark:text-blue-400 border border-transparent dark:border-blue-500/20 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Perguntas Frequentes
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Tire todas as suas dúvidas.
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg font-light">
            Transparência absoluta. Se você não encontrar o que procura aqui, clique no botão de WhatsApp para falar direto com nosso time.
          </p>
        </div>

        {/* Filtro de Categorias */}
        <div className="flex flex-wrap justify-center gap-1.5 mb-10" id="faq-category-filters">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveTab(category.id);
                setOpenId(null); // Reseta accordions ao trocar categoria
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === category.id
                  ? "bg-[#2563EB] text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                  : "text-slate-500 dark:text-neutral-400 hover:text-[#2563EB] dark:hover:text-[#2563EB] hover:bg-slate-50 dark:hover:bg-blue-950/20"
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Lista de Accordions */}
        <div className="space-y-4" id="faq-accordions-list">
          {filteredFaqs.map((faq: FAQItem) => {
            const isOpen = openId === faq.id;
            
            return (
              <div
                key={faq.id}
                className="rounded-3xl border border-slate-200/60 dark:border-blue-500/20 bg-white dark:bg-[#05070D] hover:border-blue-500/40 hover:shadow-[0_0_20px_rgba(37,99,235,0.05)] transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full flex items-center justify-between p-5 text-left font-display font-semibold text-sm sm:text-base text-slate-900 dark:text-white transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <div className={`p-1 rounded-lg border border-slate-100 dark:border-blue-500/20 bg-white dark:bg-blue-950/20 text-slate-400 dark:text-neutral-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#2563EB] dark:text-white font-bold border-[#2563EB]/40 bg-blue-950/40" : ""}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-500 dark:text-neutral-400 leading-relaxed font-light border-t border-slate-100 dark:border-blue-950/40">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
