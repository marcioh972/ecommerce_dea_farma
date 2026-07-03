// Mock data — isolated for future replacement by the Java Spring Boot API.
// All strings in pt-BR.

export type Category = {
  slug: string;
  name: string;
  icon: string; // emoji fallback (visual signature: circular badge)
};

export type Lab = { slug: string; name: string };

export type ProductType = "Genérico" | "Similar" | "Referência";
export type Prescription = "Livre" | "Prescrição" | "Controlado";

export type Product = {
  id: string;
  name: string;
  lab: string;
  category: string; // slug
  type: ProductType;
  prescription: Prescription;
  image: string;
  pricePerBox: number;
  pricePerUnit: number;
  unitsPerBox: number;
  originalPrice?: number; // when on promo
  stock: number;
  isNew?: boolean;
  bestSeller?: boolean;
};

export const CATEGORIES: Category[] = [
  { slug: "genericos", name: "Genéricos", icon: "💊" },
  { slug: "similares", name: "Similares", icon: "🧪" },
  { slug: "referencia", name: "Referência", icon: "⭐" },
  { slug: "antibioticos", name: "Antibióticos", icon: "🦠" },
  { slug: "analgesicos", name: "Analgésicos e Antitérmicos", icon: "🌡️" },
  { slug: "anti-inflamatorios", name: "Anti-inflamatórios", icon: "🔥" },
  { slug: "dermocosmeticos", name: "Dermocosméticos", icon: "🧴" },
  { slug: "higiene-beleza", name: "Higiene e Beleza", icon: "🧼" },
  { slug: "vitaminas", name: "Vitaminas e Suplementos", icon: "🍊" },
  { slug: "mae-bebe", name: "Mãe e Bebê", icon: "👶" },
  { slug: "primeiros-socorros", name: "Primeiros Socorros", icon: "🩹" },
  { slug: "equipamentos", name: "Equipamentos Médicos", icon: "🩺" },
  { slug: "perfumaria", name: "Perfumaria", icon: "🌸" },
];

export const LABS: Lab[] = [
  { slug: "ems", name: "EMS" },
  { slug: "eurofarma", name: "Eurofarma" },
  { slug: "medley", name: "Medley" },
  { slug: "neo-quimica", name: "Neo Química" },
  { slug: "cimed", name: "Cimed" },
  { slug: "hypera", name: "Hypera" },
  { slug: "ache", name: "Aché" },
  { slug: "sanofi", name: "Sanofi" },
];

const img = (seed: string) =>
  `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=600&q=70`;

