import { Service, Differential, ProcessStep, PortfolioProject, Testimonial, FAQItem } from "./types";

// Configurações Globais da Agência - Altere facilmente aqui!
export const agencyConfig = {
  name: "Vertex Digital",
  slogan: "Crescimento digital para empresas que querem vender mais.",
  shortDescription: "Criamos sites profissionais, sistemas personalizados e campanhas de tráfego pago para transformar visitantes em clientes.",
  email: "contato@vertexdigital.com.br",
  phoneRaw: "5562985463735", // Número de WhatsApp (com DDI e DDD, apenas números)
  phoneFormatted: "(62) 98546-3735",
  address: "Jardim América, Goiânia - GO",
  instagram: "https://instagram.com/victorrr_brito",
  instagramHandle: "@victorrr_brito",
  linkedin: "https://linkedin.com/company/vertexdigital",
  linkedinHandle: "Vertex Digital",
  github: "https://github.com",
  defaultWhatsAppMessage: "Olá! Gostaria de solicitar um orçamento para o meu projeto.",
};

// Gerador de links do WhatsApp
export const getWhatsAppLink = (message?: string): string => {
  const text = encodeURIComponent(message || agencyConfig.defaultWhatsAppMessage);
  return `https://wa.me/${agencyConfig.phoneRaw}?text=${text}`;
};

// 1. Serviços (Os 4 serviços descritos no escopo)
export const servicesData: Service[] = [
  {
    id: "traffic",
    title: "Gestão de Tráfego Pago",
    description: "Anúncios ultra-segmentados focados em conversão imediata, captação de leads de alto padrão e escala de vendas nos principais canais de atenção.",
    features: [
      "Meta Ads (Instagram & Facebook)",
      "Google Ads (Pesquisa, Display & YouTube)",
      "Campanhas de Conversão Avançadas",
      "Remarketing Dinâmico e Lookalike",
      "Instalação e Configuração de Pixel/API de Conversão",
      "Relatórios em Tempo Real e Otimização Semanal"
    ],
    icon: "TrendingUp",
    priceEstimate: "Sob Consulta"
  },
  {
    id: "web",
    title: "Desenvolvimento de Sites",
    description: "Criação de websites institucionais e landing pages de altíssimo nível, otimizados para velocidade extrema, design responsivo e foco total em conversão.",
    features: [
      "Landing Pages de Alta Conversão",
      "Sites Institucionais e Corporativos",
      "E-commerce de Alta Performance",
      "Design Minimalista Estilo Apple/Stripe",
      "Performance no Lighthouse acima de 95",
      "Hospedagem em CDN Global (Vercel/Netlify)"
    ],
    icon: "Monitor",
    priceEstimate: "Sob Consulta"
  },
  {
    id: "saas",
    title: "Desenvolvimento SaaS",
    description: "Desenvolvimento de aplicações web completas, painéis administrativos escaláveis, CRMs e ERPs sob medida para automatizar sua operação.",
    features: [
      "Sistemas Web Personalizados (React/Next.js)",
      "Painéis Administrativos Completos",
      "Sistemas CRM e ERP Sob Medida",
      "Arquitetura Segura e Bancos de Dados Robustos",
      "Automações de Fluxo de Trabalho",
      "Integrações Completas de API"
    ],
    icon: "Database",
    priceEstimate: "Sob Consulta"
  },
  {
    id: "ai",
    title: "Inteligência Artificial",
    description: "Integração de modelos de linguagem e agentes inteligentes para automatizar seu atendimento, qualificar leads e otimizar rotinas internas.",
    features: [
      "Chatbots de Atendimento Inteligentes",
      "Automação de Atendimento via WhatsApp",
      "Agentes de IA e RAG Personalizados",
      "Integração com LLMs de Última Geração (Gemini, OpenAI)",
      "Processamento de Linguagem Natural",
      "Análise de Sentimentos e Resumos Automáticos"
    ],
    icon: "BrainCircuit",
    priceEstimate: "Sob Consulta"
  }
];

