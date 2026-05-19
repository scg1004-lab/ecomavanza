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
        href="https://wa.me/34654822800?text=%C2%A1Hola%21+Me+gustar%C3%ADa+recibir+m%C3%A1s+informaci%C3%B3n."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[60] flex items-center gap-4 bg-white rounded-full p-2 pl-6 border-[3px] border-[#25D366] premium-whatsapp-float group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
      >
        {/* Texto personalizado que sustituye al número */}
        <div className="flex flex-col text-left">
          <span className="text-[10px] uppercase tracking-wider text-gray-400 font-bold leading-none">
            ¿Tienes dudas?
          </span>
          <span className="text-sm font-semibold text-gray-800 group-hover:text-[#25D366] transition-colors duration-300">
            EcomAvanza Soporte
          </span>
        </div>

        {/* Contenedor del Icono estilo "Badge" */}
        <div className="bg-[#25D366] p-2.5 rounded-full text-white shadow-md group-hover:scale-105 transition-transform duration-300">
          <svg
            className="w-6 h-6 fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.623-1.023-5.09-2.885-6.956C16.528 1.983 14.069 1.96 11.993 1.96c-5.436 0-9.86 4.37-9.864 9.8 0 1.742.48 3.44 1.39 4.95l-.974 3.555 3.65-.957zM17.491 14.3c-.266-.134-1.574-.775-1.817-.863-.243-.088-.419-.133-.596.133-.176.265-.683.862-.838 1.039-.154.177-.31.198-.576.065-.266-.134-1.12-.413-2.133-1.317-.788-.702-1.32-1.569-1.474-1.835-.155-.266-.017-.41.117-.543.12-.12.266-.31.4-.464.133-.155.177-.265.266-.443.089-.177.044-.332-.022-.464-.067-.133-.596-1.437-.817-1.967-.215-.518-.433-.448-.596-.456-.153-.008-.33-.01-.507-.01-.177 0-.464.067-.707.332-.243.265-.928.907-.928 2.212 0 1.305.95 2.566 1.084 2.743.133.177 1.87 2.854 4.529 4c.633.273 1.127.436 1.512.559.635.202 1.212.174 1.669.107.51-.077 1.574-.641 1.795-1.26.223-.619.223-1.15.156-1.26-.067-.11-.244-.176-.51-.309z" />
          </svg>
        </div>
      </a >
    </>
  );
};

export default FloatingWhatsApp;
