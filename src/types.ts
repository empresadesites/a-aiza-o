export type ProductCategory = 'acai' | 'milkshake' | 'vitamina';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  size: string;
  ml: number;
  price: number;
  description: string;
  image: string;
  popular?: boolean;
  badge?: string;
  available: boolean;
}

export interface FreeAddition {
  id: string;
  name: string;
  category?: 'fruta' | 'cobertura' | 'crocante' | 'creme';
}

export interface ExtraAddition {
  id: string;
  name: string;
  price: number;
  description?: string;
}

export interface CartItem {
  cartItemId: string;
  productId: string;
  productName: string;
  category: ProductCategory;
  size: string;
  basePrice: number;
  selectedFlavor?: string; // for milk-shakes
  selectedFruit?: string; // for vitaminas
  freeAdditions: string[];
  extraFreeCount: number; // free additions selected beyond the 10 limit (charged as extra)
  extraAdditions: {
    id: string;
    name: string;
    price: number;
  }[];
  notes?: string;
  quantity: number;
  itemTotal: number;
}

export interface OrderAddress {
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  complemento: string;
  referencia: string;
}

export type PaymentMethod = 'pix' | 'dinheiro' | 'credito' | 'debito';

export type OrderStatus = 'recebido' | 'preparacao' | 'entrega' | 'entregue' | 'cancelado';

export interface OrderDetails {
  id: string;
  orderNumber: number;
  createdAt: string;
  customerName: string;
  customerPhone: string;
  address: OrderAddress;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: PaymentMethod;
  needChange: boolean;
  changeAmount?: string;
  notes?: string;
  status: OrderStatus;
}

export interface StoreSettings {
  storeName: string;
  whatsappNumber: string; // "553187294095"
  displayPhone: string; // "(31) 8729-4095"
  instagramHandle: string; // "@ACAI_ZACO"
  instagramUrl: string;
  mapsUrl: string; // "https://maps.app.goo.gl/rn4Aa9UeEvHgJeK9A"
  addressStreet: string; // "Rua Ouro, 15"
  addressNeighborhood: string; // "Iguaçu"
  addressCity: string; // "Ipatinga - MG"
  addressCep: string; // "35162-103"
  standardDeliveryFee: number;
  freeAdditionsLimit: number;
  extraAdditionPerLimitPrice: number; // price for each addition above 10 (e.g. R$ 2.00)
  isOpen: boolean;
  openingHours: string;
  addressNote: string;
}
