
import React from 'react';

const Advantages: React.FC = () => {
  const ads = [
    {
      title: "Visión estratégica",
      desc: "No aplicamos cambios al azar. Cada decisión tiene un objetivo claro dentro de la cuenta.",
      icon: "🧠"
    },
    {
      title: "Experiencia Real en Amazon",
      desc: "Entendemos los problemas habituales de una cuenta porque trabajamos el día a día dentro de Amazon.",
      icon: "📦"
    },
    {
      title: "Decisiones basadas en datos",
      desc: "Analizamos métricas reales para optimizar ventas, conversión y rentabilidad.",
      icon: "📊"
    },
    {
      title: "Enfoque en crecimiento rentable",
      desc: "Buscamos resultados sostenibles, no solo aumentar facturación a cualquier precio.",
      icon: "📈"
    }
  ];

  return (
    <section id="ventajas" className="py-24 bg-[#0e3a4d] overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.4em] mb-4">Nuestra forma de trabajar</h2>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6">Estrategia real para crecer en Amazon</h3>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {ads.map((ad, idx) => (
            <div key={idx} className="bg-white/5 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 hover:border-[#4fd1d1] transition-all duration-300 text-center group">
              <div className="text-6xl mb-8 transform group-hover:scale-125 transition-transform duration-500">{ad.icon}</div>
              <h4 className="text-xl font-black text-[#4fd1d1] mb-5 tracking-tight">{ad.title}</h4>
              <p className="text-slate-300 leading-relaxed text-sm font-medium">{ad.desc}</p>
            </div>
          ))}
        </div>
      </div>
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#4fd1d1]/5 rounded-full blur-[140px] -z-0"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] -z-0"></div>
    </section>
  );
};

export default Advantages;
