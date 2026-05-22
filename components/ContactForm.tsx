import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, User, Mail, MessageSquare, Briefcase } from 'lucide-react';

const ContactForm: React.FC = () => {
    const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormState('submitting');
        setErrorMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || 'No se pudo enviar el formulario');
            }

            setFormState('success');
            setFormData({ name: '', email: '', company: '', message: '' });
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : 'No se pudo enviar el formulario');
            setFormState('error');
        }
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
                <h3 className="text-3xl font-black text-[#0e3a4d] mb-4">Mensaje recibido</h3>
                <p className="text-slate-600 font-medium mb-8">Un estratega senior se pondra en contacto contigo en las proximas 24 horas laborables.</p>
                <button
                    onClick={() => {
                        setFormState('idle');
                        setErrorMessage('');
                    }}
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
                                name="name"
                                value={formData.name}
                                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                placeholder="Ej. Juan Perez"
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
                                name="email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
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
                            name="company"
                            value={formData.company}
                            onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                            placeholder="Ej. Amazon Brand Co."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Situacion Actual o Desafio</label>
                    <div className="relative">
                        <MessageSquare className="absolute left-4 top-4 text-slate-400" size={18} />
                        <textarea
                            required
                            name="message"
                            value={formData.message}
                            onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                            rows={4}
                            placeholder="Cuentanos brevemente que necesitas mejorar en Amazon..."
                            className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-4 text-[#0e3a4d] font-bold focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none resize-none"
                        ></textarea>
                    </div>
                </div>

                {formState === 'error' && (
                    <div className="rounded-2xl bg-red-50 px-5 py-4 text-sm font-bold text-red-700">
                        {errorMessage}
                    </div>
                )}

                <button
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="w-full bg-[#0e3a4d] text-[#4fd1d1] py-6 rounded-2xl text-xl font-black shadow-xl shadow-[#0e3a4d]/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                >
                    {formState === 'submitting' ? 'Procesando...' : (
                        <>
                            Solicitar Auditoria Gratuita
                            <Send size={20} />
                        </>
                    )}
                </button>

                <p className="text-center text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                    Al enviar este formulario, aceptas nuestra politica de privacidad y tratamiento de datos.
                </p>
            </form>
        </motion.div>
    );
};

export default ContactForm;
