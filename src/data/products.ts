import { Product, FreeAddition, ExtraAddition, StoreSettings } from '../types';

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'Açaizaço',
  whatsappNumber: '553187294095',
  displayPhone: '(31) 8729-4095',
  instagramHandle: '@ACAI_ZACO',
  instagramUrl: 'https://instagram.com/acai_zaco',
  mapsUrl: 'https://maps.app.goo.gl/rn4Aa9UeEvHgJeK9A',
  addressStreet: 'Rua Ouro, 15',
  addressNeighborhood: 'Iguaçu',
  addressCity: 'Ipatinga - MG',
  addressCep: '35162-103',
  standardDeliveryFee: 5.0,
  freeAdditionsLimit: 10,
  extraAdditionPerLimitPrice: 2.0, // extra beyond 10
  isOpen: true,
  openingHours: 'Terça a Domingo: 13:00 às 22:30',
  addressNote: 'Rua Ouro, 15 - Iguaçu, Ipatinga - MG (CEP 35162-103)',
};

export const INITIAL_PRODUCTS: Product[] = [
  // Açaí Tradicional
  {
    id: 'acai-200',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '200 ML',
    ml: 200,
    price: 11.0,
    description: 'Açaí puro e super cremoso batido na hora. Escolha até 10 adicionais grátis!',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'acai-250',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '250 ML',
    ml: 250,
    price: 13.0,
    description: 'Porção individual perfeita com máxima cremosidade e até 10 adicionais grátis.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'acai-300',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '300 ML',
    ml: 300,
    price: 17.0,
    description: 'O tamanho ideal para a sua tarde. Monte com suas frutas e confeitos favoritos.',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'acai-400',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '400 ML',
    ml: 400,
    price: 21.0,
    description: 'Mais açaí para matar a vontade! Monte do seu jeito com até 10 adicionais grátis.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'acai-500',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '500 ML',
    ml: 500,
    price: 23.0,
    description: 'O mais pedido da Açaizaço! Copo caprichado com camadas generosas de complementos.',
    image: 'https://images.unsplash.com/photo-1590301157890-4810ed352733?auto=format&fit=crop&w=700&q=80',
    popular: true,
    badge: 'Mais Pedido 💜',
    available: true,
  },
  {
    id: 'acai-750',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '750 ML',
    ml: 750,
    price: 28.0,
    description: 'Tamanho generoso para quem ama açaí de verdade. Muito recheio e sabor!',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'acai-1000',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '1 LITRO',
    ml: 1000,
    price: 35.0,
    description: 'Pote de 1 Litro para dividir com quem você ama ou aproveitar em família.',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=700&q=80',
    popular: true,
    badge: 'Para Dividir 🍨',
    available: true,
  },
  {
    id: 'acai-2000',
    name: 'Açaí Tradicional',
    category: 'acai',
    size: '2 LITROS',
    ml: 2000,
    price: 65.0,
    description: 'Balde gigante de 2 Litros da melhor polpa de açaí artesanal da região.',
    image: 'https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?auto=format&fit=crop&w=700&q=80',
    available: true,
  },

  // Milk-Shakes
  {
    id: 'milkshake-400',
    name: 'Milk-Shake Especial',
    category: 'milkshake',
    size: '400 ML',
    ml: 400,
    price: 20.0,
    description: 'Super cremoso, batido com sorvete nobre e borda trufada de dar água na boca.',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'milkshake-500',
    name: 'Milk-Shake Especial',
    category: 'milkshake',
    size: '500 ML',
    ml: 500,
    price: 25.0,
    description: 'O copo clássico de 500ml com borda trufada artesanal e cobertura irresistível.',
    image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=700&q=80',
    popular: true,
    badge: 'Sucesso 🥤',
    available: true,
  },
  {
    id: 'milkshake-750',
    name: 'Milk-Shake Especial',
    category: 'milkshake',
    size: '750 ML',
    ml: 750,
    price: 28.0,
    description: 'Mega Milk-Shake para os verdadeiros apaixonados por sobremesas trufadas.',
    image: 'https://images.unsplash.com/photo-1568909344668-6f14a07b56a0?auto=format&fit=crop&w=700&q=80',
    available: true,
  },

  // Vitamina de Açaí
  {
    id: 'vitamina-300',
    name: 'Vitamina de Açaí',
    category: 'vitamina',
    size: '300 ML',
    ml: 300,
    price: 17.0,
    description: 'Açaí batido na hora com leite em pó, leite condensado e + 1 fruta à sua escolha.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'vitamina-400',
    name: 'Vitamina de Açaí',
    category: 'vitamina',
    size: '400 ML',
    ml: 400,
    price: 21.0,
    description: 'Muita energia e sabor nutritivo! Acompanha leite em pó, leite condensado e 1 fruta.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80',
    available: true,
  },
  {
    id: 'vitamina-500',
    name: 'Vitamina de Açaí',
    category: 'vitamina',
    size: '500 ML',
    ml: 500,
    price: 23.0,
    description: 'Vitamina encorpada e refrescante com leite em pó, leite condensado e 1 fruta fresca.',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=700&q=80',
    popular: true,
    badge: 'Super Energia ⚡',
    available: true,
  },
];

