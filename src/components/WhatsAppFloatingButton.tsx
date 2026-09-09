import React from 'react';
import { MessageCircle } from 'lucide-react';
import { createDirectWhatsAppUrl } from '../utils/formatters';

interface WhatsAppFloatingButtonProps {
  whatsappNumber: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({ whatsappNumber }) => {
  const whatsappUrl = createDirectWhatsAppUrl(
    whatsappNumber,
    'Olá! Gostaria de fazer um pedido na Açaizaço.'
  );

  return (
    <aside aria-label="Atendimento rápido" className="fixed bottom-5 right-5 z-40 flex items-center group">
      {/* Tooltip on hover for desktop */}
      <span className="hidden sm:block mr-2.5 px-3 py-1.5 bg-stone-900 text-white text-xs font-bold rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Pedir pelo WhatsApp 💬
      </span>

      <a
        id="btn-floating-whatsapp"
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp Oficial da Açaizaço"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white flex items-center justify-center shadow-xl shadow-emerald-700/30 hover:scale-110 active:scale-95 transition-all duration-300 relative"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30 pointer-events-none" />
        <MessageCircle className="w-7 h-7 fill-white text-emerald-500" />
      </a>
    </aside>
  );
};
