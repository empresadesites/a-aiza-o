import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Star, Zap } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
  onViewMenu: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow, onViewMenu }) => {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-white to-stone-50 py-10 sm:py-16 lg:py-20">
      {/* Decorative Ambient Blobs */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-purple-300/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-emerald-300/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-72 h-72 rounded-full bg-pink-300/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Promo Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 border border-purple-200 text-xs sm:text-sm font-bold mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-purple-600 animate-ping" />
              <span>🍇 O Melhor Açaí & Milk-Shakes da Cidade</span>
              <span className="bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
                10 Grátis
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-purple-950 tracking-tight leading-[1.15]">
              Seu açaí do seu <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-600 to-emerald-600">
                jeito! 💜
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Monte seu pedido, escolha seus acompanhamentos e receba onde estiver.
              São <strong className="text-purple-900 font-bold">10 adicionais grátis</strong> para deixar seu copo ainda mais caprichado e delicioso!
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                id="btn-hero-pedir-agora"
                onClick={onOrderNow}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-800 via-purple-700 to-pink-600 hover:from-purple-900 hover:to-pink-700 text-white font-extrabold text-base sm:text-lg shadow-xl shadow-purple-900/25 active:scale-95 transition-all flex items-center justify-center gap-3 group"
              >
                <span>🍇 PEDIR AGORA</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                id="btn-hero-ver-cardapio"
                onClick={onViewMenu}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-800 font-bold text-base sm:text-lg border-2 border-stone-200 hover:border-purple-300 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>📋 VER CARDÁPIO</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="mt-10 pt-6 border-t border-purple-100/80 grid grid-cols-3 gap-3 sm:gap-6 text-left max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-700 flex-shrink-0">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-500" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">4.9 / 5.0</p>
                  <p className="text-[11px] text-stone-500">Clientes amam</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Zap className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">Rápido</p>
                  <p className="text-[11px] text-stone-500">No seu endereço</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-pink-100 flex items-center justify-center text-pink-700 flex-shrink-0">
                  <ShieldCheck className="w-4 h-4 text-pink-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-stone-900">100% Puro</p>
                  <p className="text-[11px] text-stone-500">Super cremoso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative flex justify-center">
            {/* Visual Container with glowing ring */}
            <div className="relative w-full max-w-md sm:max-w-lg">
              {/* Glowing decorative backdrop */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-600/30 via-pink-500/20 to-emerald-400/20 blur-2xl transform rotate-2 scale-95" />

              <div className="relative rounded-3xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-purple-900 to-purple-950 aspect-square flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=900&q=85"
                  alt="Copo de Açaí Especial Açaizaço com Morango, Granola, Banana e Leite Ninho"
                  className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />

                {/* Bottom Overlay Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-purple-950/90 via-purple-950/40 to-transparent flex items-end p-5">
                  <div className="text-white">
                    <p className="text-xs font-semibold text-pink-300 uppercase tracking-wider">
                      Copo Mais Pedido
                    </p>
                    <p className="text-lg font-bold font-display text-white">
                      Açaí 500ml + 10 Adicionais Grátis
                    </p>
                    <p className="text-sm font-extrabold text-emerald-400">
                      Apenas R$ 23,00
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Badge 1: Top Right */}
              <div className="absolute -top-4 -right-2 sm:-right-4 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-purple-100 flex items-center gap-2 animate-bounce-subtle">
                <div className="w-8 h-8 rounded-xl bg-purple-600 text-white flex items-center justify-center text-sm font-black">
                  10
                </div>
                <div>
                  <p className="text-[11px] font-extrabold uppercase text-purple-700 tracking-wider">
                    Adicionais
                  </p>
                  <p className="text-xs font-bold text-stone-800">
                    Totalmente Grátis!
                  </p>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left */}
              <div className="absolute -bottom-4 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-xl border border-emerald-100 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-stone-900">
                    Milk-Shakes Trufados
                  </p>
                  <p className="text-[11px] font-semibold text-emerald-700">
                    Ninho & Ovomaltine
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
