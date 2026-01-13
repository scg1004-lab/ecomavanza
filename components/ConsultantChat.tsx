
import React, { useState, useRef, useEffect } from 'react';
import { getStrategicAdvice } from '../services/gemini';
import { ChatMessage } from '../types';

const ConsultantChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: '¡Hola! Soy tu consultor de ECOM AVANZA. ¿Cómo puedo ayudarte hoy a dominar Amazon y escalar tus ventas?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    const history = messages.map(m => ({ role: m.role, text: m.text }));
    const responseText = await getStrategicAdvice(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', text: responseText || "Tuvimos un problema procesando tu consulta." }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#0e3a4d] rounded-2xl flex items-center justify-center text-[#4fd1d1] shadow-2xl hover:bg-[#082a3a] transition-all hover:scale-110 active:scale-95 border-2 border-[#4fd1d1]/30 group"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4fd1d1] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#4fd1d1]"></span>
            </span>
          </div>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-24 right-0 w-80 sm:w-[400px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(14,58,77,0.3)] border border-slate-200 overflow-hidden flex flex-col max-h-[650px] animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="bg-[#0e3a4d] p-8 text-white relative">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4fd1d1]/5 -rotate-45 translate-x-12 -translate-y-12"></div>
            <h4 className="font-black text-xl tracking-tight">Estratega ECOM AVANZA</h4>
            <div className="flex items-center gap-2 mt-1">
               <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
               <p className="text-xs text-[#4fd1d1] font-black uppercase tracking-widest">En línea para ayudarte</p>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-[#f0f9fa]/50 min-h-[350px]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#0e3a4d] text-white rounded-tr-none shadow-lg' 
                    : 'bg-white text-[#0e3a4d] shadow-sm border border-slate-200 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white text-[#4fd1d1] p-4 rounded-2xl shadow-sm border border-slate-200 rounded-tl-none flex gap-1">
                  <div className="w-2 h-2 bg-[#4fd1d1] rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-[#4fd1d1] rounded-full animate-bounce [animation-delay:-.3s]"></div>
                  <div className="w-2 h-2 bg-[#4fd1d1] rounded-full animate-bounce [animation-delay:-.5s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-6 border-t border-slate-100 bg-white">
            <div className="flex gap-3">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu consulta estratégica..."
                className="flex-1 bg-slate-50 border-none rounded-xl px-5 py-3 text-sm font-medium focus:ring-2 focus:ring-[#4fd1d1] transition-all outline-none text-[#0e3a4d]"
              />
              <button 
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="bg-[#4fd1d1] text-[#0e3a4d] p-3 rounded-xl disabled:opacity-50 hover:bg-[#3db8b8] transition-all shadow-lg shadow-[#4fd1d1]/20 active:scale-95"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConsultantChat;
