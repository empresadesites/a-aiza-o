import React, { useState } from 'react';
import {
  X,
  ArrowLeft,
  CheckCircle2,
  Phone,
  User,
  MapPin,
  CreditCard,
  Banknote,
  QrCode,
  DollarSign,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, OrderAddress, OrderDetails, PaymentMethod } from '../types';
import {
  formatCurrency,
  formatPhone,
  formatCep,
  fetchAddressByCep,
  createWhatsAppOrderUrl,
} from '../utils/formatters';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  deliveryFee: number;
  whatsappNumber: string;
  onOrderCompleted: (order: OrderDetails) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  deliveryFee,
  whatsappNumber,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  // Step 1: Form, Step 2: Review ("CONFIRA SEU PEDIDO")
  const [step, setStep] = useState<'form' | 'review'>('form');

  // Customer Data
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  // Address Data
  const [address, setAddress] = useState<OrderAddress>({
    cep: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: 'Ipatinga', // Default local city from context
    complemento: '',
    referencia: '',
  });

  // CEP loading state
  const [isLoadingCep, setIsLoadingCep] = useState(false);

  // Payment Data
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('pix');
  const [needChange, setNeedChange] = useState<boolean>(false);
  const [changeAmount, setChangeAmount] = useState<string>('');

  // General Notes
  const [notes, setNotes] = useState('');

  // Error message
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Totals
  const subtotal = items.reduce((sum, item) => sum + item.itemTotal, 0);
  const total = subtotal + deliveryFee;

  // Auto-fill address by CEP
  const handleCepChange = async (val: string) => {
    const formatted = formatCep(val);
    setAddress((prev) => ({ ...prev, cep: formatted }));

    const raw = val.replace(/\D/g, '');
    if (raw.length === 8) {
      setIsLoadingCep(true);
      try {
        const res = await fetchAddressByCep(raw);
        if (res) {
          setAddress((prev) => ({
            ...prev,
            rua: res.rua || prev.rua,
            bairro: res.bairro || prev.bairro,
            cidade: res.cidade || prev.cidade,
          }));
        }
      } finally {
        setIsLoadingCep(false);
      }
    }
  };

  // Validate form before advancing to review
  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!name.trim()) {
      setErrorMessage('Por favor, informe seu nome completo.');
      return;
    }
    if (!phone.trim() || phone.replace(/\D/g, '').length < 10) {
      setErrorMessage('Por favor, informe um telefone válido com DDD para contato.');
      return;
    }
    if (!address.cep.trim()) {
      setErrorMessage('Por favor, informe seu CEP.');
      return;
    }
    if (!address.rua.trim()) {
      setErrorMessage('Por favor, informe sua rua ou avenida.');
      return;
    }
    if (!address.numero.trim()) {
      setErrorMessage('Por favor, informe o número da sua residência.');
      return;
    }
    if (!address.bairro.trim()) {
      setErrorMessage('Por favor, informe seu bairro.');
      return;
    }
    if (!address.cidade.trim()) {
      setErrorMessage('Por favor, informe sua cidade.');
      return;
    }
    if (paymentMethod === 'dinheiro' && needChange && !changeAmount.trim()) {
      setErrorMessage('Por favor, informe o valor para o qual você precisa de troco (ex: R$ 50,00).');
      return;
    }

    setStep('review');
  };

  // Build the complete OrderDetails object
  const currentOrder: OrderDetails = {
    id: `PED-${Date.now().toString().slice(-6)}`,
    orderNumber: Math.floor(1000 + Math.random() * 9000),
    createdAt: new Date().toISOString(),
    customerName: name.trim(),
    customerPhone: phone.trim(),
    address: {
      cep: address.cep.trim(),
      rua: address.rua.trim(),
      numero: address.numero.trim(),
      bairro: address.bairro.trim(),
      cidade: address.cidade.trim(),
      complemento: address.complemento.trim(),
      referencia: address.referencia.trim(),
    },
    items,
    subtotal,
    deliveryFee,
    total,
    paymentMethod,
    needChange,
    changeAmount: needChange ? changeAmount.trim() : undefined,
    notes: notes.trim(),
    status: 'recebido',
  };

  // Final confirmation: blast confetti, save order, open WhatsApp!
  const handleFinalConfirmOrder = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#7e22ce', '#10b981', '#ec4899', '#fbbf24'],
      });
    } catch {
      // safe fallback
    }

    // Pass to parent to store order in local history
    onOrderCompleted(currentOrder);

    // Open WhatsApp
    const whatsappUrl = createWhatsAppOrderUrl(currentOrder, whatsappNumber);
    window.open(whatsappUrl, '_blank');

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      <div
        className="relative bg-white w-full max-w-2xl max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-stone-100 bg-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {step === 'review' && (
              <button
                onClick={() => setStep('form')}
                className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all mr-1"
                title="Voltar e editar"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <span className="text-[11px] font-black uppercase text-purple-700 tracking-wider">
                {step === 'form' ? 'Etapa 1 de 2' : 'Etapa 2 de 2'}
              </span>
              <h2 className="font-display font-black text-xl sm:text-2xl text-stone-900">
                {step === 'form' ? 'Finalize seu Pedido' : 'Confira seu Pedido'}
              </h2>
            </div>
          </div>

          <button
            id="btn-close-checkout-modal"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition-all"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs sm:text-sm flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="font-semibold">{errorMessage}</p>
            </div>
          )}

          {step === 'form' ? (
            /* STEP 1: FORM */
            <form id="checkout-form" onSubmit={handleProceedToReview} className="space-y-6">
              {/* Customer Information */}
              <div>
                <h3 className="font-display font-extrabold text-base text-stone-900 flex items-center gap-2 mb-3">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>Seus Dados de Contato</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Nome completo *
                    </label>
                    <input
                      id="input-customer-name"
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-stone-700 block mb-1">
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="input-customer-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      placeholder="(31) 99999-9999"
                      maxLength={15}
                      className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="pt-2 border-t border-stone-100">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-display font-extrabold text-base text-stone-900 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600" />
                    <span>Endereço de Entrega</span>
                  </h3>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Taxa fixa: {formatCurrency(deliveryFee)}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-1">
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        CEP *
                      </label>
                      <div className="relative">
                        <input
                          id="input-address-cep"
                          type="text"
                          required
                          value={address.cep}
                          onChange={(e) => handleCepChange(e.target.value)}
                          placeholder="35160-000"
                          maxLength={9}
                          className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                        />
                        {isLoadingCep && (
                          <div className="absolute right-3 top-3.5">
                            <Loader2 className="w-4 h-4 text-purple-600 animate-spin" />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Rua / Avenida *
                      </label>
                      <input
                        id="input-address-rua"
                        type="text"
                        required
                        value={address.rua}
                        onChange={(e) => setAddress({ ...address, rua: e.target.value })}
                        placeholder="Ex: Rua das Flores"
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Número *
                      </label>
                      <input
                        id="input-address-numero"
                        type="text"
                        required
                        value={address.numero}
                        onChange={(e) => setAddress({ ...address, numero: e.target.value })}
                        placeholder="123"
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Bairro *
                      </label>
                      <input
                        id="input-address-bairro"
                        type="text"
                        required
                        value={address.bairro}
                        onChange={(e) => setAddress({ ...address, bairro: e.target.value })}
                        placeholder="Centro"
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>

                    <div className="col-span-2">
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Cidade *
                      </label>
                      <input
                        id="input-address-cidade"
                        type="text"
                        required
                        value={address.cidade}
                        onChange={(e) => setAddress({ ...address, cidade: e.target.value })}
                        placeholder="Ipatinga"
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Complemento (opcional)
                      </label>
                      <input
                        id="input-address-complemento"
                        type="text"
                        value={address.complemento}
                        onChange={(e) => setAddress({ ...address, complemento: e.target.value })}
                        placeholder="Ex: Apto 102, Bloco B, Casa"
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-stone-700 block mb-1">
                        Ponto de referência (opcional)
                      </label>
                      <input
                        id="input-address-referencia"
                        type="text"
                        value={address.referencia}
                        onChange={(e) => setAddress({ ...address, referencia: e.target.value })}
                        placeholder="Ex: Próximo à padaria"
                        className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="pt-2 border-t border-stone-100">
                <h3 className="font-display font-extrabold text-base text-stone-900 flex items-center gap-2 mb-3">
                  <CreditCard className="w-4 h-4 text-purple-600" />
                  <span>Forma de Pagamento *</span>
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('pix')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'pix'
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-600/30'
                        : 'border-stone-200 hover:border-purple-200 text-stone-700'
                    }`}
                  >
                    <QrCode className="w-5 h-5 text-emerald-600" />
                    <span className="text-xs sm:text-sm">Pix</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('dinheiro')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'dinheiro'
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-600/30'
                        : 'border-stone-200 hover:border-purple-200 text-stone-700'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-emerald-700" />
                    <span className="text-xs sm:text-sm">Dinheiro</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('credito')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'credito'
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-600/30'
                        : 'border-stone-200 hover:border-purple-200 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-purple-600" />
                    <span className="text-xs sm:text-sm">Cartão Crédito</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('debito')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'debito'
                        ? 'border-purple-600 bg-purple-50 text-purple-950 font-bold ring-2 ring-purple-600/30'
                        : 'border-stone-200 hover:border-purple-200 text-stone-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-xs sm:text-sm">Cartão Débito</span>
                  </button>
                </div>

                {/* Change handling if Cash */}
                {paymentMethod === 'dinheiro' && (
                  <div className="mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200 animate-in fade-in">
                    <p className="text-xs font-bold text-amber-900 mb-2">
                      Precisa de troco?
                    </p>
                    <div className="flex items-center gap-4">
                      <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                        <input
                          type="radio"
                          name="troco"
                          checked={!needChange}
                          onChange={() => setNeedChange(false)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span>Não preciso de troco</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-semibold text-stone-800 cursor-pointer">
                        <input
                          type="radio"
                          name="troco"
                          checked={needChange}
                          onChange={() => setNeedChange(true)}
                          className="text-purple-600 focus:ring-purple-500"
                        />
                        <span>Sim, preciso de troco</span>
                      </label>
                    </div>

                    {needChange && (
                      <div className="mt-3">
                        <label className="text-xs font-bold text-stone-700 block mb-1">
                          Troco para quanto?
                        </label>
                        <input
                          type="text"
                          value={changeAmount}
                          onChange={(e) => setChangeAmount(e.target.value)}
                          placeholder="Exemplo: R$ 50,00"
                          className="w-full sm:w-64 text-sm p-2.5 rounded-xl border border-stone-300 focus:outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* General Order Notes */}
              <div className="pt-2 border-t border-stone-100">
                <label className="font-display font-extrabold text-sm text-stone-900 block mb-1">
                  Observações para a Entrega (opcional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ex: Tocar a campainha, deixar na portaria..."
                  rows={2}
                  className="w-full text-sm p-3 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent resize-none"
                />
              </div>

              {/* Summary of Total */}
              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-700 font-bold">Total do Pedido</p>
                  <p className="text-xs text-stone-500">
                    {items.length} itens + taxa de entrega
                  </p>
                </div>
                <p className="font-display font-black text-2xl text-purple-950">
                  {formatCurrency(total)}
                </p>
              </div>

              {/* Submit to Review Button */}
              <button
                type="submit"
                id="btn-submit-to-review"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-base shadow-xl shadow-emerald-700/20 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>CONFERIR PEDIDO →</span>
              </button>
            </form>
          ) : (
            /* STEP 2: ORDER REVIEW ("CONFIRA SEU PEDIDO") */
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-3.5 rounded-2xl bg-purple-100/70 border border-purple-200 text-purple-950 text-xs font-semibold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-700 flex-shrink-0" />
                <span>
                  Por favor, revise atentamente todos os dados antes de confirmar. Ao clicar em confirmar, o WhatsApp abrirá com sua mensagem preenchida!
                </span>
              </div>

              {/* Customer & Address Details */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs sm:text-sm space-y-2">
                <h4 className="font-display font-black text-stone-900 text-sm flex items-center gap-1.5 pb-1 border-b border-stone-200">
                  <User className="w-4 h-4 text-purple-600" />
                  <span>Dados do Cliente & Entrega</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-stone-700 pt-1">
                  <p>
                    <strong className="text-stone-900">Cliente:</strong> {currentOrder.customerName}
                  </p>
                  <p>
                    <strong className="text-stone-900">Telefone:</strong> {currentOrder.customerPhone}
                  </p>
                  <p className="sm:col-span-2">
                    <strong className="text-stone-900">Endereço:</strong> {currentOrder.address.rua}, {currentOrder.address.numero} - {currentOrder.address.bairro}, {currentOrder.address.cidade}
                  </p>
                  <p>
                    <strong className="text-stone-900">CEP:</strong> {currentOrder.address.cep}
                  </p>
                  {currentOrder.address.complemento && (
                    <p>
                      <strong className="text-stone-900">Complemento:</strong> {currentOrder.address.complemento}
                    </p>
                  )}
                  {currentOrder.address.referencia && (
                    <p className="sm:col-span-2">
                      <strong className="text-stone-900">Referência:</strong> {currentOrder.address.referencia}
                    </p>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 space-y-3">
                <h4 className="font-display font-black text-stone-900 text-sm pb-1 border-b border-stone-200">
                  Itens do Pedido ({items.length})
                </h4>
                <div className="space-y-3">
                  {items.map((it, idx) => (
                    <div key={idx} className="text-xs sm:text-sm text-stone-800">
                      <div className="flex justify-between font-bold">
                        <span>
                          {it.quantity}x {it.productName} {it.size}
                        </span>
                        <span className="font-black text-purple-950">
                          {formatCurrency(it.itemTotal)}
                        </span>
                      </div>
                      {it.selectedFlavor && (
                        <p className="text-stone-600 text-xs">Sabor: {it.selectedFlavor}</p>
                      )}
                      {it.selectedFruit && (
                        <p className="text-stone-600 text-xs">Fruta: {it.selectedFruit}</p>
                      )}
                      {it.freeAdditions.length > 0 && (
                        <p className="text-stone-500 text-xs mt-0.5">
                          Adicionais: {it.freeAdditions.join(', ')}
                        </p>
                      )}
                      {it.extraAdditions.length > 0 && (
                        <p className="text-pink-700 font-medium text-xs mt-0.5">
                          Extras: {it.extraAdditions.map((ex) => `${ex.name} (${formatCurrency(ex.price)})`).join(', ')}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment & Values */}
              <div className="bg-stone-50 rounded-2xl p-4 border border-stone-200 text-xs sm:text-sm space-y-2">
                <div className="flex justify-between text-stone-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-stone-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-stone-600">
                  <span>Taxa de entrega</span>
                  <span className="font-bold text-stone-900">{formatCurrency(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-stone-900 pt-2 border-t border-stone-200">
                  <span>Total a Pagar</span>
                  <span className="text-purple-950 text-xl font-black font-display">
                    {formatCurrency(total)}
                  </span>
                </div>
                <div className="pt-2 border-t border-stone-200 flex items-center justify-between text-stone-700">
                  <span className="font-bold">Forma de Pagamento:</span>
                  <span className="font-extrabold uppercase text-purple-900 bg-purple-100 px-2 py-0.5 rounded-md">
                    {currentOrder.paymentMethod}
                    {currentOrder.paymentMethod === 'dinheiro' && currentOrder.needChange
                      ? ` (Troco p/ ${currentOrder.changeAmount})`
                      : ''}
                  </span>
                </div>
                {currentOrder.notes && (
                  <div className="pt-1 text-stone-500 text-xs">
                    <strong className="text-stone-700">Observações:</strong> {currentOrder.notes}
                  </div>
                )}
              </div>

              {/* Review Buttons: Edit vs Confirm */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  id="btn-back-to-edit"
                  onClick={() => setStep('form')}
                  className="sm:w-1/3 py-3.5 px-4 rounded-2xl border-2 border-stone-300 hover:bg-stone-100 text-stone-800 font-bold text-sm transition-all"
                >
                  ← VOLTAR E EDITAR
                </button>

                <button
                  type="button"
                  id="btn-confirm-order-whatsapp"
                  onClick={handleFinalConfirmOrder}
                  className="sm:w-2/3 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-extrabold text-base shadow-xl shadow-emerald-700/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>✅ CONFIRMAR PEDIDO</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
