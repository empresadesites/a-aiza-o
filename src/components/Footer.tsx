import React from 'react';
import { Heart, Instagram, MessageSquare, Shield, ArrowUp, MapPin, ExternalLink } from 'lucide-react';
import { StoreSettings } from '../types';

interface FooterProps {
  settings: StoreSettings;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-purple-950 text-white pt-16 pb-12 border-t-4 border-purple-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-purple-900">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-pink-500 flex items-center justify-center text-2xl shadow-md">
                🍇
              </div>
              <span className="font-display font-black text-3xl tracking-tight text-white">
                AÇAI<span className="text-emerald-400">ZAÇO</span>
              </span>
            </div>
            <p className="text-purple-200 text-sm max-w-sm leading-relaxed">
              O açaí mais saboroso e cremoso, preparado com frutas selecionadas e até 10 adicionais grátis para você montar do seu jeito.
            </p>
            <div className="pt-2">
              <a
                id="btn-footer-instagram"
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-pink-600/30 hover:bg-pink-600/50 border border-pink-500/40 text-white font-bold text-xs transition-all active:scale-95"
              >
                <Instagram className="w-4 h-4 text-pink-400" />
                <span>📸 Siga a Açaizaço no Instagram ({settings.instagramHandle})</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="font-display font-black text-base text-white uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm text-purple-200">
              <li>
                <a href="#hero" className="hover:text-emerald-300 transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-emerald-300 transition-colors">
                  Cardápio Completo
                </a>
              </li>
              <li>
                <a href="#adicionais" className="hover:text-emerald-300 transition-colors">
                  10 Adicionais Grátis
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-emerald-300 transition-colors">
                  Dúvidas Frequentes (FAQ)
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-emerald-300 transition-colors">
                  Contato & Localização
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Support */}
          <div>
            <h4 className="font-display font-black text-base text-white uppercase tracking-wider mb-4">
              Atendimento
            </h4>
            <div className="space-y-3 text-sm text-purple-200">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <strong className="text-white">Horário:</strong> {settings.openingHours}
              </p>
              <p>
                <strong className="text-white">WhatsApp:</strong> {settings.displayPhone}
              </p>
              <p>
                <strong className="text-white">Instagram:</strong> {settings.instagramHandle}
              </p>
              <p className="flex items-start gap-2 pt-0.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Endereço:</strong>{' '}
                  <a
                    id="footer-maps-link"
                    href={settings.mapsUrl || 'https://maps.app.goo.gl/rn4Aa9UeEvHgJeK9A'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-emerald-300 underline transition-colors inline-flex items-center gap-1"
                  >
                    <span>{settings.addressNote || 'Rua Ouro, 15 - Iguaçu, Ipatinga - MG'}</span>
                    <ExternalLink className="w-3 h-3 inline" />
                  </a>
                </span>
              </p>
              <div className="pt-1">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold hover:underline"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chamar no WhatsApp Oficial</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin access */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-purple-300">
          <p>© {new Date().getFullYear()} Açaizaço. Todos os direitos reservados.</p>

          <div className="flex items-center gap-6">
            <button
              id="btn-footer-admin"
              onClick={onOpenAdmin}
              className="text-purple-400 hover:text-purple-200 transition-colors flex items-center gap-1 font-medium"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Acesso Lojista / Painel</span>
            </button>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-200 hover:text-white transition-colors"
              title="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
