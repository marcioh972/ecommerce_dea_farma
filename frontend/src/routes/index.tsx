import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Truck, ShieldCheck, Tag, Boxes } from "lucide-react";
import { BANNERS, CATEGORIES, PRODUCTS } from "@/lib/mock/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "DeA Farma — Distribuidora farmacêutica B2B para farmácias" },
      {
        name: "description",
        content:
          "Compre no atacado: genéricos, similares, referência, dermocosméticos e equipamentos. Atendimento exclusivo a farmácias, drogarias e clínicas.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const novos = PRODUCTS.filter((p) => p.isNew);
  const ofertas = PRODUCTS.filter((p) => p.originalPrice);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10 space-y-12">
      <BannerCarousel />

      <CategoryGrid />

      <Section title="Chegou agora" subtitle="Novidades no catálogo">
        <ScrollRow>
          {novos.map((p) => (
            <div key={p.id} className="w-[240px] md:w-[260px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </ScrollRow>
      </Section>

      <Section
        title="Ofertas da semana"
        subtitle="Preços especiais por tempo limitado"
        action={
          <Link to="/promocoes" className="text-sm font-medium text-primary hover:underline">
            Ver todas
          </Link>
        }
      >
        <ScrollRow>
          {ofertas.map((p) => (
            <div key={p.id} className="w-[240px] md:w-[260px] shrink-0">
              <ProductCard product={p} />
            </div>
          ))}
        </ScrollRow>
      </Section>

      <Differentials />
    </div>
  );
}

function BannerCarousel() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % BANNERS.length), 5500);
    return () => clearInterval(t);
  }, []);
  const b = BANNERS[i];
  return (
    <div className="relative overflow-hidden rounded-3xl">
      <div
        className={`bg-gradient-to-br ${b.gradient} text-white p-8 md:p-14 min-h-[220px] md:min-h-[320px] flex flex-col justify-end transition-all duration-500`}
      >
        <div className="max-w-xl">
          <div className="text-xs uppercase tracking-widest opacity-80 mb-2">
            DeA Farma B2B
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">{b.title}</h1>
          <p className="mt-3 text-sm md:text-lg opacity-90">{b.subtitle}</p>
          <Button asChild size="lg" variant="secondary" className="mt-6 rounded-full">
            <Link to={b.to}>{b.cta}</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-x-0 bottom-4 flex items-center justify-center gap-2">
        {BANNERS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Banner ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-8 bg-white" : "w-2 bg-white/50"
            }`}
          />
        ))}
      </div>
      <button
        onClick={() => setI((v) => (v - 1 + BANNERS.length) % BANNERS.length)}
        className="hidden md:grid absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => setI((v) => (v + 1) % BANNERS.length)}
        className="hidden md:grid absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 place-items-center rounded-full bg-white/20 hover:bg-white/30 text-white"
        aria-label="Próximo"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </div>
  );
}

function CategoryGrid() {
  return (
    <section>
      <h2 className="text-xl md:text-2xl font-bold mb-4">Navegue por categoria</h2>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 md:gap-4">
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            to="/produtos"
            search={{ categoria: c.slug } as never}
            className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-secondary transition-colors"
          >
            <div className="h-16 w-16 md:h-20 md:w-20 grid place-items-center rounded-full bg-primary-soft text-3xl md:text-4xl transition-transform group-hover:scale-105">
              {c.icon}
            </div>
            <span className="text-xs md:text-sm text-center font-medium leading-tight">
              {c.name}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Section({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 snap-x snap-mandatory scrollbar-thin">
      {children}
    </div>
  );
}

function Differentials() {
  const items = [
    { icon: ShieldCheck, title: "Distribuidora regularizada", text: "AFE/ANVISA em dia. Rastreabilidade completa." },
    { icon: Truck, title: "Entrega rápida", text: "Malha logística nacional com prazos otimizados." },
    { icon: Tag, title: "Preços exclusivos", text: "Tabelas B2B liberadas após aprovação do cadastro." },
    { icon: Boxes, title: "Catálogo amplo", text: "Múltiplos laboratórios e milhares de SKUs." },
  ];
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {items.map((it) => (
        <div key={it.title} className="rounded-2xl border border-border bg-card p-5">
          <div className="h-10 w-10 grid place-items-center rounded-full bg-primary-soft text-primary">
            <it.icon className="h-5 w-5" />
          </div>
          <h3 className="mt-3 font-semibold">{it.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{it.text}</p>
        </div>
      ))}
    </section>
  );
}