// Deterministic curated list — no Lorem Ipsum.
export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    name: "Dipirona Sódica 500mg — 20 comprimidos",
    lab: "EMS",
    category: "analgesicos",
    type: "Genérico",
    prescription: "Livre",
    image: img("1587854692152-cbe660dbde88"),
    pricePerBox: 8.9,
    pricePerUnit: 0.45,
    unitsPerBox: 20,
    originalPrice: 12.5,
    stock: 480,
    bestSeller: true,
  },
  {
    id: "p-002",
    name: "Paracetamol 750mg — 20 comprimidos",
    lab: "Medley",
    category: "analgesicos",
    type: "Genérico",
    prescription: "Livre",
    image: img("1550572017-edd951b55104"),
    pricePerBox: 11.4,
    pricePerUnit: 0.57,
    unitsPerBox: 20,
    stock: 320,
  },
  {
    id: "p-003",
    name: "Amoxicilina 500mg — 21 cápsulas",
    lab: "Eurofarma",
    category: "antibioticos",
    type: "Genérico",
    prescription: "Prescrição",
    image: img("1584308666744-24d5c474f2ae"),
    pricePerBox: 24.9,
    pricePerUnit: 1.19,
    unitsPerBox: 21,
    originalPrice: 32.0,
    stock: 140,
  },
  {
    id: "p-004",
    name: "Ibuprofeno 600mg — 30 comprimidos",
    lab: "Neo Química",
    category: "anti-inflamatorios",
    type: "Genérico",
    prescription: "Livre",
    image: img("1471864190281-a93a3070b6de"),
    pricePerBox: 18.7,
    pricePerUnit: 0.62,
    unitsPerBox: 30,
    stock: 210,
    bestSeller: true,
  },
  {
    id: "p-005",
    name: "Rivotril 2mg — 30 comprimidos",
    lab: "Roche",
    category: "referencia",
    type: "Referência",
    prescription: "Controlado",
    image: img("1607619056574-7b8d3ee536b2"),
    pricePerBox: 42.0,
    pricePerUnit: 1.4,
    unitsPerBox: 30,
    stock: 60,
  },
  {
    id: "p-006",
    name: "Losartana Potássica 50mg — 30 comprimidos",
    lab: "EMS",
    category: "genericos",
    type: "Genérico",
    prescription: "Prescrição",
    image: img("1631549916768-4119b2e5f926"),
    pricePerBox: 9.8,
    pricePerUnit: 0.33,
    unitsPerBox: 30,
    originalPrice: 15.9,
    stock: 540,
    bestSeller: true,
  },
  {
    id: "p-007",
    name: "Protetor Solar Facial FPS 60 — 50g",
    lab: "Hypera",
    category: "dermocosmeticos",
    type: "Similar",
    prescription: "Livre",
    image: img("1556228720-195a672e8a03"),
    pricePerBox: 68.0,
    pricePerUnit: 68.0,
    unitsPerBox: 1,
    originalPrice: 92.0,
    stock: 95,
    isNew: true,
  },
  {
    id: "p-008",
    name: "Vitamina D3 2000UI — 60 cápsulas",
    lab: "Cimed",
    category: "vitaminas",
    type: "Similar",
    prescription: "Livre",
    image: img("1550572017-9d6b8b8a2d21"),
    pricePerBox: 39.9,
    pricePerUnit: 0.67,
    unitsPerBox: 60,
    stock: 180,
    isNew: true,
  },
  {
    id: "p-009",
    name: "Fralda Descartável Bebê G — 40 unidades",
    lab: "Hypera",
    category: "mae-bebe",
    type: "Similar",
    prescription: "Livre",
    image: img("1544367567-0f2fcb009e0b"),
    pricePerBox: 45.9,
    pricePerUnit: 1.15,
    unitsPerBox: 40,
    stock: 120,
  },
  {
    id: "p-010",
    name: "Álcool em Gel 70% — 500ml",
    lab: "Cimed",
    category: "primeiros-socorros",
    type: "Similar",
    prescription: "Livre",
    image: img("1585435557343-3b092031a831"),
    pricePerBox: 12.5,
    pricePerUnit: 12.5,
    unitsPerBox: 1,
    originalPrice: 18.0,
    stock: 800,
  },
  {
    id: "p-011",
    name: "Termômetro Digital Clínico",
    lab: "G-Tech",
    category: "equipamentos",
    type: "Similar",
    prescription: "Livre",
    image: img("1584515933487-779824d29309"),
    pricePerBox: 29.9,
    pricePerUnit: 29.9,
    unitsPerBox: 1,
    stock: 75,
    isNew: true,
  },
  {
    id: "p-012",
    name: "Shampoo Anticaspa — 200ml",
    lab: "Sanofi",
    category: "higiene-beleza",
    type: "Similar",
    prescription: "Livre",
    image: img("1556228453-efd6c1ff04f6"),
    pricePerBox: 32.5,
    pricePerUnit: 32.5,
    unitsPerBox: 1,
    originalPrice: 42.0,
    stock: 210,
  },
  {
    id: "p-013",
    name: "Omeprazol 20mg — 28 cápsulas",
    lab: "Medley",
    category: "genericos",
    type: "Genérico",
    prescription: "Livre",
    image: img("1587854692152-cbe660dbde88"),
    pricePerBox: 14.9,
    pricePerUnit: 0.53,
    unitsPerBox: 28,
    originalPrice: 22.0,
    stock: 360,
    bestSeller: true,
  },
  {
    id: "p-014",
    name: "Azitromicina 500mg — 5 comprimidos",
    lab: "Eurofarma",
    category: "antibioticos",
    type: "Genérico",
    prescription: "Prescrição",
    image: img("1550572017-edd951b55104"),
    pricePerBox: 22.4,
    pricePerUnit: 4.48,
    unitsPerBox: 5,
    stock: 180,
  },
  {
    id: "p-015",
    name: "Perfume Floral 50ml",
    lab: "Hypera",
    category: "perfumaria",
    type: "Similar",
    prescription: "Livre",
    image: img("1541643600914-78b084683601"),
    pricePerBox: 89.0,
    pricePerUnit: 89.0,
    unitsPerBox: 1,
    originalPrice: 120.0,
    stock: 45,
    isNew: true,
  },
  {
    id: "p-016",
    name: "Multivitamínico Adulto — 90 comprimidos",
    lab: "Aché",
    category: "vitaminas",
    type: "Similar",
    prescription: "Livre",
    image: img("1550572017-9d6b8b8a2d21"),
    pricePerBox: 54.0,
    pricePerUnit: 0.6,
    unitsPerBox: 90,
    stock: 220,
  },
];

export const BANNERS = [
  {
    id: "b1",
    title: "Ofertas da semana em Genéricos",
    subtitle: "Até 40% OFF nos principais laboratórios",
    cta: "Ver ofertas",
    to: "/promocoes",
    gradient: "from-primary to-primary/70",
  },
  {
    id: "b2",
    title: "Frete grátis acima de R$ 1.500",
    subtitle: "Para pedidos em todo o Brasil",
    cta: "Comprar agora",
    to: "/produtos",
    gradient: "from-emerald-700 to-emerald-500",
  },
  {
    id: "b3",
    title: "Novidades em Dermocosméticos",
    subtitle: "Amplie seu mix com as marcas mais vendidas",
    cta: "Explorar categoria",
    to: "/produtos?categoria=dermocosmeticos",
    gradient: "from-teal-700 to-teal-500",
  },
  {
    id: "b4",
    title: "Antibióticos com preço exclusivo B2B",
    subtitle: "Cadastre-se e desbloqueie sua tabela",
    cta: "Cadastrar farmácia",
    to: "/cadastro",
    gradient: "from-green-800 to-green-600",
  },
];

export const discountPct = (p: Product) =>
  p.originalPrice ? ((p.originalPrice - p.pricePerBox) / p.originalPrice) * 100 : 0;
