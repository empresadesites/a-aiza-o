import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, PhoneCall, Clock, Sparkles, MapPin } from 'lucide-react';
import { StoreSettings } from '../types';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  settings: StoreSettings;
  onNavigateToSection: (sectionId: string) => void;
  onOpenQuickAcai: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  settings,
  onNavigateToSection,
  onOpenQuickAcai,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    onNavigateToSection(id);
  };

  return (
    <>
      {/* Top Banner with Delivery & Hours */}
      <div className="bg-gradient-to-r from-purple-950 via-purple-900 to-emerald-950 text-white text-xs py-2 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <a
              href={settings.mapsUrl || 'https://maps.app.goo.gl/rn4Aa9UeEvHgJeK9A'}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-emerald-300 hover:text-white transition-colors flex items-center gap-1"
            >
              <MapPin className="w-3 h-3 text-emerald-400" />
              <span>Ipatinga - MG (Iguaçu)</span>
            </a>
            <span className="hidden sm:inline text-purple-300">•</span>
            <span className="hidden sm:inline text-purple-200 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {settings.openingHours}
            </span>
          </div>

          <div className="flex items-center gap-4 text-purple-200">
            <a
              href={`https://wa.me/${settings.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium"
            >
              <PhoneCall className="w-3 h-3 text-emerald-400" />
              <span>{settings.displayPhone}</span>
            </a>
            <span className="hidden md:inline text-purple-400">|</span>
            <span className="hidden md:inline text-amber-300 font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> 10 Adicionais Grátis no seu Açaí
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md border-b border-purple-100 py-3'
            : 'bg-white border-b border-purple-50 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <div
            id="brand-logo-btn"
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-purple-800 via-purple-600 to-pink-500 flex items-center justify-center shadow-md shadow-purple-900/20 group-hover:scale-105 transition-transform duration-200">
              <span className="text-xl sm:text-2xl">🍇</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-black text-2xl sm:text-3xl tracking-tight text-purple-950">
                  AÇAI<span className="text-emerald-600">ZAÇO</span>
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-wider text-purple-600 uppercase">
                O Seu Açaí do Seu Jeito
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              id="nav-inicio"
              onClick={() => handleNavClick('hero')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Início
            </button>
            <button
              id="nav-cardapio"
              onClick={() => handleNavClick('cardapio')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Cardápio
            </button>
            <button
              id="nav-monte-acai"
              onClick={onOpenQuickAcai}
              className="px-3 py-2 rounded-lg text-sm font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center gap-1"
            >
              <span>Monte seu Açaí</span>
              <span className="text-xs bg-purple-600 text-white font-bold px-1.5 py-0.5 rounded-full">
                10 Grátis
              </span>
            </button>
            <button
              id="nav-milkshakes"
              onClick={() => handleNavClick('milkshakes')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Milk-Shakes
            </button>
            <button
              id="nav-adicionais"
              onClick={() => handleNavClick('adicionais')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Adicionais
            </button>
            <button
              id="nav-faq"
              onClick={() => handleNavClick('faq')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              FAQ
            </button>
            <button
              id="nav-contato"
              onClick={() => handleNavClick('contato')}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-stone-700 hover:text-purple-700 hover:bg-purple-50 transition-colors"
            >
              Contato
            </button>
          </nav>

          {/* Action Buttons: Cart & Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              id="btn-meu-pedido-header"
              onClick={onOpenCart}
              className="relative flex items-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold px-4 py-2.5 rounded-xl shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
            >
              <div className="relative">
                <ShoppingBag className="w-5 h-5 text-white" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-purple-600 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-sm tracking-wide hidden sm:inline">MEU PEDIDO</span>
              <span className="text-sm sm:hidden font-bold">({cartItemCount})</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              id="btn-mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-purple-100 bg-white px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1.5">
              <button
                id="mobile-nav-inicio"
                onClick={() => handleNavClick('hero')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                🏠 Início
              </button>
              <button
                id="mobile-nav-cardapio"
                onClick={() => handleNavClick('cardapio')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                📋 Cardápio Completo
              </button>
              <button
                id="mobile-nav-monte-acai"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuickAcai();
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-purple-800 bg-purple-50 flex items-center justify-between"
              >
                <span>🍇 Monte seu Açaí</span>
                <span className="text-xs bg-purple-600 text-white font-bold px-2 py-0.5 rounded-full">
                  10 Grátis
                </span>
              </button>
              <button
                id="mobile-nav-milkshakes"
                onClick={() => handleNavClick('milkshakes')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                🥤 Milk-Shakes Trufados
              </button>
              <button
                id="mobile-nav-vitaminas"
                onClick={() => handleNavClick('vitaminas')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                ⚡ Vitaminas de Açaí
              </button>
              <button
                id="mobile-nav-adicionais"
                onClick={() => handleNavClick('adicionais')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                🍓 Adicionais & Extras
              </button>
              <button
                id="mobile-nav-faq"
                onClick={() => handleNavClick('faq')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                ❓ Perguntas Frequentes (FAQ)
              </button>
              <button
                id="mobile-nav-contato"
                onClick={() => handleNavClick('contato')}
                className="w-full text-left px-3 py-2.5 rounded-lg text-base font-semibold text-stone-800 hover:bg-purple-50 hover:text-purple-700"
              >
                📞 Contato & Localização
              </button>
            </div>

            <div className="mt-4 pt-4 border-t border-stone-100 flex flex-col gap-2">
              <button
                id="mobile-menu-cart-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCart();
                }}
                className="w-full py-3 px-4 bg-emerald-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-700/20"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Ver Meu Pedido ({cartItemCount})</span>
              </button>
              <a
                href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                  'Olá! Gostaria de fazer um pedido na Açaizaço.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-purple-100 text-purple-900 rounded-xl font-semibold text-center text-sm"
              >
                Falar direto no WhatsApp 💬
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