export const MILKSHAKE_FLAVORS = [
  {
    id: 'ninho-trufado',
    name: 'NINHO TRUFADO',
    description: 'Um delicioso sorvete de ninho com um creme de ninho em volta do copo.',
    badge: 'Favorito',
  },
  {
    id: 'ovomaltine-trufado',
    name: 'OVOMALTINE TRUFADO',
    description: 'Um delicioso sorvete de ovomaltine com creme de ovomaltine em volta do copo.',
    badge: 'Crocante',
  },
];

export const VITAMINA_FRUITS = [
  { id: 'banana', name: 'Banana' },
  { id: 'morango', name: 'Morango' },
  { id: 'abacaxi', name: 'Abacaxi' },
  { id: 'manga', name: 'Manga' },
];

export const FREE_ADDITIONS: FreeAddition[] = [
  { id: 'amendoim', name: 'Amendoim granulado', category: 'crocante' },
  { id: 'banana', name: 'Banana', category: 'fruta' },
  { id: 'cob-chocolate', name: 'Cobertura de chocolate', category: 'cobertura' },
  { id: 'cob-maracuja', name: 'Cobertura de maracujá', category: 'cobertura' },
  { id: 'cob-morango', name: 'Cobertura de morango', category: 'cobertura' },
  { id: 'disquete', name: 'Disquete', category: 'crocante' },
  { id: 'flocos-arroz', name: 'Flocos de arroz', category: 'crocante' },
  { id: 'granola', name: 'Granola', category: 'crocante' },
  { id: 'leite-po', name: 'Leite em pó', category: 'creme' },
  { id: 'leite-condensado', name: 'Leite condensado', category: 'cobertura' },
  { id: 'gotas-chocolate', name: 'Gotas de chocolate', category: 'crocante' },
  { id: 'ovomaltine', name: 'Ovomaltine', category: 'crocante' },
  { id: 'pacoca', name: 'Paçoca', category: 'crocante' },
  { id: 'morango', name: 'Morango', category: 'fruta' },
  { id: 'chocoball', name: 'Chocoball', category: 'crocante' },
  { id: 'sorvete-ninho', name: 'Sorvete de ninho', category: 'creme' },
];

export const EXTRA_ADDITIONS: ExtraAddition[] = [
  {
    id: 'bis',
    name: 'BIS (2 UND)',
    price: 1.50,
    description: 'Dois tabletes crocantes de chocolate Bis',
  },
  {
    id: 'mousse-maracuja',
    name: 'MOUSSE DE MARACUJÁ NATURAL',
    price: 3.00,
    description: 'Mousse artesanal cremoso feito com fruta fresca',
  },
  {
    id: 'mousse-morango',
    name: 'MOUSSE DE MORANGO',
    price: 2.00,
    description: 'Creme aveludado e suave de morango',
  },
  {
    id: 'oreo',
    name: 'BISCOITO OREO',
    price: 2.00,
    description: 'Pedaços crocantes de biscoito Oreo original',
  },
  {
    id: 'nutella',
    name: 'NUTELLA ORIGINAL',
    price: 6.00,
    description: 'Nutella legítima pura e generosa',
  },
  {
    id: 'chantininho',
    name: 'CHANTININHO',
    price: 3.00,
    description: 'Chantilly especial aerado com Leite Ninho',
  },
  {
    id: 'creme-ninho',
    name: 'CREME DE NINHO',
    price: 5.50,
    description: 'Creme nobre super aveludado de Leite Ninho',
  },
];

export const FAQ_ITEMS = [
  {
    question: '1. Como faço meu pedido?',
    answer:
      'Escolha seus produtos, personalize seu açaí, adicione os complementos, informe seu endereço e forma de pagamento e finalize pelo WhatsApp.',
  },
  {
    question: '2. Posso escolher os adicionais?',
    answer:
      'Sim! Você pode escolher até 10 adicionais grátis conforme as opções disponíveis.',
  },
  {
    question: '3. Quais formas de pagamento vocês aceitam?',
    answer:
      'Pix, dinheiro, cartão de crédito e cartão de débito.',
  },
  {
    question: '4. Posso pedir pelo WhatsApp?',
    answer:
      'Sim. Você também pode entrar em contato diretamente pelo WhatsApp da Açaizaço.',
  },
  {
    question: '5. Vocês fazem delivery e onde fica a loja?',
    answer:
      'Sim! A Açaizaço trabalha com delivery rápido para toda Ipatinga e você também pode retirar seu pedido em nossa loja física na Rua Ouro, 15 - Bairro Iguaçu, Ipatinga - MG.',
  },
  {
    question: '6. Posso pedir mais de um produto?',
    answer:
      'Sim. Você pode adicionar vários produtos diferentes ao mesmo pedido.',
  },
  {
    question: '7. Posso escolher o sabor do milk-shake?',
    answer:
      'Sim. Atualmente temos Ninho Trufado e Ovomaltine Trufado.',
  },
  {
    question: '8. Posso colocar observações no pedido?',
    answer:
      'Sim. Antes de finalizar o pedido existe um campo para observações.',
  },
];
