
import React from 'react';
import { ServicePillar } from '../types';

const Services: React.FC = () => {
  const pillars: ServicePillar[] = [
    {
      id: "2.1",
      title: "Gestión Integral de Cuenta Amazon",
      description: "Gestionamos y optimizamos cada área de tu cuenta para mejorar ventas, estructura y rentabilidad dentro de Amazon.",
      items: [
        { label: "Optimización de listings y catálogo ", detail: "Mejoramos contenido, estructura y posicionamiento de tus productos." },
        { label: "Gestión de Seller Central ", detail: "Control operativo y estratégico de la cuenta desde un único sistema." },
        { label: "Inventario y organización", detail: "Evitamos roturas de stock y mejoramos la eficiencia del catálogo." },
        { label: "Mantenimiento continuo", detail: "Actualización constante de contenido, SEO y rendimiento general." },
        
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      id: "2.2",
      title: "Publicidad en Amazon",
      description: "Creamos estrategias publicitarias enfocadas en escalar ventas manteniendo un crecimiento rentable.",
      items: [
        { label: "Sponsored Ads", detail: "Gestión de campañas Sponsored Products, Brands y Display." },
        { label: "Optimización de rentabilidad", detail: "Mejora continua de ACoS, TACoS y estructura publicitaria." },
        { label: "Estrategias de escalado", detail: "Campañas diseñadas para aumentar visibilidad y conversión." },
        { label: "Testing y análisis", detail: "Optimización basada en datos reales y pruebas constantes." }
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: "2.3",
      title: "Optimización y Posicionamiento",
      description: "Trabajamos la conversión y visibilidad de tus productos para mejorar resultados dentro de Amazon.",
      items: [
        { label: "SEO y Keyword Research", detail: "Búsqueda estratégica de palabras clave y posicionamiento interno." },
        { label: "Diseño de contenido", detail: "Imágenes, contenido A+ y Brand Store orientados a conversión." },
        { label: "Traducción y localización", detail: "Adaptación de contenido para mercados internacionales." },
        { label: "Product Research", detail: "Análisis de mercado y oportunidades de crecimiento." }
      ],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 21.48V11.5" />
        </svg>
      )
    },
    {
      id: "2.4",
      title: "Asesorías Privadas",
      description: "Te ayudamos a entender qué está frenando tu crecimiento y cómo solucionarlo con una estrategia clara.",
      items: [
        { label: "Auditoría de cuenta", detail: "Análisis completo de catálogo, publicidad y estructura." },
        { label: "Resolución de problemas", detail: "Ayuda en bloqueos, incidencias y errores frecuentes." },
        { label: "Estrategia personalizada", detail: "Planes de acción adaptados a tu marca y objetivos." },
        { label: "Consultoría 1 a 1", detail: "Sesiones privadas para tomar decisiones con claridad." }
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
          <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.4em] mb-4">Servicios Principales</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#0e3a4d] mb-8 leading-tight">Estrategia y gestión para crecer en Amazon</h3>
          <p className="text-xl text-slate-600 leading-relaxed font-medium">
           <strong> Desde la creación y gestión de cuentas hasta publicidad, optimización y estrategia de crecimiento. Nos encargamos de las áreas que más impactan en ventas, conversión y rentabilidad dentro de Amazon.</strong>
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
