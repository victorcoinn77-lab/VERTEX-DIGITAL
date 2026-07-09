import { motion } from "motion/react";
import { Quote, Star, Users } from "lucide-react";
import { testimonialsData } from "../data";

export default function Testimonials() {
  return (
    <section
      id="depoimentos"
      className="py-24 bg-slate-50/50 dark:bg-[#08080A] transition-colors border-y border-slate-100 dark:border-neutral-900/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Cabeçalho da Seção */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4" id="testimonials-header">
          <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
            Depoimentos
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Parcerias que geram faturamentos históricos.
          </h2>
          <p className="text-slate-500 dark:text-neutral-400 text-base sm:text-lg font-light">
            Não acredite apenas em nossas palavras. Ouça os fundadores, diretores e tomadores de decisão das empresas que escalaram conosco.
          </p>
        </div>

        {/* Grid de Depoimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" id="testimonials-grid">
          {testimonialsData.map((test, idx) => (
            <motion.div
              key={test.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group p-8 rounded-3xl border border-slate-200/60 dark:border-neutral-800 bg-white dark:bg-[#0D0D11] hover:border-slate-400 dark:hover:border-neutral-700 hover:shadow-xl hover:shadow-neutral-500/5 transition-all duration-300 flex flex-col justify-between space-y-6"
              id={`testimonial-card-${idx}`}
            >
              <div className="space-y-4">
                {/* Linha de Estrelas & Ícone Quote */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-0.5">
                    {Array.from({ length: test.rating }).map((_, rIdx) => (
                      <Star key={rIdx} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-slate-500/10 dark:text-neutral-500/5 group-hover:text-slate-900/10 dark:group-hover:text-white/10 transition-colors" />
                </div>

                {/* Texto do Depoimento */}
                <p className="text-slate-500 dark:text-neutral-300 text-xs sm:text-sm leading-relaxed font-light italic">
                  "{test.text}"
                </p>
              </div>

              {/* Perfil do Cliente */}
              <div className="flex items-center space-x-4 pt-4 border-t border-slate-100 dark:border-neutral-900/40">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-slate-200 dark:border-neutral-800"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                    {test.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-neutral-500">
                    {test.role} na <span className="font-semibold text-slate-900 dark:text-slate-200">{test.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
