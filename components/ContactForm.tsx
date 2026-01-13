import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, User, Mail, MessageSquare, Briefcase } from 'lucide-react';

const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        // Simulate API call
        setTimeout(() => {
            setFormState('success');
        }, 1500);
    };

    if (formState === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-[3rem] shadow-2xl border border-slate-100 text-center"
            >
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h3 className="text-3xl font-black text-[#0e3a4d] mb-4">¡Mensaje Recibido!</h3>
                <p className="text-slate-600 font-medium mb-8">Un estratega senior se pondrá en contacto contigo en las próximas 24 horas laborables.</p>
                <button
                    onClick={() => setFormState('idle')}
                    className="text-[#4fd1d1] font-black uppercase tracking-widest text-sm hover:underline"
                >
                    Enviar otro mensaje
                </button>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-100"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nombre Completo</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                required
                                type="text"
                                placeholder="Ej. Juan Pérez"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Corporativo</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                required
                                type="email"
                                placeholder="juan@empresa.com"
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Nombre de tu Marca/Empresa</label>
                    <div className="relative">
                        <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            required
                            type="text"
                            placeholder="Ej. Amazon Brand Co."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Situación Actual o Desafío</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                        <textarea
                            required
                            rows={4}
                            placeholder="Cuéntanos brevemente qué necesitas mejorar en Amazon..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none resize-none"
                        ></textarea>
                    </div>
                </div>

                <button
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="w-full bg-[#0e3a4d] text-[#4fd1d1] py-6 rounded-2xl text-xl font-black shadow-xl shadow-[#0e3a4d]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                    {formState === 'submitting' ? 'Procesando...' : (
                        <>
                            Solicitar Auditoría Gratuita
                            <Send size={20} />
                        </>
                    )}
                </button>

                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                    Al enviar este formulario, aceptas nuestra política de privacidad y tratamiento de datos.
                </p>
            </form>
        </motion.div>
    );
};

export default ContactForm;
