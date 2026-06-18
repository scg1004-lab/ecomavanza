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
      q: "¿Qué hace exactamente una agencia Amazon?",
      a: (
        <p>
          Una agencia Amazon se encarga de gestionar y optimizar los aspectos más importantes de una cuenta para mejorar ventas, visibilidad y rentabilidad.
          En <strong>EcomAvanza</strong> trabajamos áreas como la gestión de cuenta, Amazon Ads, optimización de listings, catálogo y estrategia de crecimiento dentro de Seller Central.
        </p>
      )
    },
    {
      q: "¿Cómo podéis ayudarme a vender más en Amazon?",
      a: (
        <p>
          Analizamos tu situación para identificar qué está limitando el crecimiento de tu cuenta: posicionamiento, conversión, publicidad o estructura del catálogo.
          A partir de ahí, aplicamos mejoras en los productos, la publicidad y la estrategia para ayudarte a crecer de forma rentable y sostenible.
        </p>
      )
    },
    {
      q: "¿Trabajáis con vendedores y marcas que ya venden en Amazon?",
      a: (
        <p>
          Sí. Trabajamos tanto con marcas que ya venden en Amazon como con empresas que están preparando su lanzamiento.
          Nos adaptamos al punto en el que se encuentre cada negocio, desde las primeras ventas hasta cuentas consolidadas que buscan seguir creciendo.
        </p>
      )
    },
    {
      q: "¿Cómo empezar a trabajar con una agencia Amazon?",
      a: (
        <p>
          El primer paso es una llamada inicial para conocer tu situación, objetivos y necesidades.
          Después analizamos tu caso y te proponemos un plan de acción claro con las prioridades y oportunidades detectadas. Si encaja para ambas partes, comenzamos a trabajar juntos.
        </p>
      )
    },
    {
      q: "¿Cuánto cuesta contratar una agencia Amazon?",
      a: (
        <p>
          El coste depende del tamaño de la cuenta, los servicios necesarios y el nivel de gestión requerido.
          Trabajamos con una cuota mensual adaptada a cada proyecto y, en algunos casos, un variable vinculado a resultados. Siempre definimos las condiciones de forma transparente antes de empezar.
        </p>
      )
    },
    {
      q: "¿En cuánto tiempo se ven resultados?",
      a: (
        <div className="space-y-2">
          <p>Depende del punto de partida de cada cuenta, pero normalmente:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Listings y catálogo:</strong> mejoras visibles entre 2 y 4 semanas.</li>
            <li><strong>Amazon Ads:</strong> primeros datos relevantes tras 1 o 2 semanas de aprendizaje.</li>
            <li><strong>Crecimiento global de la cuenta:</strong> resultados más sólidos a partir del primer mes de trabajo.</li>
          </ul>
        </div>
      )
    },
    {
      q: "¿Qué diferencia a EcomAvanza de otras agencias Amazon?",
      a: (
        <p>
          La principal diferencia es que también somos vendedores en Amazon.
          No trabajamos únicamente desde la teoría o la consultoría, sino desde la experiencia práctica de gestionar nuestros propios productos dentro del marketplace. Aplicamos ese conocimiento para ayudar a otras marcas a tomar mejores decisiones y crecer con mayor seguridad.
        </p>
      )
    },
    {
      q: "¿Puedo dejar de trabajar con vosotros cuando quiera?",
      a: (
        <p>
          Sí. No trabajamos con permanencias.
          Queremos que sigas con nosotros porque el servicio te aporta valor y resultados, no porque exista una obligación contractual.
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
