import React from 'react';
import { motion } from 'framer-motion';

const Partners: React.FC = () => {
    const logos = [
        { name: 'Amazon', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
        { name: 'Logitech', url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Logitech_logo.svg' },
        { name: 'Target', url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Target_logo.svg' },
        { name: 'H&M', url: 'https://upload.wikimedia.org/wikipedia/commons/5/53/H%26M-Logo.svg' },
        { name: 'Samsung', url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
        { name: 'Nike', url: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
    ];

    return (
        <div className="py-20 bg-white border-y border-slate-100 overflow-hidden">
            <div className="container mx-auto px-6">
                <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.4em] mb-12">Marcas que han confiado en nuestra estrategia:</p>

                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
                    {logos.map((logo, i) => (
                        <motion.img
                            key={logo.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            src={logo.url}
                            alt={logo.name}
                            className="h-6 md:h-8 object-contain hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Partners;
