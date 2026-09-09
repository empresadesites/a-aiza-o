import React from 'react';
import { Plus, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatCurrency } from '../utils/formatters';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelect(product)}
      className="group bg-white rounded-3xl overflow-hidden border border-stone-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-purple-950">
        <img
          src={product.image}
          alt={`${product.name} ${product.size}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Size Badge */}
        <div className="absolute top-3 left-3 bg-purple-900/90 backdrop-blur-md text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-md border border-purple-700/50">
          {product.size}
        </div>

        {/* Promotional / Special Badge */}
        {product.badge && (
          <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-600 to-purple-600 text-white font-black text-[11px] px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="text-[11px] font-bold text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-md">
            {product.category === 'acai'
              ? '🍇 Açaí Tradicional'
              : product.category === 'milkshake'
              ? '🥤 Milk-Shake Trufado'
              : '⚡ Vitamina Energética'}
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-display font-extrabold text-lg text-stone-900 group-hover:text-purple-800 transition-colors">
              {product.name} <span className="text-purple-700 font-black">{product.size}</span>
            </h3>
          </div>

          <p className="mt-2 text-stone-600 text-sm line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block">
              A partir de
            </span>
            <span className="text-xl font-black text-purple-950 font-display">
              {formatCurrency(product.price)}
            </span>
          </div>

          <button
            id={`btn-add-product-${product.id}`}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold text-sm px-3.5 py-2 rounded-xl shadow-md shadow-emerald-700/20 active:scale-95 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Adicionar ao pedido</span>
          </button>
        </div>
      </div>
    </div>
  );
};