// 2. Diferenciais (Os 6 diferenciais descritos no escopo)
export const differentialsData: Differential[] = [
  {
    title: "Atendimento Rápido",
    description: "Suporte dedicado com canais diretos e tempos de resposta inferiores a 15 minutos em horário comercial.",
    icon: "Zap"
  },
  {
    title: "Desenvolvimento Personalizado",
    description: "Zero templates prontos. Cada linha de código e pixel é desenhado estrategicamente para sua marca.",
    icon: "CodeXml"
  },
  {
    title: "Tecnologia Moderna",
    description: "Frameworks modernos de nível mundial que garantem segurança, velocidade absurda e SEO impecável.",
    icon: "Cpu"
  },
  {
    title: "Foco em Resultados",
    description: "Não criamos apenas layouts bonitos; desenhamos jornadas digitais que geram faturamento real.",
    icon: "Target"
  },
  {
    title: "Interface Premium",
    description: "Aparência limpa, animações elegantes e design sofisticado inspirado nos gigantes do Vale do Silício.",
    icon: "Sparkles"
  },
  {
    title: "Suporte Contínuo",
    description: "Acompanhamento pós-lançamento, atualizações constantes e monitoramento ativo 24/7 de estabilidade.",
    icon: "ShieldCheck"
  }
];

// 3. Processo (Os 4 passos descritos no escopo)
export const processData: ProcessStep[] = [
  {
    step: 1,
    title: "Diagnóstico",
    description: "Análise profunda do seu cenário atual, concorrência, canais de captação e mapeamento preciso das maiores oportunidades de crescimento.",
    duration: "Dia 1-3"
  },
  {
    step: 2,
    title: "Planejamento",
    description: "Desenho da arquitetura tecnológica, definição da identidade visual premium, funil de conversão e estruturação estratégica dos anúncios.",
    duration: "Dia 4-7"
  },
  {
    step: 3,
    title: "Desenvolvimento",
    description: "Codificação do projeto com máxima performance, implementação das integrações de IA/CRM e lançamento dos primeiros testes de anúncios.",
    duration: "Dia 8-20"
  },
  {
    step: 4,
    title: "Crescimento",
    description: "Análise contínua dos dados, testes A/B nas páginas, otimização diária de campanhas de tráfego pago e escalonamento previsível das vendas.",
    duration: "Contínuo"
  }
];

// 4. Portfólio (Projetos fictícios elegantes e sofisticados)
export const portfolioData: PortfolioProject[] = [
  {
    title: "Nexus Dashboard SaaS",
    description: "Plataforma financeira de gerenciamento de patrimônio desenvolvida com React 19 e inteligência artificial para previsão de investimentos.",
    category: "saas",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "AI Integration", "Tailwind CSS", "Data Analytics"],
    results: "+240% em produtividade"
  },
  {
    title: "Aura Skincare",
    description: "E-commerce de cosméticos naturais premium com foco em experiência de usuário imersiva, transições fluidas e checkout simplificado.",
    category: "web",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80",
    tags: ["E-commerce", "Performance UI", "SEO Otimizado", "Speed Run"],
    results: "+45% Taxa de Conversão"
  },
  {
    title: "ScaleUp Campaign",
    description: "Estratégia completa de tráfego pago para EdTech internacional de alta renda, integrando funil de WhatsApp e Remarketing Inteligente.",
    category: "traffic",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    tags: ["Meta Ads", "Google Ads", "Funil WhatsApp", "ROI 7.2x"],
    results: "7.2x de Retorno (ROAS)"
  },
  {
    title: "Vanguard Inteligência Artificial",
    description: "Agente inteligente integrado aos canais de vendas de uma grande imobiliária, qualificando e agendando visitas sem interferência humana.",
    category: "ai",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    tags: ["LLM Agents", "WhatsApp Automation", "OpenAI API", "Node.js"],
    results: "Atendimento 24/7 instantâneo"
  },
  {
    title: "Zenith Institutional",
    description: "Landing page e site corporativo para uma holding de private equity com estilo ultra-minimalista, tipografia robusta e efeitos de paralaxe discretos.",
    category: "web",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
    tags: ["Web Design", "Framer Motion", "Minimalism", "Vercel"],
    results: "Carregamento em 0.4 segundos"
  },
  {
    title: "Nova CRM & Automation",
    description: "Plataforma de vendas e CRM customizado focado em corretoras de seguros com dashboards em tempo real e relatórios automáticos via PDF.",
    category: "saas",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80",
    tags: ["ERP/CRM", "TypeScript", "Tailwind CSS", "PDF Generation"],
    results: "Redução de 30h de trabalho/semana"
  }
];

