import { ArrowUp, Instagram, Linkedin, Github, Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import { agencyConfig, getWhatsAppLink } from "../data";

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleWAContact = () => {
    window.open(getWhatsAppLink(), "_blank");
  };

  return (
    <footer
      id="footer"
      className="bg-slate-950 text-white transition-colors border-t border-slate-900 pt-20 pb-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Grid Principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-neutral-900" id="footer-grid">
          
          {/* Coluna 1: Branding */}
          <div className="lg:col-span-5 space-y-6" id="footer-branding">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleScrollToTop();
              }}
              className="flex items-center space-x-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shadow-lg">
                <span className="font-display font-bold text-slate-950 text-lg tracking-wider">V</span>
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">
                {agencyConfig.name.split(" ")[0]}
                <span className="text-slate-400 font-light">
                  {agencyConfig.name.split(" ")[1] ? ` ${agencyConfig.name.split(" ")[1]}` : ""}
                </span>
              </span>
            </a>
            
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm font-light">
              {agencyConfig.shortDescription}
            </p>

            {/* Redes Sociais */}
            <div className="flex items-center space-x-4 pt-2" id="footer-socials">
              <a
                href={agencyConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={agencyConfig.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={agencyConfig.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl border border-neutral-800 bg-neutral-900/50 flex items-center justify-center text-slate-400 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Coluna 2: Serviços Links */}
          <div className="lg:col-span-3 space-y-4" id="footer-links-services">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400">
              Nossas Soluções
            </h4>
            <ul className="space-y-2.5 text-sm font-medium text-slate-400">
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Gestão de Tráfego</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Desenvolvimento de Sites</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Desenvolvimento SaaS</a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-white transition-colors">Inteligência Artificial</a>
              </li>
            </ul>
          </div>

          {/* Coluna 3: Contatos Oficiais */}
          <div className="lg:col-span-4 space-y-4" id="footer-links-contact">
            <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400">
              Canais Oficiais
            </h4>
            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-400 font-light">
              <li className="flex items-start space-x-3">
                <Mail className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span className="hover:text-white transition-colors">{agencyConfig.email}</span>
              </li>
              <li className="flex items-start space-x-3">
                <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <button onClick={handleWAContact} className="hover:text-white transition-colors text-left cursor-pointer">
                  {agencyConfig.phoneFormatted} (WhatsApp)
                </button>
              </li>
              <li className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <span>{agencyConfig.address}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Linha do Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500" id="footer-copyright-row">
          <div className="flex items-center space-x-2">
            <span>© {new Date().getFullYear()} Vertex Digital. Todos os direitos reservados.</span>
          </div>
          
          <div className="flex items-center space-x-6">
            <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
            
            {/* Botão de Voltar ao Topo */}
            <button
              onClick={handleScrollToTop}
              className="w-8 h-8 rounded-lg border border-neutral-800 bg-neutral-900/50 flex items-center justify-center hover:bg-neutral-900 hover:text-white hover:border-neutral-700 transition-all cursor-pointer"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
