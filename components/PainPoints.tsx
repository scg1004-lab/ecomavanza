
import React from 'react';

const PainPoints: React.FC = () => {
  const points = [
    {
      title: "Laberinto de Tarifas",
      desc: "Estructuras complejas (FBA, Almacenamiento) que erosionan tus márgenes de beneficio.",
      icon: "💸"
    },
    {
      title: "Publicidad Saturada",
      desc: "Inflación del CPC de hasta 120%. Gestión experta para no quemar tu presupuesto.",
      icon: "📈"
    },
    {
      title: "Riesgo de Suspensión",
      desc: "Infracciones de políticas o reclamos de IP que pueden cerrar tu cuenta catastróficamente.",
      icon: "⚠️"
    },
    {
      title: "Complejidad IA",
      desc: "Necesidad de dominar la automatización para mantener la competitividad en 2025.",
      icon: "🤖"
    }
  ];

  return (
    <section className="py-24 bg-[#f0f9fa]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.3em] mb-4">Problemas Reales</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#0e3a4d] mb-6">Puntos de Dolor que Resolvemos</h3>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
            Identificamos y solucionamos los desafíos más críticos que enfrentan los vendedores, permitiéndoles enfocarse en su producto.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {points.map((p, idx) => (
            <div key={idx} className="p-10 bg-white rounded-[2rem] hover:shadow-2xl transition-all duration-300 border border-slate-100 group hover:-translate-y-2">
              <div className="text-5xl mb-8 bg-[#f0f9fa] w-20 h-20 rounded-2xl flex items-center justify-center group-hover:bg-[#4fd1d1]/10 transition-colors">{p.icon}</div>
              <h4 className="text-xl font-black text-[#0e3a4d] mb-4">{p.title}</h4>
              <p className="text-slate-600 leading-relaxed text-sm font-medium">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PainPoints;
