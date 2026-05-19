import React from 'react';

const FloatingWhatsApp: React.FC = () => {
  return (
    <>
      <style>{`
        @keyframes whatsapp-float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.02);
          }
        }

        @keyframes whatsapp-glow {
          0% {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 0 0 0 rgba(37, 211, 102, 0.4);
          }
          70% {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 0 0 12px rgba(37, 211, 102, 0);
          }
          100% {
            box-shadow: 0 8px 30px rgba(0,0,0,0.12), 0 0 0 0 rgba(37, 211, 102, 0);
          }
        }

        @keyframes shine-sweep {
          0% {
            left: -120%;
          }
          12% {
            left: 120%;
          }
          100% {
            left: 120%;
          }
        }

        .premium-whatsapp-float {
          animation: whatsapp-float 4s ease-in-out infinite, whatsapp-glow 3s infinite;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .premium-whatsapp-float:hover {
          animation-play-state: paused;
          transform: scale(1.08) !important;
          box-shadow: 0 12px 40px rgba(37, 211, 102, 0.35) !important;
        }

        .premium-whatsapp-float::after {
          content: '';
          position: absolute;
          top: 0;
          left: -120%;
          width: 50px;
          height: 100%;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.6) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: skewX(-25deg);
          animation: shine-sweep 6s infinite ease-in-out;
        }
      `}</style>

      <a
        href="https://wa.me/34654822800" // Reemplaza con el número de WhatsApp real
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] flex items-center bg-white rounded-full p-2 pr-2 pl-6 border-[3px] border-[#25D366] premium-whatsapp-float group"
      >
        <div className="flex flex-col justify-center mr-4">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-[#0e3a4d] font-black text-base leading-none">Asesor</span>
            <span className="w-2.5 h-2.5 bg-[#25D366] rounded-full animate-pulse"></span>
          </div>
          <span className="text-slate-500 text-xs font-medium leading-none">Responde en 1 minuto</span>
        </div>
        <div className="w-12 h-12 bg-[#25D366] rounded-full flex items-center justify-center text-white shrink-0 shadow-inner group-hover:bg-[#20bd5a] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
            <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c-.003 1.396.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
          </svg>
        </div>
      </a>
    </>
  );
};

export default FloatingWhatsApp;
