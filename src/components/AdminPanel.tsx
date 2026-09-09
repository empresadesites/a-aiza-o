import React, { useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Settings,
  DollarSign,
  Package,
  Plus,
  Trash2,
  Edit2,
  Save,
  Search,
  Check,
} from 'lucide-react';
import { Product, OrderDetails, OrderStatus, StoreSettings } from '../types';
import { formatCurrency, formatPhone } from '../utils/formatters';

interface AdminPanelProps {
  onBackToStore: () => void;
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  products: Product[];
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onToggleProductAvailable: (productId: string) => void;
  settings: StoreSettings;
  onUpdateSettings: (newSettings: StoreSettings) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  onBackToStore,
  orders,
  onUpdateOrderStatus,
  products,
  onUpdateProductPrice,
  onToggleProductAvailable,
  settings,
  onUpdateSettings,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'settings'>('orders');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchOrder, setSearchOrder] = useState<string>('');

  // Editable settings local state
  const [localSettings, setLocalSettings] = useState<StoreSettings>(settings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Status mappings
  const statusConfig: Record<
    OrderStatus,
    { label: string; icon: string; colorClass: string; borderClass: string }
  > = {
    recebido: {
      label: 'Pedido recebido',
      icon: '🟡',
      colorClass: 'bg-amber-100 text-amber-900',
      borderClass: 'border-amber-300',
    },
    preparacao: {
      label: 'Em preparação',
      icon: '🔵',
      colorClass: 'bg-blue-100 text-blue-900',
      borderClass: 'border-blue-300',
    },
    entrega: {
      label: 'Saiu para entrega',
      icon: '🟠',
      colorClass: 'bg-orange-100 text-orange-900',
      borderClass: 'border-orange-300',
    },
    entregue: {
      label: 'Entregue',
      icon: '🟢',
      colorClass: 'bg-emerald-100 text-emerald-900',
      borderClass: 'border-emerald-300',
    },
    cancelado: {
      label: 'Cancelado',
      icon: '🔴',
      colorClass: 'bg-red-100 text-red-900',
      borderClass: 'border-red-300',
    },
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch =
      order.customerName.toLowerCase().includes(searchOrder.toLowerCase()) ||
      order.id.toLowerCase().includes(searchOrder.toLowerCase()) ||
      order.customerPhone.includes(searchOrder);
    return matchesStatus && matchesSearch;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings(localSettings);
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 font-sans pb-16">
      {/* Top Admin Header */}
      <header className="bg-purple-950 text-white shadow-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToStore}
              className="p-2 rounded-xl bg-purple-900 hover:bg-purple-800 text-purple-200 transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar para a Loja</span>
            </button>
            <div className="h-6 w-px bg-purple-800" />
            <div className="flex items-center gap-2">
              <span className="text-xl">🍇</span>
              <span className="font-display font-black text-xl text-white">
                Açaizaço <span className="text-emerald-400 text-sm font-bold uppercase">Painel Lojista</span>
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-1 bg-purple-900/80 p-1 rounded-2xl">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'orders'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Pedidos ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'products'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Cardápio & Preços</span>
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'settings'
                  ? 'bg-purple-700 text-white shadow-sm'
                  : 'text-purple-200 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </div>
        </div>
      </header>

      {/* Admin Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Header & Filter Controls */}
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="font-display font-black text-2xl text-stone-900">
                  Gerenciamento de Pedidos
                </h2>
                <p className="text-xs sm:text-sm text-stone-500">
                  Acompanhe os pedidos gerados e atualize os status operacionais.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Buscar cliente, telefone ou ID..."
                    value={searchOrder}
                    onChange={(e) => setSearchOrder(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="py-2 px-3 text-xs sm:text-sm rounded-xl border border-stone-200 bg-stone-50 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <option value="all">Todos os Status</option>
                  <option value="recebido">🟡 Pedido recebido</option>
                  <option value="preparacao">🔵 Em preparação</option>
                  <option value="entrega">🟠 Saiu para entrega</option>
                  <option value="entregue">🟢 Entregue</option>
                  <option value="cancelado">🔴 Cancelado</option>
                </select>
              </div>
            </div>

            {/* Orders Cards Grid */}
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200">
                <div className="w-16 h-16 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center text-2xl mx-auto mb-3">
                  📦
                </div>
                <h3 className="font-display font-extrabold text-xl text-stone-900">
                  Nenhum pedido encontrado
                </h3>
                <p className="text-stone-500 text-sm max-w-sm mx-auto mt-1">
                  Os pedidos finalizados pelos clientes aparecerão aqui automaticamente com todos os dados preenchidos.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredOrders.map((ord) => {
                  const cfg = statusConfig[ord.status] || statusConfig.recebido;
                  return (
                    <div
                      key={ord.id}
                      className={`bg-white rounded-3xl p-6 border-2 shadow-sm flex flex-col justify-between ${cfg.borderClass}`}
                    >
                      <div>
                        {/* Order Card Header */}
                        <div className="flex items-start justify-between gap-2 pb-4 border-b border-stone-100">
                          <div>
                            <span className="text-xs font-black text-purple-700 bg-purple-50 px-2.5 py-1 rounded-full">
                              #{ord.id}
                            </span>
                            <h3 className="font-display font-black text-lg text-stone-900 mt-1">
                              {ord.customerName}
                            </h3>
                            <p className="text-xs text-stone-500">
                              {ord.customerPhone} • {new Date(ord.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>

                          {/* Status Badge & Selector */}
                          <div className="flex flex-col items-end gap-1.5">
                            <span
                              className={`text-xs font-black px-3 py-1 rounded-full ${cfg.colorClass}`}
                            >
                              {cfg.icon} {cfg.label}
                            </span>

                            <select
                              value={ord.status}
                              onChange={(e) =>
                                onUpdateOrderStatus(ord.id, e.target.value as OrderStatus)
                              }
                              className="text-xs py-1 px-2 rounded-lg border border-stone-200 bg-stone-50 font-bold focus:outline-none"
                            >
                              <option value="recebido">🟡 Recebido</option>
                              <option value="preparacao">🔵 Preparação</option>
                              <option value="entrega">🟠 Em entrega</option>
                              <option value="entregue">🟢 Entregue</option>
                              <option value="cancelado">🔴 Cancelado</option>
                            </select>
                          </div>
                        </div>

                        {/* Delivery Address */}
                        <div className="py-3 text-xs text-stone-600 bg-stone-50/70 p-3 rounded-2xl my-3">
                          <strong className="text-stone-900 block mb-0.5">Endereço de Entrega:</strong>
                          <span>
                            {ord.address.rua}, {ord.address.numero} - {ord.address.bairro}, {ord.address.cidade} (CEP: {ord.address.cep})
                          </span>
                          {ord.address.complemento && (
                            <span className="block text-stone-500">
                              Compl: {ord.address.complemento}
                            </span>
                          )}
                          {ord.address.referencia && (
                            <span className="block text-stone-500">
                              Ref: {ord.address.referencia}
                            </span>
                          )}
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2 text-xs">
                          <strong className="text-stone-900 block">Itens:</strong>
                          {ord.items.map((it, idx) => (
                            <div key={idx} className="bg-stone-50 p-2 rounded-xl border border-stone-100">
                              <div className="flex justify-between font-bold text-stone-800">
                                <span>
                                  {it.quantity}x {it.productName} {it.size}
                                </span>
                                <span>{formatCurrency(it.itemTotal)}</span>
                              </div>
                              {it.selectedFlavor && (
                                <p className="text-purple-700">Sabor: {it.selectedFlavor}</p>
                              )}
                              {it.selectedFruit && (
                                <p className="text-emerald-700">Fruta: {it.selectedFruit}</p>
                              )}
                              {it.freeAdditions.length > 0 && (
                                <p className="text-stone-500 truncate">
                                  Adicionais: {it.freeAdditions.join(', ')}
                                </p>
                              )}
                              {it.extraAdditions.length > 0 && (
                                <p className="text-pink-700">
                                  Extras: {it.extraAdditions.map((e) => e.name).join(', ')}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Footer with Totals and Payment */}
                      <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm">
                        <div>
                          <span className="text-stone-500 block text-xs">Forma de pagamento:</span>
                          <span className="font-extrabold uppercase text-purple-900">
                            {ord.paymentMethod}
                            {ord.paymentMethod === 'dinheiro' && ord.needChange
                              ? ` (Troco p/ ${ord.changeAmount})`
                              : ''}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-stone-500 block text-xs">Total:</span>
                          <span className="font-display font-black text-lg text-emerald-700">
                            {formatCurrency(ord.total)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCTS & PRICES */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
              <h2 className="font-display font-black text-2xl text-stone-900">
                Cardápio & Preços
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Altere os preços e a disponibilidade dos produtos em tempo real para a loja.
              </p>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-sm">
              <div className="divide-y divide-stone-100">
                {products.map((prod) => (
                  <div
                    key={prod.id}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-stone-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-14 h-14 rounded-2xl object-cover border border-stone-200 flex-shrink-0"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-display font-black text-base text-stone-900">
                            {prod.name} {prod.size}
                          </h4>
                          <span
                            className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                              prod.available
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-red-100 text-red-800'
                            }`}
                          >
                            {prod.available ? 'Ativo' : 'Pausado'}
                          </span>
                        </div>
                        <p className="text-xs text-stone-500 line-clamp-1 max-w-md">
                          {prod.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="flex items-center gap-1 bg-stone-100 px-3 py-1.5 rounded-xl border border-stone-200">
                        <span className="text-xs font-bold text-stone-500">R$</span>
                        <input
                          type="number"
                          step="0.50"
                          defaultValue={prod.price}
                          onBlur={(e) => {
                            const val = parseFloat(e.target.value);
                            if (!isNaN(val) && val > 0) {
                              onUpdateProductPrice(prod.id, val);
                            }
                          }}
                          className="w-20 text-sm font-black text-purple-950 bg-transparent focus:outline-none"
                        />
                      </div>

                      <button
                        onClick={() => onToggleProductAvailable(prod.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                          prod.available
                            ? 'bg-stone-200 hover:bg-red-100 hover:text-red-700 text-stone-700'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        }`}
                      >
                        {prod.available ? 'Desativar' : 'Ativar'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: STORE SETTINGS */}
        {activeTab === 'settings' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-white p-5 rounded-3xl border border-stone-200 shadow-sm">
              <h2 className="font-display font-black text-2xl text-stone-900">
                Configurações da Loja
              </h2>
              <p className="text-xs sm:text-sm text-stone-500">
                Atualize o número de WhatsApp, taxa de entrega e horários de atendimento.
              </p>
            </div>

            <form
              onSubmit={handleSaveSettings}
              className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-5"
            >
              {settingsSaved && (
                <div className="p-3.5 rounded-2xl bg-emerald-100 text-emerald-900 text-xs sm:text-sm font-bold flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-700" />
                  <span>Configurações salvas com sucesso!</span>
                </div>
              )}

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Número do WhatsApp para Pedidos (formato internacional com DDI e DDD)
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.whatsappNumber}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, whatsappNumber: e.target.value })
                  }
                  placeholder="553187294095"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Padrão atual: 553187294095 (+55 31 8729-4095)
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Telefone Exibido na Loja
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.displayPhone}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, displayPhone: e.target.value })
                  }
                  placeholder="(31) 8729-4095"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Taxa Padrão de Entrega (R$)
                </label>
                <input
                  type="number"
                  step="0.50"
                  required
                  value={localSettings.standardDeliveryFee}
                  onChange={(e) =>
                    setLocalSettings({
                      ...localSettings,
                      standardDeliveryFee: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Horário de Funcionamento
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.openingHours}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, openingHours: e.target.value })
                  }
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Instagram Oficial
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.instagramHandle}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, instagramHandle: e.target.value })
                  }
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Link da Localização no Google Maps
                </label>
                <input
                  type="url"
                  required
                  value={localSettings.mapsUrl || ''}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, mapsUrl: e.target.value })
                  }
                  placeholder="https://maps.app.goo.gl/rn4Aa9UeEvHgJeK9A"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 font-mono"
                />
                <p className="text-[11px] text-stone-400 mt-1">
                  Link direto para clientes abrirem a rota no Google Maps
                </p>
              </div>

              <div>
                <label className="text-xs font-bold text-stone-700 block mb-1">
                  Endereço Físico Exibido
                </label>
                <input
                  type="text"
                  required
                  value={localSettings.addressNote || ''}
                  onChange={(e) =>
                    setLocalSettings({ ...localSettings, addressNote: e.target.value })
                  }
                  placeholder="Rua Ouro, 15 - Iguaçu, Ipatinga - MG"
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-sm sm:text-base shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Save className="w-5 h-5" />
                <span>Salvar Configurações</span>
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};
