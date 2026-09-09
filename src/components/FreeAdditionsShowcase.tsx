import React from 'react';
import { Sparkles, PlusCircle } from 'lucide-react';
import { FREE_ADDITIONS, EXTRA_ADDITIONS } from '../data/products';
import { formatCurrency } from '../utils/formatters';

interface FreeAdditionsShowcaseProps {
  onOpenQuickAcai: () => void;
}

export const FreeAdditionsShowcase: React.FC<FreeAdditionsShowcaseProps> = ({ onOpenQuickAcai }) => {
  return (
    <section id="adicionais" className="py-16 bg-gradient-to-b from-stone-50 via-purple-50/40 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Monte Como Quiser</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-purple-950 tracking-tight">
            10 Adicionais Grátis no seu Açaí! 🍓
          </h2>

          <p className="mt-3 text-stone-600 text-base sm:text-lg">
            Aqui na Açaizaço você tem liberdade total: escolha até <strong>10 complementos gratuitos</strong> para acompanhar seu açaí tradicional.
          </p>
        </div>

        {/* Free Additions Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-lg mb-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-stone-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                Inclusos sem custo extra
              </span>
              <h3 className="font-display font-black text-2xl text-stone-900">
                Lista de Adicionais Gratuitos
              </h3>
            </div>
            <button
              onClick={onOpenQuickAcai}
              className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-bold shadow-md shadow-purple-600/20 active:scale-95 transition-all"
            >
              Montar Meu Açaí Agora 🥣
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 pt-6">
            {FREE_ADDITIONS.map((item) => (
              <div
                key={item.id}
                className="p-3 rounded-2xl bg-stone-50 hover:bg-purple-50/70 border border-stone-100 hover:border-purple-200 transition-all flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-stone-800 group-hover:text-purple-900 transition-colors">
                    {item.name}
                  </span>
                </div>
                <span className="text-[10px] font-black uppercase text-emerald-700 bg-emerald-100/80 px-1.5 py-0.5 rounded">
                  Grátis
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Extra Additions Grid */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-pink-100 shadow-lg">
          <div className="pb-6 border-b border-stone-100">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
              Para turbinar ainda mais
            </span>
            <h3 className="font-display font-black text-2xl text-stone-900">
              Adicionais Extras Especiais
            </h3>
            <p className="text-stone-500 text-sm mt-1">
              Doces, cremes artesanais e mousses nobres para transformar seu açaí em uma verdadeira sobremesa gourmet.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-6">
            {EXTRA_ADDITIONS.map((extra) => (
              <div
                key={extra.id}
                className="p-4 rounded-2xl bg-pink-50/40 border border-pink-100 hover:border-pink-300 transition-all flex items-center justify-between"
              >
                <div>
                  <h4 className="font-display font-black text-stone-900 text-sm">
                    {extra.name}
                  </h4>
                  {extra.description && (
                    <p className="text-stone-500 text-xs mt-0.5">
                      {extra.description}
                    </p>
                  )}
                </div>
                <div className="text-right flex-shrink-0 ml-3">
                  <span className="font-display font-black text-pink-700 text-base">
                    +{formatCurrency(extra.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
