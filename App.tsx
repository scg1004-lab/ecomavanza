import React from 'react';
import { motion } from 'framer-motion';
import Header from './components/Navbar';
import Hero from './components/Hero';
import Partners from './components/Partners';
import PainPoints from './components/PainPoints';
import Services from './components/Services';
import Advantages from './components/Advantages';
import ContactForm from './components/ContactForm';
import ConsultantChat from './components/ConsultantChat';

// Motion Wrapper Component
const RevealOnScroll: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
  >
    {children}
  </motion.div>
);

const Solutions: React.FC = () => {
  return (
    <section id="soluciones" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.3em] mb-4">Soluciones a Medida</h2>
            <h3 className="text-4xl md:text-6xl font-black text-[#0e3a4d] mb-6 tracking-tighter">Tu Crecimiento en Cada Etapa</h3>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-10">
          {/* New Sellers */}
          <RevealOnScroll>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-12 h-full rounded-[3rem] bg-[#f0f9fa] border border-slate-100 group transition-all duration-300"
            >
              <div className="w-16 h-16 bg-[#0e3a4d] rounded-2xl flex items-center justify-center text-[#4fd1d1] mb-8 font-black text-2xl shadow-lg group-hover:rotate-6 transition-transform">01</div>
              <h4 className="text-3xl font-black text-[#0e3a4d] mb-6 leading-tight">Para Nuevos Vendedores</h4>
              <ul className="space-y-5 mb-10">
                {[
                  "Guía para Vendedores Nuevos (Incentivos de hasta $50k)",
                  "Configuración Profesional de Cuenta Seller Central",
                  "Estrategia Agresiva de Lanzamiento de Producto",
                  "Registro de Marca Rápido (IP Accelerator)"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-slate-700 font-bold text-sm">
                    <svg className="w-6 h-6 text-[#4fd1d1] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </RevealOnScroll>

          {/* Established Brands */}
          <RevealOnScroll>
            <motion.div
              whileHover={{ y: -10 }}
              className="p-12 h-full rounded-[3rem] bg-[#0e3a4d] text-white shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#4fd1d1]/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#4fd1d1] rounded-2xl flex items-center justify-center text-[#0e3a4d] mb-8 font-black text-2xl shadow-lg group-hover:-rotate-6 transition-transform">02</div>
                <h4 className="text-3xl font-black mb-6 leading-tight">Marcas Consolidadas</h4>
                <ul className="space-y-5 mb-10">
                  {[
                    "Optimización Publicitaria Escalable ($10k+/mes)",
                    "Expansión Global Selling (EE. UU., Europa, etc.)",
                    "Modelo Híbrido de Externalización Operativa",
                    "Defensa Legal y Cumplimiento Avanzado"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-4 text-slate-300 font-bold text-sm">
                      <svg className="w-6 h-6 text-[#4fd1d1] shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

const Resources: React.FC = () => {
  const articles = [
    {
      title: "Guía 2025: Inversión Amazon Ads",
      desc: "Cómo calcular tu presupuesto publicitario real evitando los errores más comunes del sector.",
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "Anatomía de una Suspensión",
      desc: "Cómo redactar un POA (Plan de Acción) que Amazon apruebe en el primer intento.",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=600"
    },
    {
      title: "IA Estratégica en Amazon",
      desc: "Uso de automatización para optimización de precios y análisis de la competencia.",
      img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600"
    }
  ];

  return (
    <section id="recursos" className="py-24 bg-[#f0f9fa]">
      <div className="container mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.3em] mb-4">Centro de Estrategia</h2>
            <h3 className="text-4xl md:text-6xl font-black text-[#0e3a4d] mb-6 tracking-tighter">Conocimiento para Dominar</h3>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-3 gap-10">
          {articles.map((art, idx) => (
            <RevealOnScroll key={idx}>
              <div className="bg-white h-full rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group border border-slate-100">
                <div className="h-56 overflow-hidden">
                  <img src={art.img} alt={art.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="p-10">
                  <h4 className="text-xl font-black text-[#0e3a4d] mb-4 group-hover:text-[#4fd1d1] transition-colors leading-tight">{art.title}</h4>
                  <p className="text-slate-600 text-sm mb-8 font-medium leading-relaxed">{art.desc}</p>
                  <a href="#" className="text-[#0e3a4d] font-black text-sm flex items-center gap-2 group/link">
                    Explorar guía completa
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover/link:translate-x-2 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0e3a4d] py-20 border-t border-white/5 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 text-center">
        <div className="flex flex-col items-center justify-center gap-2 mb-10">
          <div className="w-12 h-12 bg-[#4fd1d1] rounded-xl flex items-center justify-center text-[#0e3a4d] font-black text-2xl rotate-3 shadow-lg shadow-[#4fd1d1]/20">E</div>
          <span className="text-2xl font-black text-white tracking-tighter">ECOM <span className="text-[#4fd1d1]">AVANZA</span></span>
        </div>
        <p className="text-slate-400 text-sm mb-12 font-bold max-w-lg mx-auto leading-relaxed">Transformamos la complejidad de Amazon en tu mayor ventaja competitiva. El socio definitivo para el éxito global.</p>
        <div className="flex justify-center gap-10 mb-12">
          {['LinkedIn', 'Twitter', 'YouTube', 'Instagram'].map(social => (
            <a key={social} href="#" className="text-slate-500 hover:text-[#4fd1d1] transition-colors font-black text-xs uppercase tracking-[0.2em]">{social}</a>
          ))}
        </div>
        <div className="h-px w-full max-w-2xl mx-auto bg-white/10 mb-10"></div>
        <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.3em]">© 2025 ECOM AVANZA - Consultoría Estratégica Élite. Todos los derechos reservados.</p>
      </div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#4fd1d1]/5 rounded-full blur-[100px]"></div>
    </footer>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#4fd1d1] selection:text-[#0e3a4d] bg-white">
      <Header />
      <main>
        <Hero />
        <Partners />

        <RevealOnScroll><PainPoints /></RevealOnScroll>
        <RevealOnScroll><Services /></RevealOnScroll>
        <RevealOnScroll><Advantages /></RevealOnScroll>

        <Solutions />

        {/* Contact Section */}
        <section id="contacto" className="py-24 bg-[#0e3a4d] relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-10">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_100%_0%,#4fd1d1_0%,transparent_50%)]"></div>
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                  ¿Listo para dominar <br />
                  <span className="text-[#4fd1d1]">tu mercado?</span>
                </h2>
                <p className="text-xl text-slate-300 font-bold mb-12 leading-relaxed">
                  Deja de gestionar la complejidad y empieza a escalar resultados. Nuestra auditoría gratuita es el primer paso hacia tu dominio global en Amazon.
                </p>
                <div className="space-y-6">
                  {[
                    "Análisis profundo de tu cuenta actual",
                    "Identificación de fugas de rentabilidad",
                    "Hoja de ruta personalizada para el escalado",
                    "Proyección de ROAS y ventas 2025"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 text-white/80 font-bold">
                      <div className="w-6 h-6 bg-[#4fd1d1] rounded-full flex items-center justify-center text-[#0e3a4d]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" /></svg>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <ContactForm />
            </div>
          </div>
        </section>

        <Resources />
      </main>
      <Footer />
      <ConsultantChat />
    </div>
  );
};

export default App;
