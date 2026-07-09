export interface Service {
  id: string;
  title: string;
  description: string;
  features: string[];
  icon: string; // Lucide icon name
  priceEstimate: string;
}

export interface Differential {
  title: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  duration: string;
}

export interface PortfolioProject {
  title: string;
  description: string;
  category: "traffic" | "web" | "saas" | "ai";
  image: string;
  tags: string[];
  results: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
  avatar: string;
  rating: number;
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: "services" | "process" | "investment" | "support";
}

export type Theme = "light" | "dark" | "system";

export interface leadFormData {
  name: string;
  email: string;
  phone: string;
  companyName: string;
  service: string;
  projectDescription: string;
}
