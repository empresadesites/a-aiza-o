import React from 'react';
import { Rocket, Sparkles, Cherry, HeartHandshake } from 'lucide-react';

export const Benefits: React.FC = () => {
  const items = [
    {
      id: 'benefit-entrega',
      icon: <Rocket className="w-7 h-7 text-emerald-600" />,
      bg: 'bg-emerald-50 border-emerald-100 group-hover:border-emerald-300',
      iconBg: 'bg-emerald-100',
      title: 'Entrega rápida',
      description: 'Seu açaí chega na temperatura ideal, sem derreter e pronto para saborear.',
      emoji: '🚀',
    },
    {
      id: 'benefit-delicioso',
      icon: <Sparkles className="w-7 h-7 text-purple-600" />,
      bg: 'bg-purple-50 border-purple-100 group-hover:border-purple-300',
      iconBg: 'bg-purple-100',
      title: 'Açaí delicioso',
      description: 'Polpa selecionada, consistência densa e sabor autêntico que conquistou a cidade.',
      emoji: '🥣',
    },
    {
      id: 'benefit-frescos',
      icon: <Cherry className="w-7 h-7 text-pink-600" />,
      bg: 'bg-pink-50 border-pink-100 group-hover:border-pink-300',
      iconBg: 'bg-pink-100',
      title: 'Ingredientes frescos',
      description: 'Frutas fatiadas na hora, coberturas premium e complementos crocantes.',
      emoji: '🍓',
    },
    {
      id: 'benefit-monte',
      icon: <HeartHandshake className="w-7 h-7 text-purple-800" />,
      bg: 'bg-indigo-50 border-indigo-100 group-hover:border-indigo-300',
      iconBg: 'bg-indigo-100',
      title: 'Monte do seu jeito',
      description: 'Até 10 adicionais grátis em cada copo para você criar sua combinação dos sonhos.',
      emoji: '💜',
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              id={item.id}
              className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${item.bg} group flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <span className="text-2xl" role="img" aria-label={item.title}>
                    {item.emoji}
                  </span>
                </div>
                <h3 className="font-display font-black text-xl text-stone-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-black/5 flex items-center text-xs font-bold text-stone-500 uppercase tracking-wider">
                <span>Padrão Açaizaço</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
