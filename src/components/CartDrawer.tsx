import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { formatCurrency } from '../utils/formatters';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryFee: number;
  onUpdateQuantity: (cartItemId: string, newQty: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  onContinueShopping: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  deliveryFee,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  onContinueShopping,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const total = subtotal > 0 ? subtotal + deliveryFee : 0;
  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full sm:max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-black text-lg sm:text-xl text-stone-900">
                Seu Pedido
              </h2>
              <p className="text-xs text-stone-500 font-medium">
                {totalItemsCount} {totalItemsCount === 1 ? 'item no carrinho' : 'itens no carrinho'}
              </p>
            </div>
          </div>

          <button
            id="btn-close-cart-drawer"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
            aria-label="Fechar carrinho"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 divide-y divide-stone-100">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
              <div className="w-20 h-20 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-3xl mb-4">
                🍇
              </div>
              <h3 className="font-display font-extrabold text-xl text-stone-900 mb-2">
                Seu carrinho está vazio
              </h3>
              <p className="text-stone-500 text-sm max-w-xs mb-6 leading-relaxed">
                Que tal saborear um açaí cremoso com 10 adicionais grátis agora mesmo?
              </p>
              <button
                id="btn-empty-cart-ver-cardapio"
                onClick={() => {
                  onClose();
                  onContinueShopping();
                }}
                className="px-6 py-3 rounded-xl bg-purple-800 hover:bg-purple-900 text-white font-bold text-sm shadow-md transition-all active:scale-95"
              >
                Escolher Produtos 📋
              </button>
            </div>
          ) : (
            <div className="space-y-4 pt-1">
              {items.map((item) => (
                <div
                  key={item.cartItemId}
                  id={`cart-item-${item.cartItemId}`}
                  className="bg-stone-50/80 rounded-2xl p-3.5 border border-stone-100 relative group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-black uppercase text-purple-700 bg-purple-100/70 px-2 py-0.5 rounded-md">
                        {item.category === 'acai'
                          ? 'Açaí'
                          : item.category === 'milkshake'
                          ? 'Milk-Shake'
                          : 'Vitamina'}
                      </span>
                      <h4 className="font-display font-black text-base text-stone-900 mt-1">
                        {item.productName} <span className="text-purple-900 font-extrabold">{item.size}</span>
                      </h4>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.cartItemId)}
                      className="text-stone-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remover item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Flavors / Fruit */}
                  {item.selectedFlavor && (
                    <div className="mt-1.5 text-xs text-stone-700 font-semibold flex items-center gap-1">
                      <span className="text-purple-600 font-bold">Sabor:</span> {item.selectedFlavor}
                    </div>
                  )}

                  {item.selectedFruit && (
                    <div className="mt-1 text-xs text-stone-700 font-semibold flex items-center gap-1">
                      <span className="text-emerald-600 font-bold">Fruta inclusa:</span> {item.selectedFruit}
                    </div>
                  )}

                  {/* Free Additions List */}
                  {item.freeAdditions && item.freeAdditions.length > 0 && (
                    <div className="mt-2 text-xs text-stone-600 bg-white p-2 rounded-xl border border-stone-100">
                      <span className="font-bold text-stone-800 block text-[11px] uppercase tracking-wider mb-1">
                        Adicionais ({item.freeAdditions.length}):
                      </span>
                      <p className="line-clamp-2 leading-relaxed text-stone-600">
                        {item.freeAdditions.join(', ')}
                      </p>
                    </div>
                  )}

                  {/* Extras */}
                  {item.extraAdditions && item.extraAdditions.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {item.extraAdditions.map((ex) => (
                        <span
                          key={ex.id}
                          className="text-[11px] font-bold bg-pink-50 text-pink-700 border border-pink-100 px-2 py-0.5 rounded-md"
                        >
                          + {ex.name} ({formatCurrency(ex.price)})
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Notes */}
                  {item.notes && (
                    <p className="mt-1.5 text-[11px] text-stone-500 italic bg-amber-50/70 p-1.5 rounded-lg border border-amber-100">
                      Obs: {item.notes}
                    </p>
                  )}

                  {/* Quantity and Price Footer */}
                  <div className="mt-3 pt-2.5 border-t border-stone-200/70 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-xl p-0.5 shadow-2xs">
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 active:scale-90 transition-all"
                        aria-label="Diminuir"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-xs font-black text-stone-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-stone-600 hover:bg-stone-100 active:scale-90 transition-all"
                        aria-label="Aumentar"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-right">
                      <span className="font-display font-black text-base text-purple-950">
                        {formatCurrency(item.itemTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 text-right">
                <button
                  onClick={onClearCart}
                  className="text-xs text-stone-400 hover:text-red-500 font-semibold underline underline-offset-2"
                >
                  Limpar todo o carrinho
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Totals and Checkout CTA */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 space-y-3">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span className="flex items-center gap-1">
                  <span>Taxa de Entrega</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                    Fixa
                  </span>
                </span>
                <span className="font-bold text-stone-900">{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-base sm:text-lg font-black text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="text-purple-950 font-display text-xl font-black">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            <button
              id="btn-proceed-to-checkout"
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-base shadow-xl shadow-emerald-700/20 active:scale-95 transition-all flex items-center justify-between group"
            >
              <span>FINALIZE SEU PEDIDO</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
