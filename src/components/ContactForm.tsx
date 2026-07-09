import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Send, CheckCircle2, AlertCircle, Sparkles, Phone, Mail, Building2, HelpCircle } from "lucide-react";
import { agencyConfig, getWhatsAppLink } from "../data";
import { leadFormData } from "../types";

interface ContactFormProps {
  selectedServiceId: string;
}

export default function ContactForm({ selectedServiceId }: ContactFormProps) {
  const [formData, setFormData] = useState<leadFormData>({
    name: "",
    email: "",
    phone: "",
    companyName: "",
    service: "",
    projectDescription: "",
  });

  const [errors, setErrors] = useState<Partial<leadFormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [whatsappHref, setWhatsappHref] = useState("");

  // Atualiza o campo de serviço se selecionado dinamicamente das seções anteriores
  useEffect(() => {
    if (selectedServiceId === "traffic") {
      setFormData((prev) => ({ ...prev, service: "Gestão de Tráfego Pago" }));
    } else if (selectedServiceId === "web") {
      setFormData((prev) => ({ ...prev, service: "Desenvolvimento de Sites" }));
    } else if (selectedServiceId === "saas") {
      setFormData((prev) => ({ ...prev, service: "Desenvolvimento SaaS" }));
    } else if (selectedServiceId === "ai") {
      setFormData((prev) => ({ ...prev, service: "Inteligência Artificial" }));
    }
  }, [selectedServiceId]);

  const validate = (): boolean => {
    const newErrors: Partial<leadFormData> = {};
    if (!formData.name.trim()) newErrors.name = "Nome é obrigatório";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail válido é obrigatório";
    }
    if (!formData.phone.trim()) newErrors.phone = "WhatsApp é obrigatório";
    if (!formData.service) newErrors.service = "Selecione um serviço";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpa erro ao digitar
    if (errors[name as keyof leadFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Constrói mensagem estruturada e altamente profissional para enviar via WhatsApp
    const message = `*Nova Solicitação de Orçamento - ${agencyConfig.name}*\n\n` +
      `👤 *Cliente:* ${formData.name}\n` +
      `💼 *Empresa:* ${formData.companyName || "Não especificada"}\n` +
      `✉️ *E-mail:* ${formData.email}\n` +
      `📱 *WhatsApp:* ${formData.phone}\n\n` +
      `🛠️ *Serviço:* ${formData.service}\n\n` +
      `📝 *Descrição:* ${formData.projectDescription || "Sem detalhes adicionais."}`;

    const link = getWhatsAppLink(message);
    setWhatsappHref(link);
    setSubmitted(true);

    // Abre o WhatsApp automaticamente após 1 segundo
    setTimeout(() => {
      window.open(link, "_blank");
    }, 1200);
  };

  return (
    <section
      id="orcamento"
      className="py-24 bg-white dark:bg-[#0A0A0C] transition-colors relative overflow-hidden bg-grid-pattern"
    >
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-slate-400/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Chamada para Ação */}
          <div className="lg:col-span-5 space-y-6 text-center lg:text-left" id="contact-intro">
            <div className="inline-block px-3 py-1 bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
              Fale Conosco
            </div>
            
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight">
              Vamos acelerar o crescimento da sua empresa?
            </h2>

            <p className="text-slate-500 dark:text-neutral-400 text-base font-light leading-relaxed">
              Preencha o formulário para receber uma estimativa inicial e uma análise gratuita da presença digital da sua empresa. Retornamos em menos de 1 hora.
            </p>

            {/* Informações Rápidas de Contato */}
            <div className="pt-6 border-t border-slate-100 dark:border-neutral-900 space-y-4 text-sm font-medium text-slate-700 dark:text-neutral-300" id="contact-quick-info">
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-slate-900 dark:text-white">
                  <Mail className="w-4 h-4" />
                </div>
                <span>{agencyConfig.email}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-slate-900 dark:text-white">
                  <Phone className="w-4 h-4" />
                </div>
                <span>{agencyConfig.phoneFormatted}</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start space-x-3">
                <div className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center text-slate-900 dark:text-white">
                  <Building2 className="w-4 h-4" />
                </div>
                <span className="text-xs">{agencyConfig.address}</span>
              </div>
            </div>
          </div>

          {/* Lado Direito: Formulário Premium */}
          <div className="lg:col-span-7" id="contact-form-wrapper">
            <div className="rounded-[40px] border border-slate-200/60 dark:border-neutral-800 bg-white dark:bg-[#0D0D11] p-6 sm:p-10 shadow-sm relative">
              
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      
                      {/* Campo Nome */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 dark:text-neutral-300 uppercase tracking-wider">
                          Seu Nome *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.name ? "border-red-500 focus:ring-red-500/20" : "border-slate-200/60 dark:border-neutral-800 focus:border-slate-950 focus:ring-slate-950/10 dark:focus:border-white dark:focus:ring-white/10"
                          } bg-slate-50/50 dark:bg-[#0A0A0C] text-slate-900 dark:text-white text-sm outline-none transition-all`}
                          placeholder="Ex: Guilherme Siqueira"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-[11px] font-semibold flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Campo Empresa */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 dark:text-neutral-300 uppercase tracking-wider">
                          Nome da Empresa
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-2xl border border-slate-200/60 dark:border-neutral-800 focus:border-slate-950 dark:focus:border-white bg-slate-50/50 dark:bg-[#0A0A0C] text-slate-900 dark:text-white text-sm outline-none transition-all focus:ring-slate-950/10 dark:focus:ring-white/10"
                          placeholder="Ex: Vanguard Imóveis"
                        />
                      </div>

                      {/* Campo E-mail */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 dark:text-neutral-300 uppercase tracking-wider">
                          E-mail Corporativo *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.email ? "border-red-500 focus:ring-red-500/20" : "border-slate-200/60 dark:border-neutral-800 focus:border-slate-950 focus:ring-slate-950/10 dark:focus:border-white dark:focus:ring-white/10"
                          } bg-slate-50/50 dark:bg-[#0A0A0C] text-slate-900 dark:text-white text-sm outline-none transition-all`}
                          placeholder="Ex: contato@empresa.com"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-[11px] font-semibold flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Campo WhatsApp */}
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-500 dark:text-neutral-300 uppercase tracking-wider">
                          WhatsApp *
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.phone ? "border-red-500 focus:ring-red-500/20" : "border-slate-200/60 dark:border-neutral-800 focus:border-slate-950 focus:ring-slate-950/10 dark:focus:border-white dark:focus:ring-white/10"
                          } bg-slate-50/50 dark:bg-[#0A0A0C] text-slate-900 dark:text-white text-sm outline-none transition-all`}
                          placeholder="Ex: (11) 99999-9999"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-[11px] font-semibold flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.phone}
                          </p>
                        )}
                      </div>

                      {/* Seletor Serviço */}
                      <div className="space-y-1.5 sm:col-span-2">
                        <label className="text-xs font-semibold text-slate-500 dark:text-neutral-300 uppercase tracking-wider">
                          Serviço de Interesse *
                        </label>
                        <select
                          name="service"
                          value={formData.service}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 rounded-2xl border ${
                            errors.service ? "border-red-500 focus:ring-red-500/20" : "border-slate-200/60 dark:border-neutral-800 focus:border-slate-950 focus:ring-slate-950/10 dark:focus:border-white dark:focus:ring-white/10"
                          } bg-slate-50/50 dark:bg-[#0A0A0C] text-slate-900 dark:text-white text-sm outline-none transition-all`}
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="Gestão de Tráfego Pago">Gestão de Tráfego Pago</option>
                          <option value="Desenvolvimento de Sites">Desenvolvimento de Sites</option>
                          <option value="Desenvolvimento SaaS">Desenvolvimento SaaS</option>
                          <option value="Inteligência Artificial">Inteligência Artificial</option>
                        </select>
                        {errors.service && (
                          <p className="text-red-500 text-[11px] font-semibold flex items-center">
                            <AlertCircle className="w-3 h-3 mr-1" /> {errors.service}
                          </p>
                        )}
                      </div>

                    </div>

                    {/* Descrição do Projeto */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500 dark:text-neutral-300 uppercase tracking-wider">
                        Descreva brevemente o projeto
                      </label>
                      <textarea
                        name="projectDescription"
                        value={formData.projectDescription}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-2xl border border-slate-200/60 dark:border-neutral-800 focus:border-slate-950 dark:focus:border-white bg-slate-50/50 dark:bg-[#0A0A0C] text-slate-900 dark:text-white text-sm outline-none transition-all focus:ring-slate-950/10 dark:focus:ring-white/10"
                        placeholder="Ex: Preciso de uma Landing Page ultra rápida e estruturação de tráfego pago para captar leads qualificados."
                      />
                    </div>

                    {/* Botão de Envio Principal */}
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center space-x-2 py-4 px-6 rounded-2xl bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-black dark:hover:bg-slate-100 font-bold text-base transition-all active:scale-[0.98] shadow-sm border border-transparent dark:border-neutral-800 cursor-pointer"
                    >
                      <Send className="w-5 h-5" />
                      <span>Solicitar Orçamento</span>
                    </button>

                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="py-8 text-center space-y-6 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-500">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-display font-bold text-2xl text-neutral-900 dark:text-white">
                        Solicitação Enviada!
                      </h3>
                      <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed max-w-md font-light">
                        Muito obrigado, <span className="font-semibold">{formData.name}</span>! Seus dados foram estruturados e estamos abrindo o WhatsApp para conectar você ao nosso especialista técnico.
                      </p>
                    </div>

                    {/* Botão de Contingência (Se pop-up estiver bloqueado) */}
                    <div className="pt-4 w-full">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/20 active:scale-98 transition-transform"
                      >
                        <Phone className="w-4 h-4 fill-white/10" />
                        <span>Abrir WhatsApp Manualmente</span>
                      </a>
                    </div>

                    <p className="text-[11px] text-neutral-400 font-mono">
                       vertex-digital-lead-id: #{Math.floor(Math.random() * 90000) + 10000}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
