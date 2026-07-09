import { useEffect } from "react";
import { agencyConfig } from "../data";

export default function SEOConfig() {
  useEffect(() => {
    // 1. Definição do Título e Descrição Primários
    document.title = `${agencyConfig.name} | ${agencyConfig.slogan}`;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", agencyConfig.shortDescription);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = agencyConfig.shortDescription;
      document.head.appendChild(meta);
    }

    // 2. Open Graph Meta Tags (Para compartilhamentos premium no WhatsApp, Instagram, LinkedIn)
    const ogTags = [
      { property: "og:title", content: `${agencyConfig.name} | Agência de Elite` },
      { property: "og:description", content: agencyConfig.shortDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vertexdigital.com.br" },
      { property: "og:image", content: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80" },
      { property: "og:site_name", content: agencyConfig.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${agencyConfig.name} | Agência de Elite` },
      { name: "twitter:description", content: agencyConfig.shortDescription },
    ];

    ogTags.forEach((tag) => {
      const attribute = "property" in tag ? "property" : "name";
      const value = "property" in tag ? tag.property : tag.name;
      
      let element = document.querySelector(`meta[${attribute}="${value}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, value);
        document.head.appendChild(element);
      }
      element.setAttribute("content", tag.content);
    });

    // 3. Schema.org JSON-LD (Dados Estruturados para buscadores como Google)
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": agencyConfig.name,
      "image": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&h=630&q=80",
      "@id": "https://vertexdigital.com.br/#agency",
      "url": "https://vertexdigital.com.br",
      "telephone": agencyConfig.phoneFormatted,
      "priceRange": "$$",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Av. Paulista, 1000",
        "addressLocality": "São Paulo",
        "addressRegion": "SP",
        "postalCode": "01310-100",
        "addressCountry": "BR"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": -23.561684,
        "longitude": -46.655981
      },
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "09:00",
        "closes": "18:00"
      },
      "sameAs": [
        agencyConfig.instagram,
        agencyConfig.linkedin
      ],
      "description": agencyConfig.shortDescription
    };

    let scriptElement = document.getElementById("jsonld-schema") as HTMLScriptElement;
    if (!scriptElement) {
      scriptElement = document.createElement("script");
      scriptElement.id = "jsonld-schema";
      scriptElement.type = "application/ld+json";
      document.head.appendChild(scriptElement);
    }
    scriptElement.text = JSON.stringify(schemaData);

    // 4. Preparação dos Pixels de Rastreamento (Google Analytics, Meta Pixel, Google Ads)
    // Mostra no console de desenvolvimento que as estruturas estão prontas para inserção rápida
    console.log(`[Vertex Digital SEO] Estruturas carregadas.`);
    console.log(`[Vertex Digital Analytics] Preparado para Google Analytics. Para ativar, insira sua tag G-XXXXXX.`);
    console.log(`[Vertex Digital Pixels] Pixel do Meta (Facebook) pronto. Pixel do Google Ads pronto.`);

    // Exemplo de injeção segura de scripts (se as chaves existirem nos envs/config)
    const GA_TRACKING_ID = ""; // Ex: G-XXXXXXXXXX
    const META_PIXEL_ID = "";  // Ex: 123456789012345

    if (GA_TRACKING_ID) {
      const gaScript1 = document.createElement("script");
      gaScript1.async = true;
      gaScript1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`;
      document.head.appendChild(gaScript1);

      const gaScript2 = document.createElement("script");
      gaScript2.text = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA_TRACKING_ID}');
      `;
      document.head.appendChild(gaScript2);
    }

    if (META_PIXEL_ID) {
      const fbScript = document.createElement("script");
      fbScript.text = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '${META_PIXEL_ID}');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(fbScript);
    }

  }, []);

  return null; // Componente invisível de configuração de cabeçalho
}
