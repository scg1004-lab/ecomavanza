
import React from 'react';
import { LayoutDashboard, Megaphone, Search, Brain } from 'lucide-react';
import { ServicePillar } from '../types';

const Services: React.FC = () => {
  const pillars: ServicePillar[] = [
    {
      id: "2.1",
      title: "Gestión de cuentas Amazon",
      description: "Gestionamos y optimizamos tu cuenta para mejorar ventas, estructura y rentabilidad.",
      items: [
        { label: "Listings y catálogo ", detail: "Optimización de contenido, estructura y posicionamiento." },
        { label: "Seller Central ", detail: "Gestión operativa y optimización de cuenta." },
        { label: "Inventario y stock", detail: "Control para evitar roturas y mejorar organización." },
        { label: "Mantenimiento continuo", detail: "Actualización de contenido, SEO y rendimiento." },
        
      ],
      icon: <LayoutDashboard className="h-8 w-8" />
    },
    {
      id: "2.2",
      title: "Publicidad en Amazon",
      description: "Estrategias de Ads enfocadas en crecer de forma rentable.",
      items: [
        { label: "Sponsored Ads", detail: "Gestión de Sponsored Products, Brands y Display." },
        { label: "Rentabilidad publicitaria", detail: "Optimización continua de ACOS, TACOS y estructura." },
        { label: "Optimización y escalado", detail: "Aumentamos visibilidad y conversión de forma rentable." },
        { label: "Testing y análisis", detail: "Optimización basada en datos reales." }
      ],
      icon: <Megaphone className="h-8 w-8" />
    },
    {
      id: "2.3",
      title: "Optimización de listings Amazon",
      description: "Mejoramos la visibilidad y conversión de tus productos en Amazon.",
      items: [
        { label: "SEO y Keywords", detail: "Investigación y posicionamiento de palabras clave." },
        { label: "Contenido visual", detail: "Imágenes, A+ Content y Brand Store orientados a conversión." },
        { label: "Traducción y localización", detail: "Adaptación para mercados internacionales." },
        { label: "Investigación de producto", detail: "Análisis de oportunidades de crecimiento." }
      ],
      icon: <Search className="h-8 w-8" />
    },
    {
      id: "2.4",
      title: "Consultoría Amazon",
      description: "Te ayudamos a identificar qué está frenando el crecimiento de tu marca.",
      items: [
        { label: "Auditoría de cuenta", detail: "Análisis de catálogo, publicidad y estructura." },
        { label: "Resolución de problemas", detail: "Ayuda en incidencias y bloqueos frecuentes." },
        { label: "Estrategia personalizada", detail: "Planes de acción adaptados a tus objetivos." },
        { label: "Consultoría 1 a 1", detail: "Sesiones privadas para tomar decisiones con claridad." }
      ],
      icon: <Brain className="h-8 w-8" />
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
           <strong> Gestionamos las áreas que más impactan en ventas, conversión y rentabilidad dentro de Amazon.</strong>
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
