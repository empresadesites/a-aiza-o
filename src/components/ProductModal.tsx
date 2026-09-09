import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Minus, Check, AlertCircle, Sparkles, Heart } from 'lucide-react';
import { Product, CartItem, ExtraAddition } from '../types';
import {
  FREE_ADDITIONS,
  EXTRA_ADDITIONS,
  MILKSHAKE_FLAVORS,
  VITAMINA_FRUITS,
} from '../data/products';
import { formatCurrency } from '../utils/formatters';

interface ProductModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (item: CartItem) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
}) => {
  if (!product) return null;

  // Selected size product (starts with current, but allows changing size directly inside the modal)
  const [selectedProduct, setSelectedProduct] = useState<Product>(product);

  // For Milk-shakes
  const [selectedFlavor, setSelectedFlavor] = useState<string>(
    product.category === 'milkshake' ? MILKSHAKE_FLAVORS[0].name : ''
  );

  // For Vitaminas
  const [selectedFruit, setSelectedFruit] = useState<string>(
    product.category === 'vitamina' ? VITAMINA_FRUITS[0].name : ''
  );

  // Free additions
  const [selectedFree, setSelectedFree] = useState<string[]>([]);

  // Extra additions
  const [selectedExtras, setSelectedExtras] = useState<ExtraAddition[]>([]);

  // Notes
  const [notes, setNotes] = useState<string>('');

  // Quantity
  const [quantity, setQuantity] = useState<number>(1);

  // Available sizes in same category
  const availableSizes = useMemo(() => {
    return allProducts
      .filter((p) => p.category === product.category && p.available)
      .sort((a, b) => a.ml - b.ml);
  }, [allProducts, product.category]);

  // Sync when prop product changes
  useEffect(() => {
    setSelectedProduct(product);
    setSelectedFree([]);
    setSelectedExtras([]);
    setNotes('');
    setQuantity(1);

    if (product.category === 'milkshake') {
      setSelectedFlavor(MILKSHAKE_FLAVORS[0].name);
    }
    if (product.category === 'vitamina') {
      setSelectedFruit(VITAMINA_FRUITS[0].name);
    }
  }, [product]);

  // Handle free addition toggle
  const toggleFreeAddition = (name: string) => {
    if (selectedFree.includes(name)) {
      setSelectedFree(selectedFree.filter((item) => item !== name));
    } else {
      setSelectedFree([...selectedFree, name]);
    }
  };

  // Free additions calculation: up to 10 are free, each above 10 is R$ 2.00
  const freeLimit = 10;
  const extraFreeCount = Math.max(0, selectedFree.length - freeLimit);
  const extraFreePrice = extraFreeCount * 2.0;

  // Handle extra addition toggle
  const toggleExtraAddition = (extra: ExtraAddition) => {
    if (selectedExtras.some((item) => item.id === extra.id)) {
      setSelectedExtras(selectedExtras.filter((item) => item.id !== extra.id));
    } else {
      setSelectedExtras([...selectedExtras, extra]);
    }
  };

  // Price calculations
  const extrasTotal = selectedExtras.reduce((sum, item) => sum + item.price, 0);
  const singleItemPrice = selectedProduct.price + extraFreePrice + extrasTotal;
  const totalItemPrice = singleItemPrice * quantity;

  // Handle submit to cart
  const handleAddToCart = () => {
    const cartItem: CartItem = {
      cartItemId: `${selectedProduct.id}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      productId: selectedProduct.id,
      productName: selectedProduct.name,
      category: selectedProduct.category,
      size: selectedProduct.size,
      basePrice: selectedProduct.price,
      selectedFlavor: selectedProduct.category === 'milkshake' ? selectedFlavor : undefined,
      selectedFruit: selectedProduct.category === 'vitamina' ? selectedFruit : undefined,
      freeAdditions: selectedFree,
      extraFreeCount: extraFreeCount,
      extraAdditions: selectedExtras.map((e) => ({
        id: e.id,
        name: e.name,
        price: e.price,
      })),
      notes: notes.trim(),
      quantity: quantity,
      itemTotal: totalItemPrice,
    };

    onAddToCart(cartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-purple-950 flex-shrink-0">
          <img
            src={selectedProduct.image}
            alt={selectedProduct.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/90 via-purple-950/30 to-transparent" />

          {/* Close button */}
          <button
            id="btn-close-product-modal"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-all"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Product Header Title & Base Price */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="bg-emerald-500 text-white text-[11px] font-black uppercase px-2.5 py-0.5 rounded-full">
                {selectedProduct.category === 'acai'
                  ? 'Açaí'
                  : selectedProduct.category === 'milkshake'
                  ? 'Milk-Shake'
                  : 'Vitamina'}
              </span>
              <span className="bg-purple-800/80 text-purple-200 text-xs font-bold px-2 py-0.5 rounded-full">
                {selectedProduct.size}
              </span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-white">
              {selectedProduct.name}
            </h2>
            <p className="text-purple-200 text-xs sm:text-sm mt-0.5 max-w-lg line-clamp-1">
              {selectedProduct.description}
            </p>
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Size Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="font-display font-extrabold text-base text-stone-900">
                1. Escolha o Tamanho
              </label>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                Obrigatório
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {availableSizes.map((sz) => {
                const isSelected = sz.id === selectedProduct.id;
                return (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setSelectedProduct(sz)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-purple-600 bg-purple-50/80 text-purple-950 font-bold shadow-sm ring-2 ring-purple-600/30'
                        : 'border-stone-200 hover:border-purple-300 text-stone-700'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-extrabold">{sz.size}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-purple-600" />}
                    </div>
                    <div className="text-sm font-black text-purple-900 mt-1">
                      {formatCurrency(sz.price)}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category-Specific Choice: Milk-Shake Flavors */}
          {selectedProduct.category === 'milkshake' && (
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2.5">
                <label className="font-display font-extrabold text-base text-stone-900">
                  2. Escolha o Sabor do Milk-Shake
                </label>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  1 Opção
                </span>
              </div>
              <div className="space-y-2">
                {MILKSHAKE_FLAVORS.map((flavor) => {
                  const isSelected = selectedFlavor === flavor.name;
                  return (
                    <div
                      key={flavor.id}
                      onClick={() => setSelectedFlavor(flavor.name)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/90 ring-2 ring-purple-600/20 shadow-sm'
                          : 'border-stone-200 hover:border-purple-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                              isSelected
                                ? 'border-purple-600 bg-purple-600 text-white'
                                : 'border-stone-300'
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                          <span className="font-display font-black text-stone-900 text-sm sm:text-base">
                            {flavor.name}
                          </span>
                        </div>
                        <span className="text-[11px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full">
                          {flavor.badge}
                        </span>
                      </div>
                      <p className="mt-1 ml-7 text-xs text-stone-600 leading-relaxed">
                        {flavor.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Category-Specific Choice: Vitamina Fruit */}
          {selectedProduct.category === 'vitamina' && (
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <label className="font-display font-extrabold text-base text-stone-900 block">
                    2. Escolha 1 Fruta Inclusa
                  </label>
                  <p className="text-xs text-stone-500">
                    Acompanha leite em pó e leite condensado inclusos!
                  </p>
                </div>
                <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full">
                  Incluso
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {VITAMINA_FRUITS.map((fruit) => {
                  const isSelected = selectedFruit === fruit.name;
                  return (
                    <button
                      key={fruit.id}
                      type="button"
                      onClick={() => setSelectedFruit(fruit.name)}
                      className={`p-3 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-sm ring-2 ring-emerald-600/30'
                          : 'border-stone-200 hover:border-emerald-300 text-stone-700'
                      }`}
                    >
                      <span className="text-sm font-bold">{fruit.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Free Additions (Exclusive to Açaí) */}
          {selectedProduct.category === 'acai' && (
            <div className="pt-2 border-t border-stone-100">
              <div className="flex items-center justify-between mb-1.5">
                <div>
                  <label className="font-display font-extrabold text-base text-stone-900 flex items-center gap-1.5">
                    <span>2. Adicionais Gratuitos</span>
                    <Sparkles className="w-4 h-4 text-purple-600" />
                  </label>
                  <p className="text-xs text-stone-500 font-medium">
                    Escolha até <strong>10 adicionais grátis</strong> para o seu açaí.
                  </p>
                </div>
                <div
                  className={`text-xs font-black px-3 py-1 rounded-full ${
                    selectedFree.length <= 10
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {selectedFree.length} / 10 Grátis
                </div>
              </div>

              {/* Warning when exceeding 10 free additions */}
              {selectedFree.length > 10 && (
                <div className="my-3 p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5 animate-in fade-in duration-200">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold">
                      Você já selecionou os 10 adicionais grátis. Os próximos serão cobrados como adicionais extras (+ R$ 2,00 cada).
                    </p>
                    <p className="text-[11px] text-amber-700 mt-0.5">
                      {extraFreeCount} adicional(is) excedente(s) = +{formatCurrency(extraFreePrice)}
                    </p>
                  </div>
                </div>
              )}

              {/* Free Addition Chips Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                {FREE_ADDITIONS.map((add) => {
                  const isSelected = selectedFree.includes(add.name);
                  return (
                    <button
                      key={add.id}
                      type="button"
                      onClick={() => toggleFreeAddition(add.name)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-semibold flex items-center justify-between transition-all select-none ${
                        isSelected
                          ? 'border-purple-600 bg-purple-600 text-white shadow-sm font-bold'
                          : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                      }`}
                    >
                      <span className="truncate pr-1">{add.name}</span>
                      {isSelected ? (
                        <Check className="w-3.5 h-3.5 flex-shrink-0 text-white" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 flex-shrink-0 text-stone-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Additions (All categories can add extra treats) */}
          <div className="pt-2 border-t border-stone-100">
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="font-display font-extrabold text-base text-stone-900 flex items-center gap-1.5">
                  <span>
                    {selectedProduct.category === 'acai' ? '3.' : '3.'} Adicionais Extras
                  </span>
                  <span className="text-xs bg-pink-100 text-pink-800 font-bold px-2 py-0.5 rounded-full">
                    Opcionais
                  </span>
                </label>
                <p className="text-xs text-stone-500">
                  Sobremesas e cremes especiais para turbinar o seu pedido.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {EXTRA_ADDITIONS.map((extra) => {
                const isSelected = selectedExtras.some((item) => item.id === extra.id);
                return (
                  <div
                    key={extra.id}
                    onClick={() => toggleExtraAddition(extra)}
                    className={`p-3 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-pink-600 bg-pink-50/80 ring-1 ring-pink-600 shadow-sm'
                        : 'border-stone-200 hover:border-pink-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-5 h-5 rounded-lg border flex items-center justify-center ${
                          isSelected
                            ? 'border-pink-600 bg-pink-600 text-white'
                            : 'border-stone-300 bg-stone-50'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5" />}
                      </div>
                      <div>
                        <p className="text-xs sm:text-sm font-bold text-stone-900 leading-tight">
                          {extra.name}
                        </p>
                        {extra.description && (
                          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
                            {extra.description}
                          </p>
                        )}
                      </div>
                    </div>
                    <span className="text-xs sm:text-sm font-black text-pink-700 whitespace-nowrap ml-2">
                      +{formatCurrency(extra.price)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Observations */}
          <div className="pt-2 border-t border-stone-100">
            <label className="font-display font-extrabold text-sm text-stone-900 block mb-1">
              Observações do Item
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ex: pouco leite condensado, caprichar no morango, mandar colher..."
              rows={2}
              className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none placeholder:text-stone-400"
            />
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-100 bg-stone-50 flex items-center justify-between gap-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-2xl p-1 shadow-sm">
            <button
              type="button"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 disabled:opacity-40 disabled:hover:bg-transparent active:scale-95 transition-all"
              aria-label="Diminuir quantidade"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-extrabold text-base text-stone-900">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-stone-700 hover:bg-stone-100 active:scale-95 transition-all"
              aria-label="Aumentar quantidade"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart Button with dynamic total */}
          <button
            id="btn-confirm-add-to-cart"
            onClick={handleAddToCart}
            className="flex-1 py-3.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-700/20 active:scale-95 transition-all flex items-center justify-between"
          >
            <span>ADICIONAR AO PEDIDO</span>
            <span className="bg-emerald-700/60 px-2.5 py-1 rounded-xl text-white font-black text-sm">
              {formatCurrency(totalItemPrice)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
