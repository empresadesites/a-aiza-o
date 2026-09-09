import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { CategoriesNav, CategoryFilter } from './components/CategoriesNav';
import { ProductCard } from './components/ProductCard';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FreeAdditionsShowcase } from './components/FreeAdditionsShowcase';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { AdminPanel } from './components/AdminPanel';

import { Product, CartItem, OrderDetails, OrderStatus, StoreSettings } from './types';
import { INITIAL_PRODUCTS, INITIAL_STORE_SETTINGS } from './data/products';
import { ShoppingBag, Sparkles, CheckCircle, ArrowRight } from 'lucide-react';

const INITIAL_SAMPLE_ORDERS: OrderDetails[] = [
  {
    id: 'PED-894210',
    orderNumber: 1042,
    createdAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    customerName: 'Mariana Ribeiro',
    customerPhone: '(31) 98845-1290',
    address: {
      cep: '35162-020',
      rua: 'Av. Castelo Branco',
      numero: '450',
      bairro: 'Horto',
      cidade: 'Ipatinga',
      complemento: 'Apto 302',
      referencia: 'Em frente à praça',
    },
    items: [
      {
        cartItemId: 'item-1',
        productId: 'acai-500',
        productName: 'Açaí Tradicional',
        category: 'acai',
        size: '500 ML',
        basePrice: 23.0,
        freeAdditions: ['Morango', 'Banana', 'Granola', 'Leite em pó', 'Leite condensado', 'Paçoca'],
        extraFreeCount: 0,
        extraAdditions: [{ id: 'nutella', name: 'NUTELLA ORIGINAL', price: 6.0 }],
        notes: 'Caprichar na granola por favor!',
        quantity: 1,
        itemTotal: 29.0,
      },
      {
        cartItemId: 'item-2',
        productId: 'milkshake-500',
        productName: 'Milk-Shake Especial',
        category: 'milkshake',
        size: '500 ML',
        basePrice: 25.0,
        selectedFlavor: 'NINHO TRUFADO',
        freeAdditions: [],
        extraFreeCount: 0,
        extraAdditions: [],
        quantity: 1,
        itemTotal: 25.0,
      },
    ],
    subtotal: 54.0,
    deliveryFee: 5.0,
    total: 59.0,
    paymentMethod: 'pix',
    needChange: false,
    notes: 'Campainha com defeito, favor chamar no interfone',
    status: 'preparacao',
  },
  {
    id: 'PED-894208',
    orderNumber: 1041,
    createdAt: new Date(Date.now() - 70 * 60 * 1000).toISOString(),
    customerName: 'Lucas Ferreira',
    customerPhone: '(31) 99123-8877',
    address: {
      cep: '35160-001',
      rua: 'Rua Mariana',
      numero: '120',
      bairro: 'Centro',
      cidade: 'Ipatinga',
      complemento: 'Casa',
      referencia: 'Próximo à padaria',
    },
    items: [
      {
        cartItemId: 'item-3',
        productId: 'acai-750',
        productName: 'Açaí Tradicional',
        category: 'acai',
        size: '750 ML',
        basePrice: 28.0,
        freeAdditions: ['Ovomaltine', 'Leite em pó', 'Disquete', 'Chocoball', 'Sorvete de ninho'],
        extraFreeCount: 0,
        extraAdditions: [{ id: 'bis', name: 'BIS (2 UND)', price: 1.5 }],
        quantity: 1,
        itemTotal: 29.5,
      },
    ],
    subtotal: 29.5,
    deliveryFee: 5.0,
    total: 34.5,
    paymentMethod: 'dinheiro',
    needChange: true,
    changeAmount: 'R$ 50,00',
    notes: '',
    status: 'entrega',
  },
];

