import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { FAQ_ITEMS } from '../data/products';

export const FAQSection: React.FC = () => {
  // Start with first question open
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 sm:py-20 bg-white border-t border-stone-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
            <span>Tire Suas Dúvidas</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-purple-950 tracking-tight">
            Perguntas Frequentes (FAQ) ❓
          </h2>

          <p className="mt-3 text-stone-600 text-base">
            Tudo o que você precisa saber para fazer seu pedido na Açaizaço de forma rápida e prática.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                id={`faq-item-${index}`}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-purple-300 bg-purple-50/40 shadow-sm'
                    : 'border-stone-200 bg-stone-50/60 hover:border-purple-200'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-display font-bold text-stone-900 text-base sm:text-lg focus:outline-none"
                >
                  <span className={isOpen ? 'text-purple-900' : 'text-stone-800'}>
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-purple-600 text-white rotate-180'
                        : 'bg-stone-200/80 text-stone-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-stone-600 text-sm sm:text-base leading-relaxed border-t border-purple-100/60 mt-1">
                    <p className="pt-3">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