// 5. Depoimentos
export const testimonialsData: Testimonial[] = [
  {
    name: "Guilherme Siqueira",
    role: "CEO",
    company: "Vanguard Imóveis",
    text: "Contratar a Vertex Digital foi um divisor de águas. O agente de IA e as landing pages que criaram quadruplicaram nossa captação de leads qualificados. O nível de design é simplesmente imbatível.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    name: "Letícia Marini",
    role: "Diretora de Marketing",
    company: "Aura Cosméticos",
    text: "Excelente entrega. Nosso novo e-commerce é ridiculamente rápido e sofisticado. Além disso, a gestão de tráfego que eles realizam nos trouxe o maior ROI histórico da nossa empresa.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    rating: 5
  },
  {
    name: "Roberto D'Ávila",
    role: "Fundador",
    company: "Nexus Tech",
    text: "O nível de atenção técnica que eles têm com o código e a arquitetura do nosso SaaS foi impecável. Seguem padrões de design modernos e nos deram um suporte pós-lançamento espetacular.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    rating: 5
  }
];

// 6. FAQ (10 perguntas frequentes)
export const faqData: FAQItem[] = [
  {
    id: 1,
    question: "Como funciona o processo de contratação da Vertex Digital?",
    answer: "Iniciamos com um diagnóstico gratuito onde entendemos seus objetivos. Em seguida, enviamos uma proposta personalizada. Após aprovação, iniciamos o planejamento e desenvolvimento com reuniões de alinhamento quinzenais até o lançamento.",
    category: "process"
  },
  {
    id: 2,
    question: "Vocês utilizam templates prontos (como WordPress padrão)?",
    answer: "Não. Nós desenvolvemos cada projeto do zero usando tecnologias modernas como React, Next.js, TypeScript e Tailwind CSS. Isso garante um design premium exclusivo (estilo Apple e Stripe), velocidade imbatível e código limpo, livre de plugins pesados e falhas de segurança.",
    category: "services"
  },
  {
    id: 3,
    question: "O que está incluído na Gestão de Tráfego Pago?",
    answer: "Está incluída a estratégia completa de anúncios nas principais redes (Meta Ads, Google Ads), criação e testes A/B dos criativos e copys, configuração avançada de Pixel e API de conversão para rastreamento de dados, remarketing, relatórios periódicos e otimização semanal constante.",
    category: "services"
  },
  {
    id: 4,
    question: "Qual o prazo médio de entrega de um site institucional ou Landing Page?",
    answer: "Landing Pages de alta conversão costumam ser entregues entre 7 e 10 dias úteis. Sites institucionais completos levam em média de 15 a 20 dias úteis, dependendo da complexidade do mapa do site e dos recursos requeridos.",
    category: "process"
  },

  {
    id: 8,
    question: "Eu terei suporte após o lançamento do projeto?",
    answer: "Sim! Nós oferecemos suporte técnico contínuo pós-lançamento (de 30 a 90 dias dependendo do contrato) garantindo estabilidade e ajustes imediatos. Também oferecemos planos mensais de evolução contínua para manutenção preventiva e adição de novas funcionalidades.",
    category: "support"
  },
  {
    id: 9,
    question: "Os sites criados já são otimizados para o Google (SEO)?",
    answer: "Sim, absolutamente. Desenvolvemos com foco rigoroso em SEO técnico: meta-tags estruturadas, Open Graph para compartilhamentos elegantes, geração de Sitemap e robots.txt, marcações JSON-LD (Schema.org) e velocidade de carregamento extrema, garantindo as melhores notas no Lighthouse.",
    category: "services"
  },
  {
    id: 10,
    question: "Como o formulário de orçamento se conecta ao WhatsApp?",
    answer: "Ao preencher nosso formulário de orçamento detalhado no site, nossa inteligência de cliente compila suas respostas (nome, empresa, orçamento disponível e descrição do projeto) e gera um link formatado de forma altamente legível. Ao clicar para enviar, o WhatsApp é aberto automaticamente com essa mensagem estruturada pronta para envio, garantindo conversão imediata.",
    category: "support"
  }
];