export default function App() {
  // Products state (can be modified in admin panel)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('acaizaco_products');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_PRODUCTS;
      }
    }
    return INITIAL_PRODUCTS;
  });

  // Store settings
  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('acaizaco_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_STORE_SETTINGS,
          ...parsed,
          mapsUrl: parsed.mapsUrl || INITIAL_STORE_SETTINGS.mapsUrl,
          addressStreet: parsed.addressStreet || INITIAL_STORE_SETTINGS.addressStreet,
          addressNeighborhood: parsed.addressNeighborhood || INITIAL_STORE_SETTINGS.addressNeighborhood,
          addressCity: parsed.addressCity || INITIAL_STORE_SETTINGS.addressCity,
          addressCep: parsed.addressCep || INITIAL_STORE_SETTINGS.addressCep,
          addressNote:
            !parsed.addressNote || parsed.addressNote.includes('Consulte')
              ? INITIAL_STORE_SETTINGS.addressNote
              : parsed.addressNote,
        };
      } catch {
        return INITIAL_STORE_SETTINGS;
      }
    }
    return INITIAL_STORE_SETTINGS;
  });

  // Cart state persisted in localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('acaizaco_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  // Orders list for admin
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    const saved = localStorage.getItem('acaizaco_orders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_SAMPLE_ORDERS;
      }
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  // Modals and Drawers
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [currentView, setCurrentView] = useState<'store' | 'admin'>('store');

  // Toast banner notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync route / hash for /admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin' || window.location.pathname === '/admin') {
        setCurrentView('admin');
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem('acaizaco_cart', JSON.stringify(cart));
  }, [cart]);

  // Save settings to localStorage
  useEffect(() => {
    localStorage.setItem('acaizaco_settings', JSON.stringify(settings));
  }, [settings]);

  // Save products to localStorage
  useEffect(() => {
    localStorage.setItem('acaizaco_products', JSON.stringify(products));
  }, [products]);

  // Save orders to localStorage
  useEffect(() => {
    localStorage.setItem('acaizaco_orders', JSON.stringify(orders));
  }, [orders]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (item: CartItem) => {
    setCart((prev) => {
      // If exact same item exists (same product, additions, notes), increment qty
      const existingIdx = prev.findIndex(
        (i) =>
          i.productId === item.productId &&
          i.selectedFlavor === item.selectedFlavor &&
          i.selectedFruit === item.selectedFruit &&
          JSON.stringify(i.freeAdditions.sort()) === JSON.stringify(item.freeAdditions.sort()) &&
          JSON.stringify(i.extraAdditions) === JSON.stringify(item.extraAdditions) &&
          i.notes === item.notes
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const current = updated[existingIdx];
        const newQty = current.quantity + item.quantity;
        const unitPrice = current.itemTotal / current.quantity;
        updated[existingIdx] = {
          ...current,
          quantity: newQty,
          itemTotal: unitPrice * newQty,
        };
        return updated;
      }

      return [...prev, item];
    });

    showToast(`🍇 ${item.productName} adicionado ao seu pedido!`);
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((it) => {
        if (it.cartItemId === cartItemId) {
          const unitPrice = it.itemTotal / it.quantity;
          return {
            ...it,
            quantity: newQty,
            itemTotal: unitPrice * newQty,
          };
        }
        return it;
      })
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((it) => it.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOrderCompleted = (newOrder: OrderDetails) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    showToast('✅ Pedido preparado com sucesso! Enviando para o WhatsApp...');
  };

  // Quick action: "Monte seu Açaí" opens the 500ml Açaí (most popular) directly in customization modal!
  const handleOpenQuickAcai = () => {
    const popularAcai =
      products.find((p) => p.category === 'acai' && p.ml === 500) ||
      products.find((p) => p.category === 'acai') ||
      products[0];
    setSelectedProduct(popularAcai);
  };

  // Scroll navigation helper
  const handleNavigateToSection = (sectionId: string) => {
    if (currentView === 'admin') {
      setCurrentView('store');
    }
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // Filter products by category
  const filteredProducts = products.filter((p) => {
    if (!p.available && currentView === 'store') return false;
    if (activeCategory === 'all') return true;
    if (activeCategory === 'acai') return p.category === 'acai';
    if (activeCategory === 'milkshake') return p.category === 'milkshake';
    if (activeCategory === 'vitamina') return p.category === 'vitamina';
    return true;
  });

  const cartItemCount = cart.reduce((sum, it) => sum + it.quantity, 0);

  // If viewing admin
  if (currentView === 'admin') {
    return (
      <AdminPanel
        onBackToStore={() => {
          window.location.hash = '';
          setCurrentView('store');
        }}
        orders={orders}
        onUpdateOrderStatus={(orderId, newStatus) => {
          setOrders((prev) =>
            prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
          );
        }}
        products={products}
        onUpdateProductPrice={(productId, newPrice) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, price: newPrice } : p))
          );
        }}
        onToggleProductAvailable={(productId) => {
          setProducts((prev) =>
            prev.map((p) => (p.id === productId ? { ...p, available: !p.available } : p))
          );
        }}
        settings={settings}
        onUpdateSettings={(newSettings) => setSettings(newSettings)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col justify-between font-sans text-stone-900 selection:bg-purple-700 selection:text-white relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2.5 text-sm font-bold animate-in slide-in-from-top-4 duration-300 border border-purple-500/40">
          <CheckCircle className="w-5 h-5 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main App Navigation */}
      <Header
        cartItemCount={cartItemCount}
        onOpenCart={() => setIsCartOpen(true)}
        settings={settings}
        onNavigateToSection={handleNavigateToSection}
        onOpenQuickAcai={handleOpenQuickAcai}
      />

      {/* Hero Section */}
      <Hero
        onOrderNow={handleOpenQuickAcai}
        onViewMenu={() => handleNavigateToSection('cardapio')}
      />

      {/* Benefits (4 cards) */}
      <Benefits />

      {/* Main Digital Catalog */}
      <main id="cardapio" className="py-16 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Catalog Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-900 text-xs font-black uppercase tracking-wider mb-3">
            <span>🍇 Cardápio Completo</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-purple-950 tracking-tight">
            Escolha seu Favorito & Monte do Seu Jeito!
          </h2>

          <p className="mt-4 text-stone-600 text-base sm:text-lg">
            Clique em qualquer tamanho ou opção abaixo para personalizar com até{' '}
            <strong className="text-purple-900 font-bold">10 adicionais grátis</strong>, escolher coberturas e extras apetitosos.
          </p>
        </div>

        {/* Categories Navigation Filter */}
        <div className="mb-8 flex justify-center">
          <CategoriesNav
            activeCategory={activeCategory}
            onSelectCategory={(cat) => {
              setActiveCategory(cat);
              if (cat === 'adicionais') {
                handleNavigateToSection('adicionais');
              }
            }}
          />
        </div>

        {/* Section: Açaí Tradicional */}
        {(activeCategory === 'all' || activeCategory === 'acai') && (
          <section id="monte-seu-acai" className="mb-16">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-purple-100">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-900 flex items-center gap-2">
                  <span>🍨 Açaí Tradicional</span>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-full uppercase">
                    10 Adicionais Grátis
                  </span>
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                  Do copinho de 200ml ao balde de 2 Litros para dividir com os amigos.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products
                .filter((p) => p.category === 'acai' && p.available)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Section: Milk-Shakes */}
        {(activeCategory === 'all' || activeCategory === 'milkshake') && (
          <section id="milkshakes" className="mb-16 pt-4">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-purple-100">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-900 flex items-center gap-2">
                  <span>🥤 Milk-Shakes Trufados</span>
                  <span className="text-xs bg-purple-100 text-purple-800 font-extrabold px-2.5 py-1 rounded-full uppercase">
                    Borda Trufada
                  </span>
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                  Feitos com sorvete nobre e generosa borda recheada de Ninho ou Ovomaltine.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {products
                .filter((p) => p.category === 'milkshake' && p.available)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
            </div>
          </section>
        )}

        {/* Section: Vitamina de Açaí */}
        {(activeCategory === 'all' || activeCategory === 'vitamina') && (
          <section id="vitaminas" className="mb-16 pt-4">
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-purple-100">
              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-stone-900 flex items-center gap-2">
                  <span>⚡ Vitaminas de Açaí</span>
                  <span className="text-xs bg-amber-100 text-amber-900 font-extrabold px-2.5 py-1 rounded-full uppercase">
                    Super Energia
                  </span>
                </h3>
                <p className="text-stone-500 text-xs sm:text-sm mt-0.5">
                  Açaí batido na hora com leite em pó, leite condensado e + 1 fruta selecionável.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {products
                .filter((p) => p.category === 'vitamina' && p.available)
                .map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                  />
                ))}
            </div>
          </section>
        )}
      </main>

      {/* Free Additions & Extras Showcase Section */}
      <FreeAdditionsShowcase onOpenQuickAcai={handleOpenQuickAcai} />

      {/* Interactive FAQ Section */}
      <FAQSection />

      {/* Contact & Location Section */}
      <ContactSection settings={settings} />

      {/* Footer */}
      <Footer
        settings={settings}
        onOpenAdmin={() => {
          window.location.hash = '#admin';
          setCurrentView('admin');
        }}
      />

      {/* Product Customization Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          allProducts={products}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        deliveryFee={settings.standardDeliveryFee}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        onContinueShopping={() => handleNavigateToSection('cardapio')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        deliveryFee={settings.standardDeliveryFee}
        whatsappNumber={settings.whatsappNumber}
        onOrderCompleted={handleOrderCompleted}
      />

      {/* Floating WhatsApp Quick Contact Button */}
      <WhatsAppFloatingButton whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}
