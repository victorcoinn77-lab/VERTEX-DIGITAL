import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sun, Moon, Monitor, ArrowRight, Sparkles } from "lucide-react";
import { agencyConfig } from "../data";
import { Theme } from "../types";

interface HeaderProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onBudgetClick: () => void;
}

export default function Header({ theme, setTheme, onBudgetClick }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  // Detecta rolagem para fixar a barra e aplicar efeito glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Serviços", href: "#servicos" },
    { name: "Diferenciais", href: "#diferenciais" },
    { name: "Processo", href: "#processo" },
    { name: "FAQ", href: "#faq" },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const currentThemeIcon = () => {
    if (theme === "light") return <Sun className="w-4 h-4 text-amber-500" />;
    if (theme === "dark") return <Moon className="w-4 h-4 text-indigo-400" />;
    return <Monitor className="w-4 h-4 text-emerald-500" />;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-4 glass-nav shadow-md"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
      id="main-header"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo da Empresa */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center space-x-2 group"
            id="header-logo"
          >
            <div className="w-8 h-8 bg-slate-950 dark:bg-white rounded-lg flex items-center justify-center text-white dark:text-slate-950 font-bold text-base shadow-sm transition-colors">
              V
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-950 dark:text-white uppercase transition-colors">
              Vertex<span className="text-slate-400 dark:text-slate-300 font-light">Digital</span>
            </span>
          </a>

          {/* Links para Desktop */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-sm font-semibold text-slate-500 dark:text-neutral-400 hover:text-slate-950 dark:hover:text-white transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Botões de Ação para Desktop */}
          <div className="hidden md:flex items-center space-x-4" id="desktop-actions">
            
            {/* Seletor de Temas */}
            <div className="relative">
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                className="p-2 rounded-full border border-slate-100 dark:border-neutral-800 hover:bg-slate-50 dark:hover:bg-neutral-900 transition-all flex items-center justify-center"
                aria-label="Selecionar tema"
                id="theme-toggle-btn"
              >
                {currentThemeIcon()}
              </button>

              <AnimatePresence>
                {showThemeDropdown && (
                  <>
                    <div 
                      className="fixed inset-0 z-10" 
                      onClick={() => setShowThemeDropdown(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-36 rounded-2xl border border-slate-100 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-1.5 shadow-xl z-20"
                    >
                      {[
                        { id: "light", label: "Claro", icon: <Sun className="w-4 h-4 text-amber-500" /> },
                        { id: "dark", label: "Escuro", icon: <Moon className="w-4 h-4 text-indigo-400" /> },
                        { id: "system", label: "Auto", icon: <Monitor className="w-4 h-4 text-emerald-500" /> },
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => {
                            setTheme(item.id as Theme);
                            setShowThemeDropdown(false);
                          }}
                          className={`w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-colors ${
                            theme === item.id
                              ? "bg-slate-50 dark:bg-neutral-900 text-slate-900 dark:text-white"
                              : "text-slate-600 dark:text-neutral-400 hover:bg-slate-50 dark:hover:bg-neutral-900/50"
                          }`}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Primário */}
            <button
              onClick={onBudgetClick}
              className="px-6 py-2.5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-full text-sm font-semibold hover:bg-black dark:hover:bg-slate-100 transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer shadow-sm border border-transparent dark:border-neutral-800"
              id="cta-budget-header"
            >
              <span>Solicitar Orçamento</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Controle do Menu Mobile */}
          <div className="flex items-center space-x-3 md:hidden">
            {/* Seletor Rápido de Tema (Sem Dropdown no Mobile para Simplicidade) */}
            <button
              onClick={() => {
                const themes: Theme[] = ["light", "dark", "system"];
                const nextIndex = (themes.indexOf(theme) + 1) % themes.length;
                setTheme(themes[nextIndex]);
              }}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all flex items-center justify-center"
              aria-label="Toggle theme mobile"
              id="theme-mobile-toggle"
            >
              {currentThemeIcon()}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
              aria-label="Abrir menu"
              id="menu-toggle-mobile"
            >
              {isOpen ? <X className="w-5 h-5 text-neutral-900 dark:text-white" /> : <Menu className="w-5 h-5 text-neutral-900 dark:text-white" />}
            </button>
          </div>

        </div>
      </div>

      {/* Drawer de Navegação Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-b border-neutral-200 dark:border-neutral-800 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-xl overflow-hidden shadow-2xl"
            id="mobile-menu-drawer"
          >
            <div className="px-4 pt-3 pb-8 space-y-4">
              <div className="flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleLinkClick(link.href);
                    }}
                    className="flex items-center justify-between px-3 py-3 rounded-xl text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRightMock />
                  </a>
                ))}
              </div>

              <div className="px-3 pt-4 border-t border-neutral-100 dark:border-neutral-800">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onBudgetClick();
                  }}
                  className="w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-full bg-slate-950 dark:bg-white text-white dark:text-slate-950 font-semibold hover:bg-black dark:hover:bg-slate-100 active:scale-98 transition-all cursor-pointer shadow-sm"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Solicitar Orçamento</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// Pequeno mock de Chevron para evitar overhead
function ChevronRightMock() {
  return (
    <svg className="w-4 h-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  );
}
