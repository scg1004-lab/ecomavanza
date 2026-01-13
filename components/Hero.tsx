import React from 'react';
import { motion } from 'framer-motion';
import { Rocket, Target, BarChart3, Globe, ArrowRight, ShieldCheck } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#f0f9fa]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#4fd1d1]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#0e3a4d]/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/50 backdrop-blur-md border border-white px-5 py-2 rounded-full mb-8 shadow-sm"
            >
              <span className="w-2 h-2 bg-[#4fd1d1] rounded-full animate-ping"></span>
              <span className="text-xs font-black text-[#0e3a4d] uppercase tracking-[0.2em]">Consultoría Amazon Élite 2025</span>
            </motion.div>

            <h1 className="text-6xl md:text-[5.5rem] font-black text-[#0e3a4d] leading-[1.05] mb-8 tracking-tighter">
              Escala tu <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0e3a4d] to-[#4fd1d1]">Imperio</span> en <br />
              Amazon.
            </h1>

            <p className="text-xl md:text-2xl text-[#0e3a4d]/70 font-medium mb-12 max-w-xl leading-relaxed">
              Transformamos cuentas complejas en máquinas de rentabilidad masiva mediante estrategias de datos y publicidad de alta precisión.
            </p>

            <div className="flex flex-col sm:flex-row gap-6">
              <motion.button
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0e3a4d] text-[#4fd1d1] px-10 py-6 rounded-[2rem] text-xl font-black shadow-2xl shadow-[#0e3a4d]/30 flex items-center justify-center gap-3"
              >
                Auditoría Gratuita
                <Rocket size={24} />
              </motion.button>

              <div className="flex items-center gap-4 px-6 py-4">
                <div className="flex -space-x-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full border-4 border-white overflow-hidden shadow-md">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="Client" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="flex text-yellow-400">
                    {'★★★★★'.split('').map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <p className="text-xs font-black text-[#0e3a4d]/50 uppercase tracking-widest">+500 Marcas Escaladas</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(14,58,77,0.15)] bg-white border-8 border-white">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
                alt="Amazon Strategy Dashboard"
                className="w-full h-full object-cover aspect-square md:aspect-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e3a4d]/40 to-transparent"></div>
            </div>

            {/* Floating Stats Cards */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 z-20 bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-slate-100 hidden md:block"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-[#4fd1d1]/20 rounded-2xl flex items-center justify-center text-[#4fd1d1]">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-slate-400 uppercase tracking-widest leading-none">Ventas</p>
                  <p className="text-2xl font-black text-[#0e3a4d]">+342%</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-10 -left-10 z-20 bg-[#0e3a4d] p-6 md:p-8 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl border border-white/10 hidden md:block"
            >
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-[#4fd1d1] rounded-2xl flex items-center justify-center text-[#0e3a4d]">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-sm font-black text-white/50 uppercase tracking-widest leading-none">ROAS</p>
                  <p className="text-2xl font-black text-[#4fd1d1]">12.4x</p>
                </div>
              </div>
            </motion.div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 border-2 border-dashed border-[#0e3a4d]/10 rounded-[4rem] md:rounded-[5rem] -m-4 md:-m-8 pointer-events-none"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
