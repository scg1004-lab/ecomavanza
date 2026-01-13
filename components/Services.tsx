
import React from 'react';
import { ServicePillar } from '../types';

const Services: React.FC = () => {
  const pillars: ServicePillar[] = [
    {
      id: "2.1",
      title: "Gestión y Estrategia de Cuentas",
      description: "Optimizamos cada aspecto de tu operación en Seller Central para garantizar la máxima eficiencia, rentabilidad y un crecimiento sostenido.",
      items: [
        { label: "Administración de Cuentas", detail: "Soporte integral en operaciones diarias y análisis estratégico." },
        { label: "Auditoría de Catálogo", detail: "Mejora de listados siguiendo guías de estilo para mejor indexación." },
        { label: "Inventario con IA", detail: "Modelos predictivos para evitar roturas de stock y cargos extras." },
        { label: "Análisis de Rentabilidad", detail: "Optimización de costos FBA y tarifas de referencia." },
        { label: "Logística FBA", detail: "Asesoría completa en envíos y servicio al cliente." }
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "2.2",
      title: "Publicidad y Crecimiento Acelerado",
      description: "Diseñamos y ejecutamos estrategias publicitarias de embudo completo que aumentan tu visibilidad y maximizan tu retorno (ROAS).",
      items: [
        { label: "Gestión Amazon PPC", detail: "Estrategias para equilibrar ACoS y TACoS eficientemente." },
        { label: "Acceso Amazon DSP", detail: "Retargeting externo utilizando data de compra exclusiva." },
        { label: "Contenido A+", detail: "Diseño de marca enriquecido e imágenes de alta conversión." },
        { label: "Posicionamiento SEO", detail: "Estrategias de lanzamiento para ganar reseñas y ranking orgánico." }
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: "2.3",
      title: "Cumplimiento y Protección de Marca",
      description: "Blindamos tu negocio contra los riesgos regulatorios y legales, protegiendo tu marca y asegurando la continuidad operativa.",
      items: [
        { label: "Compliance Normativo", detail: "Requisitos CPSC, FDA, EPA, REACH, RoHS y certificados UL." },
        { label: "Gestión de Crisis", detail: "Planes de Acción (POA) para reactivar cuentas suspendidas." },
        { label: "Defensa Legal IP", detail: "Protección contra infracciones por abogados expertos." },
        { label: "Brand Registry", detail: "Acceso rápido a protección de marca mediante IP Accelerator." }
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V11.5" />
        </svg>
      )
    },
    {
      id: "2.4",
      title: "Tecnología y Expansión Global",
      description: "Aprovechamos la tecnología de vanguardia y nuestra experiencia global para escalar tu negocio eficientemente.",
      items: [
        { label: "IA y Automatización", detail: "Precios dinámicos y análisis de voz del cliente (VOC)." },
        { label: "Software de Gestión", detail: "Uso de Pacvue, Quartile o Perpetua para optimización." },
        { label: "Expansión Internacional", detail: "Estrategias de localización y logística global." },
        { label: "Gestión Fiscal", detail: "Asesoría en Pan-European FBA y cumplimiento de IVA/OSS." }
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1a2.5 2.5 0 012.5 2.5v.658M18 9.405V10a2 2 0 01-2 2h-1a2 2 0 00-2 2v3.195M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  if (!pillars || pillars.length === 0) return null;

  return (
    <section id="servicios" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mb-20">
          <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.4em] mb-4">Ecosistema 360°</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#0e3a4d] mb-8 leading-tight">Nuestros Pilares de Servicio</h3>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
            El éxito sostenido en Amazon no es accidental; es el resultado de una estrategia integral donde cada componente se amplifica bajo el liderazgo de <strong>ECOM AVANZA</strong>.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {pillars.map((pillar) => (
            <div key={`pillar-${pillar.id}`} className="flex flex-col bg-[#f0f9fa]/60 p-10 md:p-14 rounded-[3.5rem] border border-slate-100 hover:border-[#4fd1d1]/30 transition-all duration-300 group">
              <div className="flex items-start justify-between mb-8">
                <div className="bg-[#0e3a4d] w-20 h-20 rounded-2xl flex items-center justify-center text-[#4fd1d1] shadow-xl group-hover:scale-110 transition-transform">
                  {pillar.icon}
                </div>
                <span className="text-5xl font-black text-[#0e3a4d]/5 tracking-tighter select-none">{pillar.id}</span>
              </div>
              
              <h4 className="text-2xl font-black text-[#0e3a4d] mb-4 group-hover:text-[#4fd1d1] transition-colors">{pillar.title}</h4>
              <p className="text-slate-600 mb-10 font-medium text-base leading-relaxed">{pillar.description}</p>
              
              <div className="space-y-6 flex-1">
                {pillar.items.map((item, i) => (
                  <div key={`${pillar.id}-subitem-${i}`} className="flex items-start gap-4">
                    <div className="mt-1.5 shrink-0">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 12L19 12M19 12L13 6M19 12L13 18" stroke="#4fd1d1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-[#0e3a4d] text-sm font-black uppercase tracking-wider">{item.label}</h5>
                      <p className="text-slate-500 text-sm mt-1 font-medium leading-relaxed">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
