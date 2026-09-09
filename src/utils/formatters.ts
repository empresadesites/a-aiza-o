import { OrderDetails } from '../types';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length <= 10) {
    return cleaned.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  }
  return cleaned.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
}

export function formatCep(cep: string): string {
  const cleaned = cep.replace(/\D/g, '');
  return cleaned.replace(/(\d{5})(\d{0,3})/, '$1-$2');
}

export async function fetchAddressByCep(cep: string): Promise<{
  rua: string;
  bairro: string;
  cidade: string;
} | null> {
  const cleaned = cep.replace(/\D/g, '');
  if (cleaned.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cleaned}/json/`);
    const data = await response.json();
    if (data.erro) return null;
    return {
      rua: data.logradouro || '',
      bairro: data.bairro || '',
      cidade: data.localidade || '',
    };
  } catch {
    return null;
  }
}

export function buildWhatsAppMessage(order: OrderDetails): string {
  const lines: string[] = [];

  lines.push('🍇 *NOVO PEDIDO - AÇAIZAÇO*');
  lines.push('');
  lines.push('👤 *CLIENTE*');
  lines.push(`Nome: ${order.customerName}`);
  lines.push(`Telefone: ${order.customerPhone}`);
  lines.push('');
  lines.push('📍 *ENDEREÇO DE ENTREGA*');
  lines.push(`Rua: ${order.address.rua}`);
  lines.push(`Número: ${order.address.numero}`);
  lines.push(`Bairro: ${order.address.bairro}`);
  lines.push(`Cidade: ${order.address.cidade}`);
  lines.push(`CEP: ${order.address.cep}`);
  if (order.address.complemento?.trim()) {
    lines.push(`Complemento: ${order.address.complemento.trim()}`);
  }
  if (order.address.referencia?.trim()) {
    lines.push(`Referência: ${order.address.referencia.trim()}`);
  }
  lines.push('');
  lines.push('🛒 *PEDIDO*');
  lines.push('');

  order.items.forEach((item) => {
    lines.push(`${item.quantity}x ${item.productName} ${item.size} — ${formatCurrency(item.itemTotal)}`);

    if (item.selectedFlavor) {
      lines.push(`Sabor: ${item.selectedFlavor}`);
    }

    if (item.selectedFruit) {
      lines.push(`Fruta inclusa: ${item.selectedFruit}`);
    }

    const hasFree = item.freeAdditions && item.freeAdditions.length > 0;
    const hasExtras = item.extraAdditions && item.extraAdditions.length > 0;

    if (hasFree || hasExtras) {
      lines.push('Adicionais:');
      item.freeAdditions.forEach((add) => {
        lines.push(`- ${add}`);
      });
      item.extraAdditions.forEach((extra) => {
        lines.push(`- ${extra.name} — ${formatCurrency(extra.price)}`);
      });
    }

    if (item.notes?.trim()) {
      lines.push(`Obs item: ${item.notes.trim()}`);
    }
    lines.push('');
  });

  lines.push(`💰 *SUBTOTAL:* ${formatCurrency(order.subtotal)}`);
  lines.push(`🚚 *ENTREGA:* ${formatCurrency(order.deliveryFee)}`);
  lines.push(`💵 *TOTAL:* ${formatCurrency(order.total)}`);
  lines.push('');

  const paymentLabels: Record<string, string> = {
    pix: 'Pix',
    dinheiro: 'Dinheiro',
    credito: 'Cartão de crédito',
    debito: 'Cartão de débito',
  };

  let paymentText = paymentLabels[order.paymentMethod] || order.paymentMethod;
  if (order.paymentMethod === 'dinheiro') {
    if (order.needChange && order.changeAmount?.trim()) {
      paymentText += ` (Precisa de troco para ${order.changeAmount.trim()})`;
    } else {
      paymentText += ' (Não precisa de troco)';
    }
  }
  lines.push(`💳 *PAGAMENTO:* ${paymentText}`);
  lines.push('');

  lines.push('📌 *OBSERVAÇÕES:*');
  lines.push(order.notes?.trim() ? order.notes.trim() : 'Sem observações');

  return lines.join('\n');
}

export function createWhatsAppOrderUrl(order: OrderDetails, whatsappNumber: string = '553187294095'): string {
  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  const message = buildWhatsAppMessage(order);
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

export function createDirectWhatsAppUrl(whatsappNumber: string = '553187294095', customText?: string): string {
  const cleanPhone = whatsappNumber.replace(/\D/g, '');
  const text = customText || 'Olá! Gostaria de fazer um pedido na Açaizaço.';
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
