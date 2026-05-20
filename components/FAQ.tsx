import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-100 last:border-none py-6">
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between gap-6 text-left group cursor-pointer py-2 focus:outline-none"
      >
        <span className={`text-lg md:text-xl font-bold transition-colors duration-300 ${isOpen ? 'text-[#4fd1d1]' : 'text-[#0e3a4d] group-hover:text-[#4fd1d1]'}`}>
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#4fd1d1]/10 text-[#4fd1d1]' : 'bg-slate-50 text-[#0e3a4d]/60 group-hover:bg-[#f0f9fa] group-hover:text-[#0e3a4d]'}`}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, marginTop: 16 }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="text-slate-600 font-medium leading-relaxed text-base md:text-lg pr-12">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: "¿Qué hace exactamente una agencia de Amazon como EcomAvanza?",
      a: (
        <p>
          Una agencia de Amazon se encarga de gestionar y optimizar tu cuenta para que vendas más y con más control.
          En <strong>EcomAvanza</strong> trabajamos todo lo que influye en tus resultados: listings, Amazon Ads, catálogo y estrategia general dentro de Seller Central.
        </p>
      )
    },
    {
      q: "¿Cómo podéis ayudarme a vender más en Amazon?",
      a: (
        <p>
          Analizamos tu cuenta y detectamos qué está frenando tus ventas (visibilidad, conversión o publicidad).
          A partir de ahí, optimizamos tus productos, mejoramos la estrategia de anuncios y trabajamos para que tu marca crezca de forma estable y rentable.
        </p>
      )
    },
    {
      q: "¿Qué tipo de empresas o marcas trabajáis?",
      a: (
        <p>
          Trabajamos tanto con marcas que empiezan en Amazon como con cuentas ya activas que no están consiguiendo los resultados esperados.
          Nos adaptamos al nivel de cada negocio, desde lanzamientos hasta escalado de cuentas con volumen.
        </p>
      )
    },
    {
      q: "¿Cómo es el proceso para empezar a trabajar con vosotros?",
      a: (
        <p>
          Empezamos con una llamada donde revisamos tu situación y objetivos.
          Después te proponemos un plan claro con prioridades y siguientes pasos. Si encaja, arrancamos con la optimización y el seguimiento continuo.
        </p>
      )
    },
    {
      q: "¿Cuánto cuesta trabajar con EcomAvanza?",
      a: (
        <p>
          Depende del tamaño de la cuenta y el nivel de gestión que necesites.
          Trabajamos con una cuota fija mensual y, en algunos casos, un variable ligado a resultados. Siempre lo definimos de forma transparente antes de empezar.
        </p>
      )
    },
    {
      q: "¿En cuánto tiempo se ven resultados?",
      a: (
        <div className="space-y-2">
          <p>Depende del punto de partida, pero normalmente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>En listings:</strong> mejoras en 2–4 semanas</li>
            <li><strong>En Amazon Ads:</strong> primeros datos claros en 1–2 semanas de aprendizaje</li>
            <li><strong>En crecimiento global:</strong> evolución más sólida a partir del primer mes</li>
          </ul>
        </div>
      )
    },
    {
      q: "¿Voy a tener control sobre mi cuenta si la delego?",
      a: (
        <p>
          Sí, siempre.
          Tú eres el propietario de la cuenta y tienes acceso total. Además, te explicamos qué hacemos y por qué, con reportes claros para que entiendas la evolución del negocio.
        </p>
      )
    },
    {
      q: "¿Puedo dejar de trabajar con vosotros cuando quiera?",
      a: (
        <p>
          Sí. No trabajamos con permanencias.
          Nuestro objetivo es que te quedes porque ves resultados, no porque tengas un contrato que te obligue.
        </p>
      )
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-black text-[#4fd1d1] uppercase tracking-[0.4em] mb-4">Respuestas Rápidas</h2>
          <h3 className="text-4xl md:text-5xl font-black text-[#0e3a4d] mb-6">Preguntas Frecuentes</h3>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            Resolvemos tus dudas sobre cómo colaboramos para llevar tu negocio en Amazon al siguiente nivel.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-[#f0f9fa]/40 p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-sm">
          <div className="divide-y divide-slate-100">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Decorative patterns */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-[#4fd1d1]/5 rounded-full blur-[100px] pointer-events-none -translate-x-1/2"></div>
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#0e3a4d]/5 rounded-full blur-[120px] pointer-events-none translate-x-1/2"></div>
    </section>
  );
};

export default FAQ;
