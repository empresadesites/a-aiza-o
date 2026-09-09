import React from 'react';

export type CategoryFilter = 'all' | 'acai' | 'milkshake' | 'vitamina' | 'adicionais';

interface CategoriesNavProps {
  activeCategory: CategoryFilter;
  onSelectCategory: (category: CategoryFilter) => void;
}

export const CategoriesNav: React.FC<CategoriesNavProps> = ({
  activeCategory,
  onSelectCategory,
}) => {
  const categories: { id: CategoryFilter; label: string; icon: string; count?: string }[] = [
    { id: 'all', label: 'Todos os Produtos', icon: '✨' },
    { id: 'acai', label: 'Açaí Tradicional', icon: '🍨', count: '8 tamanhos' },
    { id: 'milkshake', label: 'Milk-Shakes Trufados', icon: '🥤', count: 'Cremosos' },
    { id: 'vitamina', label: 'Vitamina de Açaí', icon: '⚡', count: 'Com frutas' },
    { id: 'adicionais', label: 'Adicionais & Extras', icon: '🍓', count: '10 Grátis' },
  ];

  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2 px-1">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`cat-filter-${cat.id}`}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl font-bold text-sm sm:text-base flex items-center gap-2 transition-all active:scale-95 select-none ${
                isActive
                  ? 'bg-purple-900 text-white shadow-md shadow-purple-950/20'
                  : 'bg-white text-stone-700 hover:bg-purple-50 hover:text-purple-800 border border-stone-200'
              }`}
            >
              <span className="text-base sm:text-lg">{cat.icon}</span>
              <span>{cat.label}</span>
              {cat.count && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-purple-800 text-purple-200' : 'bg-stone-100 text-stone-500'
                  }`}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
