
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, ShieldCheck } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Servicios', href: '#servicios' },
    { name: 'Ventajas', href: '#ventajas' },
    { name: 'Soluciones', href: '#soluciones' },
    { name: 'Recursos', href: '#recursos' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 backdrop-blur-xl shadow-lg py-3' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div 
            whileHover={{ rotate: 5, scale: 1.05 }}
            className="relative group cursor-pointer"
          >
            <div className="w-10 h-10 bg-[#0e3a4d] rounded-xl flex items-center justify-center text-white font-black text-xl overflow-hidden shadow-lg">
               <span className="relative z-10">E</span>
               <div className="absolute bottom-0 right-0 w-4 h-4 bg-[#4fd1d1] rotate-45 translate-x-1 translate-y-1"></div>
            </div>
          </motion.div>
          <div className="flex flex-col">
            <span className="text-xl font-black tracking-tighter leading-none text-[#0e3a4d]">
              ECOM
            </span>
            <span className="text-[0.6rem] font-black tracking-[0.3em] leading-none text-[#4fd1d1]">
              AVANZA
            </span>
          </div>
        </div>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <a 
              key={item.name} 
              href={item.href} 
              className="text-sm font-bold text-[#0e3a4d]/70 hover:text-[#0e3a4d] transition-all relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#4fd1d1] transition-all group-hover:w-full"></span>
            </a>
          ))}
          <motion.a 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contacto" 
            className="flex items-center gap-2 bg-[#0e3a4d] text-[#4fd1d1] px-6 py-3 rounded-xl text-sm font-black transition-all shadow-xl shadow-[#0e3a4d]/20"
          >
            Auditoría Gratuita
            <ArrowRight size={16} />
          </motion.a>
        </nav>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-[#0e3a4d] hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-slate-100 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              {navItems.map((item) => (
                <a 
                  key={item.name} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-bold text-[#0e3a4d]"
                >
                  {item.name}
                </a>
              ))}
              <a 
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-[#4fd1d1] text-[#0e3a4d] px-6 py-4 rounded-xl text-center font-black"
              >
                Auditoría Gratuita
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

