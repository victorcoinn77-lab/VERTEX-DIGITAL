import React, { useState, useEffect } from "react";
import { 
  Check, 
  ArrowRight, 
  Send, 
  Sparkles, 
  Users, 
  TrendingUp, 
  Award, 
  MessageCircle,
  Phone,
  User,
  Building,
  Globe,
  Cpu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import ParticleSphere from "./components/ParticleSphere";
import Magnetic from "./components/Magnetic";
import BackgroundLines from "./components/BackgroundLines";
import { TrafficIcon, WebsiteIcon, SaasIcon } from "./components/TechIcons";

// Constantes locais para a Vertex Digital
const WHATSAPP_NUMBER = "5562985463735";
const PHONE_FORMATTED = "(62) 98546-3735";

// Variantes de animação de entrada reutilizáveis (Scroll-triggered Fade + Slide)
const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

export default function App() {
  // Estado do Formulário
  const [formData, setFormData] = useState({
    nome: "",
    whatsapp: "",
    empresa: "",
    objetivo: "",
    servico: ""
  });

  const [errors, setErrors] = useState({
    nome: false,
    whatsapp: false,
    empresa: false,
    objetivo: false,
    servico: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Estados de Interatividade Premium (Spotlight & Cursor Customizado)
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Geração de partículas flutuantes ultra-leves apenas no cliente
    const generated = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1.2, // Partículas de 1.2px a 3.2px
      duration: Math.random() * 14 + 10, // Ciclo lento de 10s a 24s
      delay: Math.random() * -12, // Offset para fase de animação assíncrona
    }));
    setParticles(generated);

    // Rastreador dinâmico do cursor para Spotlight e Cursor Customizado
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      // Verifica se o cursor está sobre um componente clicável para mudar o estado do pointer
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = 
          target.closest('button') || 
          target.closest('a') || 
          target.closest('input') || 
          target.closest('select') || 
          target.closest('.cursor-pointer') || 
          window.getComputedStyle(target).cursor === 'pointer';
        setIsHoveringClickable(!!isClickable);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Máscara dinâmica de WhatsApp / Telefone brasileiro (XX) XXXXX-XXXX
  const formatWhatsApp = (value: string) => {
    const raw = value.replace(/\D/g, "");
    if (raw.length <= 2) return raw;
    if (raw.length <= 6) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length <= 10) return `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWhatsApp(e.target.value);
    setFormData(prev => ({ ...prev, whatsapp: formatted }));
    if (errors.whatsapp) setErrors(prev => ({ ...prev, whatsapp: false }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  // Rola até o formulário de conversão
  const scrollToForm = () => {
    const element = document.getElementById("lead-form");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Envia e Redireciona para o WhatsApp
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação Simples
    const newErrors = {
      nome: formData.nome.trim() === "",
      whatsapp: formData.whatsapp.replace(/\D/g, "").length < 10,
      empresa: formData.empresa.trim() === "",
      objetivo: formData.objetivo === "",
      servico: formData.servico === ""
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    setIsSubmitting(true);

    // Pequena animação de envio premium (800ms) para gerar valor de carregamento
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);

      const messageText = `Olá, Vertex Digital! Acabei de solicitar uma Consultoria Gratuita através do formulário do site:\n\n` +
                          `👤 *Nome:* ${formData.nome}\n` +
                          `📞 *WhatsApp:* ${formData.whatsapp}\n` +
                          `🏢 *Empresa:* ${formData.empresa}\n` +
                          `🎯 *Principal Objetivo:* ${formData.objetivo}\n` +
                          `🛠️ *Serviço Procurado:* ${formData.servico}`;

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;
      
      // Executa o redirecionamento
      window.open(whatsappUrl, "_blank");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#030712] text-[#FFFFFF] font-sans relative overflow-x-hidden selection:bg-[#2563EB]/40 selection:text-white">
      
      {/* Linhas de Grade e Vetores Digitais de Fundo (Padrão Stripe / Linear) */}
      <BackgroundLines />
      
      {/* 2. SPOTLIGHT OVERLAY (Acompanha o mouse de forma ultra sutil e elegante) */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500 opacity-70 hidden md:block"
        style={{
          background: `radial-gradient(550px circle at ${cursorPos.x}px ${cursorPos.y}px, rgba(37, 99, 235, 0.05), transparent 80%)`
        }}
      />

      {/* 8. CURSOR PERSONALIZADO (Apenas visível em desktops, elegante e fluido) */}
      <div 
        className="hidden md:block pointer-events-none fixed z-50 rounded-full bg-[#3B82F6] transition-transform duration-100 ease-out -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(59,130,246,0.8)]"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: isHoveringClickable ? '8px' : '6px',
          height: isHoveringClickable ? '8px' : '6px',
        }}
      />
      <div 
        className="hidden md:block pointer-events-none fixed z-50 rounded-full border border-[#2563EB]/40 transition-all duration-300 ease-out -translate-x-1/2 -translate-y-1/2"
        style={{
          left: `${cursorPos.x}px`,
          top: `${cursorPos.y}px`,
          width: isHoveringClickable ? '38px' : '22px',
          height: isHoveringClickable ? '38px' : '22px',
          backgroundColor: isHoveringClickable ? 'rgba(37, 99, 235, 0.06)' : 'transparent',
        }}
      />

      {/* 1. PARTICULAS AZUIS DE MOVIMENTO LENTO (Fundo Tecnológico) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-blue-500/25 pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 15, 0],
              opacity: [0.15, 0.6, 0.15],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Detalhes de iluminação e gradientes premium nas bordas do design */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[450px] h-[450px] bg-gradient-to-br from-[#2563EB]/12 to-transparent rounded-full blur-[130px] pointer-events-none -z-10 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-0 w-[550px] h-[550px] bg-gradient-to-br from-[#3B82F6]/7 to-transparent rounded-full blur-[150px] pointer-events-none -z-10" />

      {/* Grid sutil que remete a tráfego e conexões */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none -z-10" />

      {/* HEADER ULTRA MINIMALISTA (Apenas a Marca) */}
      <motion.header 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center relative z-10"
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3B82F6] via-[#2563EB] to-[#1D4ED8] p-[1.5px] shadow-[0_0_15px_rgba(37,99,235,0.25)]">
            <div className="w-full h-full bg-[#0B0F19] rounded-[7px] flex items-center justify-center">
              <span className="font-display font-bold text-xs tracking-wider text-[#3B82F6]">V</span>
            </div>
          </div>
          <span className="font-display font-extrabold text-sm sm:text-base tracking-[0.2em] text-[#FFFFFF]">
            VERTEX<span className="text-[#3B82F6] font-light">DIGITAL</span>
          </span>
        </div>
        
        {/* Selo discreto de Alta Performance */}
        <div className="hidden sm:flex items-center space-x-2 text-[10px] tracking-widest uppercase text-zinc-500 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-ping" />
          <span>Foco Absoluto em Conversão</span>
        </div>
      </motion.header>

      {/* 1. HERO SECTION (100% da primeira tela com Esfera de Partículas) */}
      <section className="w-full min-h-[calc(100vh-100px)] relative z-10 flex flex-col items-center justify-center text-center px-6 py-12 md:py-20 overflow-hidden">
        {/* Esfera de Partículas 3D Interativa de Alta Performance */}
        <ParticleSphere />
        
        <div className="relative z-10 flex flex-col items-center max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 px-3 py-1 bg-slate-900/80 border border-[#2563EB]/25 rounded-full text-[11px] font-semibold uppercase tracking-[0.15em] text-[#3B82F6] mb-8 shadow-[0_0_15px_rgba(37,99,235,0.05)]"
          >
            <Sparkles className="w-3 h-3 text-[#3B82F6]" />
            <span>Tecnologia & Crescimento Digital</span>
          </motion.div>

          {/* Título Grande e Elegante com Brilho Animado */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[1.05] text-[#FFFFFF] max-w-5xl mb-8"
          >
            <span className="premium-title-gradient">Transformamos ideias</span> <br />
            <span className="text-gradient-blue">em resultados digitais.</span>
          </motion.h1>

          {/* Subtítulo Clean */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-400 text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-3xl mb-12"
          >
            Da criação do seu site à gestão de tráfego e desenvolvimento de sistemas personalizados, a Vertex Digital entrega soluções para fazer sua empresa crescer.
          </motion.p>

          {/* Botão de Destaque Premium Magnético com Gradiente, Glow e Shine Sweep */}
          <Magnetic>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={scrollToForm}
              className="relative group inline-flex items-center space-x-3 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-[#FFFFFF] font-bold text-base px-8 py-5 rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_30px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] cursor-pointer overflow-hidden"
            >
              {/* Sweep de brilho passando periodicamente no hover */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
              <span>Solicitar uma Consultoria Gratuita</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </motion.button>
          </Magnetic>

          {/* Indicador de rolagem */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-16 text-xs text-zinc-500 font-mono tracking-widest uppercase flex flex-col items-center space-y-2"
          >
            <span>Role para iniciar</span>
            <div className="w-1 h-8 bg-gradient-to-b from-[#2563EB] to-transparent rounded-full animate-pulse" />
          </motion.div>
        </div>
      </section>

      {/* 1.5. NOSSAS SOLUÇÕES */}
      <section className="max-w-6xl mx-auto px-6 py-24 relative z-10 border-t border-slate-800/20">
        
        <motion.div 
          {...fadeInUp}
          className="text-center mb-20"
        >
          <span className="text-[#3B82F6] text-xs font-semibold uppercase tracking-[0.2em] font-mono">Portfólio de Serviços</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mt-3 premium-title-gradient">
            Nossas Soluções
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base font-light max-w-xl mx-auto mt-4">
            Aceleramos o crescimento da sua empresa unindo tráfego qualificado, design de alta conversão e sistemas inteligentes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          
          {/* Serviço 1: Gestão de Tráfego Pago */}
          <motion.div 
            {...fadeInUp}
            className="glass-panel rounded-3xl p-6 sm:p-8 hover:border-[#3B82F6]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left group"
          >
            <div className="w-16 h-16 bg-[#040817]/90 border border-[#2563EB]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B82F6]/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
              <TrafficIcon />
            </div>
            <div className="space-y-1 mb-3">
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#3B82F6] transition-colors duration-300">
                Gestão de Tráfego Pago
              </h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Criamos campanhas estratégicas no Facebook, Instagram e Google para gerar clientes qualificados e aumentar suas vendas.
            </p>
          </motion.div>

          {/* Serviço 2: Criação de Sites Profissionais */}
          <motion.div 
            {...fadeInUp}
            className="glass-panel rounded-3xl p-6 sm:p-8 hover:border-[#3B82F6]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left group"
          >
            <div className="w-16 h-16 bg-[#040817]/90 border border-[#2563EB]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B82F6]/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
              <WebsiteIcon />
            </div>
            <div className="space-y-1 mb-3">
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#3B82F6] transition-colors duration-300">
                Criação de Sites Profissionais
              </h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Desenvolvemos sites modernos, rápidos, responsivos e focados em conversão para empresas de qualquer segmento.
            </p>
          </motion.div>

          {/* Serviço 3: Desenvolvimento de Mini SaaS */}
          <motion.div 
            {...fadeInUp}
            className="glass-panel rounded-3xl p-6 sm:p-8 hover:border-[#3B82F6]/40 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(37,99,235,0.12)] transition-all duration-300 flex flex-col items-center md:items-start text-center md:text-left group"
          >
            <div className="w-16 h-16 bg-[#040817]/90 border border-[#2563EB]/20 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B82F6]/50 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] transition-all duration-300">
              <SaasIcon />
            </div>
            <div className="space-y-1 mb-3">
              <h3 className="font-display font-bold text-xl text-white group-hover:text-[#3B82F6] transition-colors duration-300">
                Desenvolvimento de Mini SaaS
              </h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Criamos sistemas personalizados, plataformas web e soluções digitais para automatizar processos, reduzir custos e aumentar a produtividade da sua empresa.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 2. FORMULÁRIO DE CONVERSÃO EXTREMA (Fundo das Seções via Gradientes Fluidos) */}
      <section id="lead-form" className="py-24 bg-gradient-to-b from-[#030712] via-[#05091a] to-[#030712] border-y border-slate-900/60 relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />
        
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          
          <motion.div 
            {...fadeInUp}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#FFFFFF] mb-4 premium-title-gradient">
              Receba um Diagnóstico de Vendas
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base font-light max-w-lg mx-auto">
              Preencha os campos abaixo para analisarmos sua presença digital e iniciarmos sua jornada de escala via WhatsApp.
            </p>
          </motion.div>

          {/* Card do Formulário com Glassmorphic Premium treatment e sutil borda azul */}
          <motion.div 
            {...fadeInUp}
            className="glass-panel rounded-[32px] p-8 sm:p-12 shadow-[0_0_50px_rgba(37,99,235,0.02)] hover:border-[#3B82F6]/35 hover:shadow-[0_0_35px_rgba(59,130,246,0.08)] transition-all duration-500"
          >
            
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Campo: Nome */}
                  <div className="space-y-2">
                    <label htmlFor="nome" className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Seu Nome completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="nome"
                        id="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        placeholder="Ex: Guilherme Siqueira"
                        className={`w-full bg-slate-950/80 text-white text-sm px-4 py-4 pl-11 rounded-xl border transition-all duration-300 outline-none ${
                          errors.nome 
                            ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                            : "border-slate-800/80 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20"
                        }`}
                      />
                    </div>
                    {errors.nome && (
                      <span className="text-xs text-red-500 font-light block">Por favor, insira o seu nome completo.</span>
                    )}
                  </div>

                  {/* Campo: WhatsApp */}
                  <div className="space-y-2">
                    <label htmlFor="whatsapp" className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Seu WhatsApp de contato
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        name="whatsapp"
                        id="whatsapp"
                        value={formData.whatsapp}
                        onChange={handlePhoneChange}
                        placeholder="Ex: (62) 99999-9999"
                        className={`w-full bg-slate-950/80 text-white text-sm px-4 py-4 pl-11 rounded-xl border transition-all duration-300 outline-none ${
                          errors.whatsapp 
                            ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                            : "border-slate-800/80 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20"
                        }`}
                      />
                    </div>
                    {errors.whatsapp && (
                      <span className="text-xs text-red-500 font-light block">Insira um número de WhatsApp válido com DDD.</span>
                    )}
                  </div>

                  {/* Campo: Empresa */}
                  <div className="space-y-2">
                    <label htmlFor="empresa" className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Nome da sua Empresa
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-500">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="empresa"
                        id="empresa"
                        value={formData.empresa}
                        onChange={handleInputChange}
                        placeholder="Ex: Vanguard Imóveis"
                        className={`w-full bg-slate-950/80 text-white text-sm px-4 py-4 pl-11 rounded-xl border transition-all duration-300 outline-none ${
                          errors.empresa 
                            ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                            : "border-slate-800/80 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20"
                        }`}
                      />
                    </div>
                    {errors.empresa && (
                      <span className="text-xs text-red-500 font-light block">Insira o nome da sua empresa para a análise estratégica.</span>
                    )}
                  </div>

                  {/* Campo: Principal Objetivo */}
                  <div className="space-y-2">
                    <label htmlFor="objetivo" className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Qual é o seu principal objetivo?
                    </label>
                    <select
                      name="objetivo"
                      id="objetivo"
                      value={formData.objetivo}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-950/80 text-white text-sm px-4 py-4 rounded-xl border transition-all duration-300 outline-none cursor-pointer ${
                        errors.objetivo 
                          ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                          : "border-slate-800/80 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20"
                      }`}
                    >
                      <option value="">Selecione uma opção...</option>
                      <option value="Gerar mais Leads qualificados">Gerar mais Leads qualificados</option>
                      <option value="Aumentar vendas imediatas">Aumentar vendas imediatas</option>
                      <option value="Otimizar investimento e ROI">Otimizar investimento e ROI</option>
                      <option value="Escalar faturamento mensal">Escalar faturamento mensal</option>
                    </select>
                    {errors.objetivo && (
                      <span className="text-xs text-red-500 font-light block">Selecione uma opção de objetivo principal.</span>
                    )}
                  </div>

                  {/* Campo: Qual serviço você procura? */}
                  <div className="space-y-2">
                    <label htmlFor="servico" className="block text-xs font-semibold uppercase tracking-[0.15em] text-zinc-400">
                      Qual serviço você procura?
                    </label>
                    <select
                      name="servico"
                      id="servico"
                      value={formData.servico}
                      onChange={handleInputChange}
                      className={`w-full bg-slate-950/80 text-white text-sm px-4 py-4 rounded-xl border transition-all duration-300 outline-none cursor-pointer ${
                        errors.servico 
                          ? "border-red-500/80 focus:border-red-500 focus:ring-1 focus:ring-red-500/20" 
                          : "border-slate-800/80 focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20"
                      }`}
                    >
                      <option value="">Selecione uma opção...</option>
                      <option value="Gestão de Tráfego Pago">Gestão de Tráfego Pago</option>
                      <option value="Criação de Site">Criação de Site</option>
                      <option value="Desenvolvimento de Mini SaaS">Desenvolvimento de Mini SaaS</option>
                      <option value="Ainda não sei, preciso de uma consultoria">Ainda não sei, preciso de uma consultoria</option>
                    </select>
                    {errors.servico && (
                      <span className="text-xs text-red-500 font-light block">Selecione uma opção de serviço.</span>
                    )}
                  </div>

                  {/* Botão de Envio de Conversão Premium com Sweep e active scale click animation */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative overflow-hidden flex items-center justify-center space-x-2.5 py-4 px-6 rounded-xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-[#FFFFFF] hover:scale-[1.03] active:scale-[0.97] font-bold text-base transition-all duration-300 cursor-pointer shadow-[0_0_20px_rgba(37,99,235,0.25)] hover:shadow-[0_0_35px_rgba(37,99,235,0.5)] disabled:opacity-50"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
                    {isSubmitting ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#FFFFFF] border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#FFFFFF]" />
                        <span>Solicitar uma Consultoria Gratuita</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-zinc-500 text-center font-mono uppercase tracking-wider">
                    🔒 Conexão segura. Seus dados estão protegidos.
                  </p>

                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-[#2563EB]/10 border border-[#2563EB] rounded-full flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(37,99,235,0.2)]">
                    <Check className="w-8 h-8 text-[#3B82F6]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-2xl text-white">Solicitação Enviada!</h3>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto">
                      Iniciando redirecionamento seguro para o nosso WhatsApp para apresentar o seu diagnóstico gratuito...
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const messageText = `Olá, Vertex Digital! Acabei de solicitar uma Consultoria Gratuita através do formulário do site:\n\n` +
                                          `👤 *Nome:* ${formData.nome}\n` +
                                          `📞 *WhatsApp:* ${formData.whatsapp}\n` +
                                          `🏢 *Empresa:* ${formData.empresa}\n` +
                                          `🎯 *Principal Objetivo:* ${formData.objetivo}\n` +
                                          `🛠️ *Serviço Procurado:* ${formData.servico}`;
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`, "_blank");
                    }}
                    className="inline-flex items-center space-x-2 text-sm text-[#3B82F6] hover:underline font-semibold"
                  >
                    <span>Clique aqui se não for redirecionado</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </motion.div>

        </div>
      </section>

      {/* 3. BENEFÍCIOS (Apenas 3 Benefícios de Alta Conversão com Glassmorphism, Microinterações e Scroll Entrance) */}
      <section className="max-w-6xl mx-auto px-6 py-28 relative z-10">
        
        <motion.div 
          {...fadeInUp}
          className="text-center mb-20"
        >
          <span className="text-[#3B82F6] text-xs font-semibold uppercase tracking-[0.2em] font-mono">Por que a Vertex?</span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl tracking-tight text-white mt-3 premium-title-gradient">
            O pilar do seu crescimento digital
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* Benefício 1 */}
          <motion.div 
            {...fadeInUp}
            className="flex flex-col items-center md:items-start text-center md:text-left group p-6 sm:p-8 rounded-3xl bg-[#040817]/40 backdrop-blur-md border border-[#2563EB]/10 hover:border-[#3B82F6]/40 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-2 hover:bg-[#040817]/60 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-[#040817]/90 border border-[#2563EB]/15 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B82F6]/45 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all duration-300">
              <Users className="w-6 h-6 text-[#3B82F6] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="space-y-1 mb-3">
              <span className="font-display font-light text-xl text-zinc-500 font-mono">01/</span>
              <h3 className="font-display font-bold text-2xl text-white">
                Mais clientes qualificados
              </h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Foco absoluto em atrair contatos qualificados com alto poder de compra, garantindo que suas campanhas falem com quem realmente quer e pode comprar.
            </p>
          </motion.div>

          {/* Benefício 2 */}
          <motion.div 
            {...fadeInUp}
            className="flex flex-col items-center md:items-start text-center md:text-left group p-6 sm:p-8 rounded-3xl bg-[#040817]/40 backdrop-blur-md border border-[#2563EB]/10 hover:border-[#3B82F6]/40 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-2 hover:bg-[#040817]/60 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-[#040817]/90 border border-[#2563EB]/15 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B82F6]/45 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all duration-300">
              <TrendingUp className="w-6 h-6 text-[#3B82F6] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="space-y-1 mb-3">
              <span className="font-display font-light text-xl text-zinc-500 font-mono">02/</span>
              <h3 className="font-display font-bold text-2xl text-white">
                Campanhas otimizadas para ROI
              </h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Cada centavo investido é monitorado rigorosamente. Analisamos métricas de negócios reais para otimizar os criativos e elevar o retorno sobre o investimento.
            </p>
          </motion.div>

          {/* Benefício 3 */}
          <motion.div 
            {...fadeInUp}
            className="flex flex-col items-center md:items-start text-center md:text-left group p-6 sm:p-8 rounded-3xl bg-[#040817]/40 backdrop-blur-md border border-[#2563EB]/10 hover:border-[#3B82F6]/40 shadow-[0_4px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)] hover:-translate-y-2 hover:bg-[#040817]/60 transition-all duration-300"
          >
            <div className="w-14 h-14 bg-[#040817]/90 border border-[#2563EB]/15 rounded-2xl flex items-center justify-center mb-6 group-hover:border-[#3B82F6]/45 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.15)] transition-all duration-300">
              <Award className="w-6 h-6 text-[#3B82F6] transition-transform duration-300 group-hover:scale-110" />
            </div>
            <div className="space-y-1 mb-3">
              <span className="font-display font-light text-xl text-zinc-500 font-mono">03/</span>
              <h3 className="font-display font-bold text-2xl text-white">
                Atendimento personalizado
              </h3>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Nada de robôs genéricos ou tickets infinitos. Você conta com acompanhamento tático próximo de especialistas para otimizar suas estratégias continuamente.
            </p>
          </motion.div>

        </div>
      </section>

      {/* 4. CHAMADA FINAL */}
      <section className="bg-gradient-to-b from-[#030712] via-[#05091a] to-[#030712] py-28 relative overflow-hidden border-t border-slate-900/60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#2563EB]/5 rounded-full blur-[120px] pointer-events-none" />
        
        <motion.div 
          {...fadeInUp}
          className="max-w-4xl mx-auto px-6 text-center relative z-10 space-y-10"
        >
          
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-tight">
            <span className="premium-title-gradient">Pronto para atrair</span> <br />
            <span className="text-gradient-blue">mais clientes?</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-2xl mx-auto">
            Fale diretamente com nossa liderança técnica e inicie uma estratégia desenhada exclusivamente para as necessidades da sua empresa.
          </p>

          <Magnetic>
            <button
              onClick={scrollToForm}
              className="relative group inline-flex items-center space-x-3 bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-[#FFFFFF] font-bold text-base px-8 py-5 rounded-full hover:scale-[1.03] active:scale-[0.97] transition-all duration-300 shadow-[0_0_35px_rgba(37,99,235,0.35)] hover:shadow-[0_0_50px_rgba(37,99,235,0.6)] cursor-pointer overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:animate-shine pointer-events-none" />
              <MessageCircle className="w-5 h-5 text-[#FFFFFF] fill-current" />
              <span>Solicitar uma Consultoria Gratuita</span>
            </button>
          </Magnetic>

        </motion.div>
      </section>

      {/* FOOTER ULTRA CLEAN (Navegação Removida Conforme Pedido) */}
      <footer className="border-t border-slate-900/60 bg-[#030712] py-12 relative z-10 text-center text-zinc-500 text-xs font-light">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <p className="tracking-[0.15em] font-display font-semibold text-[#FFFFFF] text-[10px]">
            VERTEX<span className="text-[#3B82F6]">DIGITAL</span>
          </p>
          <p>
            © 2026 Vertex Digital. Todos os direitos reservados.
          </p>
          <p className="text-[10px] text-zinc-600">
            Soluções completas em tráfego pago, criação de sites profissionais e desenvolvimento de mini SaaS focados em conversão.
          </p>
        </div>
      </footer>

    </div>
  );
}
