import React, { useState } from 'react';
import {
  Phone,
  Instagram,
  MapPin,
  Clock,
  MessageSquare,
  ExternalLink,
  Copy,
  Check,
  Navigation,
} from 'lucide-react';
import { StoreSettings } from '../types';

interface ContactSectionProps {
  settings: StoreSettings;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ settings }) => {
  const [copiedAddress, setCopiedAddress] = useState(false);

  const fullAddress =
    settings.addressNote ||
    `${settings.addressStreet || 'Rua Ouro, 15'}, ${
      settings.addressNeighborhood || 'Iguaçu'
    }, ${settings.addressCity || 'Ipatinga - MG'} - CEP ${
      settings.addressCep || '35162-103'
    }`;

  const mapsUrl = settings.mapsUrl || 'https://maps.app.goo.gl/rn4Aa9UeEvHgJeK9A';

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  return (
    <section id="contato" className="py-16 sm:py-20 bg-stone-50 border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-black uppercase tracking-wider mb-3">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>Fale Conosco & Localização</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-purple-950 tracking-tight">
            Onde Estamos & Canais de Atendimento 📍
          </h2>

          <p className="mt-3 text-stone-600 text-base">
            Visite nosso endereço em Ipatinga ou peça pelo delivery para receber seu açaí geladinho e cremoso onde estiver.
          </p>
        </div>

        {/* 3 Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Card 1: WhatsApp */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-100 shadow-md flex flex-col justify-between group hover:border-emerald-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MessageSquare className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Atendimento Rápido
              </span>
              <h3 className="font-display font-black text-2xl text-stone-900 mt-1 mb-2">
                WhatsApp Oficial
              </h3>
              <p className="text-stone-600 text-sm mb-4">
                Tire dúvidas, faça seu pedido ou solicite informações em tempo real com nossa equipe.
              </p>
              <p className="text-lg font-black text-purple-950 font-mono">
                {settings.displayPhone}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <a
                id="btn-contact-falar-whatsapp"
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  'Olá! Gostaria de falar com o atendimento da Açaizaço.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-700/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>FALAR NO WHATSAPP</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 2: Instagram */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-md flex flex-col justify-between group hover:border-pink-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Instagram className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
                Redes Sociais
              </span>
              <h3 className="font-display font-black text-2xl text-stone-900 mt-1 mb-2">
                Instagram Oficial
              </h3>
              <p className="text-stone-600 text-sm mb-4">
                Acompanhe fotos diárias, novidades, stories de clientes e promoções exclusivas.
              </p>
              <p className="text-lg font-black text-purple-950">
                {settings.instagramHandle}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100">
              <a
                id="btn-contact-instagram"
                href={settings.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-pink-600/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>📸 Siga no Instagram</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Card 3: Location / Google Maps */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-md flex flex-col justify-between group hover:border-purple-300 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600">
                Localização & Delivery
              </span>
              <h3 className="font-display font-black text-2xl text-stone-900 mt-1 mb-2">
                Nossa Localização
              </h3>
              <p className="text-stone-600 text-sm mb-4">
                Atendemos com retirada e delivery rápido em embalagens térmicas seladas.
              </p>

              {/* Address detail badge */}
              <div className="p-3.5 rounded-2xl bg-purple-50 border border-purple-100 text-xs text-purple-950 space-y-1">
                <div className="font-extrabold flex items-center gap-1.5 text-purple-900">
                  <MapPin className="w-4 h-4 text-purple-700 flex-shrink-0" />
                  <span>Rua Ouro, 15 - Bairro Iguaçu</span>
                </div>
                <p className="text-stone-600 pl-5 text-[11px]">
                  Ipatinga - MG • CEP 35162-103
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-100 space-y-2">
              <a
                id="btn-contact-ver-maps"
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 bg-purple-700 hover:bg-purple-800 text-white rounded-2xl font-bold text-sm shadow-md shadow-purple-900/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Navigation className="w-4 h-4" />
                <span>VER NO GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                id="btn-contact-copy-address"
                onClick={handleCopyAddress}
                className="w-full py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copiedAddress ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Endereço Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Copiar Endereço Completo</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Google Maps Card */}
        <div className="bg-white rounded-3xl border border-purple-100 shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Map Info Sidebar */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-b from-purple-950 via-purple-900 to-purple-950 text-white">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-800/80 text-purple-200 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-700">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Ponto Físico & Delivery</span>
                </div>

                <h3 className="font-display font-black text-2xl sm:text-3xl text-white mb-2">
                  Açaizaço em Ipatinga 🍇
                </h3>

                <p className="text-purple-200 text-sm leading-relaxed mb-6">
                  Estamos localizados no coração do bairro Iguaçu. Venha retirar seu açaí ou faça seu pedido online com entrega pontual na sua casa.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-900/50 border border-purple-800">
                    <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                        Endereço Completo
                      </h4>
                      <p className="text-sm font-bold text-white mt-0.5">
                        Rua Ouro, 15
                      </p>
                      <p className="text-xs text-purple-200">
                        Bairro Iguaçu • Ipatinga - MG
                      </p>
                      <p className="text-[11px] text-purple-300 font-mono mt-0.5">
                        CEP: 35162-103
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-purple-900/50 border border-purple-800">
                    <Clock className="w-5 h-5 text-amber-300 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">
                        Horário de Funcionamento
                      </h4>
                      <p className="text-sm font-bold text-white mt-0.5">
                        {settings.openingHours}
                      </p>
                      <p className="text-xs text-emerald-400 font-semibold mt-0.5">
                        • Aberto para pedidos & entregas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-purple-800/80 flex flex-col sm:flex-row gap-3">
                <a
                  id="btn-maps-embed-open"
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-purple-950 font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95"
                >
                  <Navigation className="w-4 h-4 text-purple-950" />
                  <span>ABRIR NO GOOGLE MAPS</span>
                  <ExternalLink className="w-4 h-4 text-purple-950" />
                </a>

                <a
                  id="btn-maps-whatsapp-pedir"
                  href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                    'Olá! Gostaria de fazer um pedido para entrega ou retirada na Rua Ouro, 15.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-4 bg-purple-800 hover:bg-purple-700 text-white font-bold text-sm rounded-2xl flex items-center justify-center gap-2 border border-purple-700 transition-all active:scale-95"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>Pedir no WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Google Map iframe */}
            <div className="lg:col-span-7 h-80 sm:h-96 lg:h-auto min-h-[360px] relative bg-stone-100">
              <iframe
                title="Localização Açaizaço no Google Maps"
                src="https://maps.google.com/maps?q=-19.4723881,-42.5496149&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                className="w-full h-full border-0 absolute inset-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* Floating button on top of map */}
              <div className="absolute top-4 right-4 z-10">
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-white/95 backdrop-blur text-purple-950 font-bold text-xs shadow-md border border-stone-200 hover:bg-white flex items-center gap-1.5 transition-all"
                >
                  <MapPin className="w-3.5 h-3.5 text-purple-700" />
                  <span>Ampliar no Maps</span>
                  <ExternalLink className="w-3 h-3 text-stone-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
