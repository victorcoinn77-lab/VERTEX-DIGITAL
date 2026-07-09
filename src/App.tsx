import { useState, useEffect } from "react";
import { Theme } from "./types";
import { agencyConfig, getWhatsAppLink } from "./data";
import SEOConfig from "./components/SEOConfig";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Differentials from "./components/Diferenciais";
import Process from "./components/Processo";
import FAQ from "./components/FAQ";
import ContactForm from "./components/ContactForm";
import Footer from "./components/Footer";
import { MessageCircle, Sparkles } from "lucide-react";

export default function App() {
  // Inicializa o tema a partir do localStorage ou padrão para system/light
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem("vertex-theme");
    return (saved as Theme) || "dark";
  });

  const [selectedServiceId, setSelectedServiceId] = useState<string>("");

  // Efeito para sincronizar e aplicar as classes CSS de Tema
  useEffect(() => {
    const root = window.document.documentElement;
    localStorage.setItem("vertex-theme", theme);

    const applyTheme = (resolvedTheme: "light" | "dark") => {
      root.classList.remove("light", "dark");
      root.classList.add(resolvedTheme);
      // Sincroniza também a cor de fundo do body para evitar oscilações visuais
      document.body.style.backgroundColor = resolvedTheme === "dark" ? "#05070D" : "#ffffff";
    };

    if (theme === "system") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      applyTheme(mediaQuery.matches ? "dark" : "light");

      const listener = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", listener);
      return () => mediaQuery.removeEventListener("change", listener);
    } else {
      applyTheme(theme);
    }
  }, [theme]);

  // Função central para rolar até a seção de orçamento
  const handleScrollToBudget = () => {
    const element = document.getElementById("orcamento");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Função chamada ao clicar em "Selecionar para Orçamento" de um serviço específico
  const handleSelectService = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    handleScrollToBudget();
  };

  // Abre o canal de contato do WhatsApp flutuante
  const handleFloatingWhatsApp = () => {
    window.open(getWhatsAppLink("Olá! Gostaria de tirar uma dúvida sobre os serviços da Vertex."), "_blank");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#05070D] text-neutral-900 dark:text-neutral-100 transition-colors duration-300 font-sans selection:bg-blue-600/15 dark:selection:bg-blue-600/35 selection:text-neutral-900 dark:selection:text-white">
      {/* 1. SEO e Dados Estruturados */}
      <SEOConfig />

      {/* 2. Barra de Navegação Flutuante */}
      <Header
        theme={theme}
        setTheme={setTheme}
        onBudgetClick={handleScrollToBudget}
      />

      {/* 3. Hero Section Principal */}
      <Hero onBudgetClick={handleScrollToBudget} />

      {/* 4. Serviços Oferecidos */}
      <Services onSelectService={handleSelectService} />

      {/* 5. Diferenciais de Valor */}
      <Differentials />

      {/* 6. Linha do Tempo e Processo */}
      <Process />

      {/* 9. Perguntas Frequentes Accordion */}
      <FAQ />

      {/* 10. Seção de CTA & Formulário Conectado */}
      <ContactForm selectedServiceId={selectedServiceId} />

      {/* 11. Rodapé Detalhado */}
      <Footer />

      {/* 12. Botão Flutuante de Conversão Imediata (WhatsApp) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end space-y-2">
        {/* Balão indicativo de atendimento rápido */}
        <div className="hidden sm:flex items-center space-x-1.5 bg-white dark:bg-[#05070D] border border-neutral-150 dark:border-blue-500/20 py-1.5 px-3 rounded-lg shadow-xl text-[10px] font-mono uppercase tracking-wider font-bold text-neutral-700 dark:text-blue-400 animate-bounce shadow-blue-500/5">
          <Sparkles className="w-3 h-3 text-slate-900 dark:text-blue-400" />
          <span>Falar com especialista</span>
        </div>
        
        <button
          onClick={handleFloatingWhatsApp}
          className="relative w-14 h-14 rounded-full bg-[#2563EB] text-white flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_28px_rgba(37,99,235,0.6)] hover:scale-105 active:scale-95 transition-all duration-300 group cursor-pointer border border-transparent dark:border-blue-500/20"
          aria-label="Atendimento via WhatsApp"
          id="floating-whatsapp-trigger"
        >
          <MessageCircle className="w-7 h-7 fill-white/10" />
          
          {/* Badge Indicativo de Notificação Pulsante */}
          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-red-500 border-2 border-white dark:border-[#05070D] flex items-center justify-center text-[9px] font-bold text-white shadow-md">
            1
          </span>
          <span className="absolute inset-0 rounded-full bg-[#2563EB] animate-ping opacity-25 group-hover:opacity-0 transition-opacity pointer-events-none -z-10" />
        </button>
      </div>
    </div>
  );
}

