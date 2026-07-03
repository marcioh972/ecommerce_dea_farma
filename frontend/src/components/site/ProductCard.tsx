import type { Product } from "@/lib/mock/catalog";
import { discountPct } from "@/lib/mock/catalog";
import { brl, pct } from "@/lib/format";
import { useState } from "react";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart, useAccount } from "@/lib/stores";
import { toast } from "sonner";

export function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const add = useCart((s) => s.add);
  const status = useAccount((s) => s.status);
  const d = discountPct(product);

  const onAdd = () => {
    if (status === "pending") {
      toast.warning("Cadastro em análise", {
        description: "Você poderá comprar assim que seu cadastro for aprovado.",
      });
      return;
    }
    if (status === "rejected") {
      toast.error("Cadastro não aprovado", {
        description: "Entre em contato com nosso comercial para regularizar.",
      });
      return;
    }
    if (status === "guest") {
      toast.info("Faça login para comprar", {
        description: "Compras liberadas apenas para farmácias cadastradas.",
      });
      return;
    }
    add(product, qty);
    toast.success("Adicionado ao carrinho", { description: product.name });
  };

  return (
    <div className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-200 hover:shadow-md hover:-translate-y-0.5">
      <div className="relative aspect-square bg-secondary/60">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {d > 0 && <span className="badge-promo">-{pct(d)}</span>}
          {product.isNew && (
            <span className="badge-promo" style={{ background: "var(--color-primary)" }}>
              NOVO
            </span>
          )}
        </div>
        {product.prescription !== "Livre" && (
          <span className="absolute top-2 right-2 rounded-full bg-background/95 px-2 py-0.5 text-[10px] font-medium text-foreground border border-border">
            {product.prescription}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-3 md:p-4 gap-2">
        <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
          {product.lab} · {product.type}
        </div>
        <h3 className="text-sm font-medium leading-snug line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="mt-auto">
          {product.originalPrice && (
            <div className="text-xs text-muted-foreground line-through">
              {brl(product.originalPrice)}
            </div>
          )}
          <div className="flex items-baseline gap-2">
            <div className="text-lg font-bold text-foreground">{brl(product.pricePerBox)}</div>
            <div className="text-xs text-muted-foreground">/ caixa</div>
          </div>
          <div className="text-xs text-muted-foreground">
            {brl(product.pricePerUnit)} por unidade · {product.unitsPerBox} un.
          </div>
          <div className={`mt-1 text-xs ${product.stock > 50 ? "text-success" : "text-warning"}`}>
            {product.stock > 50 ? "Em estoque" : `Últimas ${product.stock} un.`}
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="inline-flex items-center rounded-full border border-border">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent"
              aria-label="Diminuir"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="w-6 text-center text-sm font-medium">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent"
              aria-label="Aumentar"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <Button onClick={onAdd} size="sm" className="flex-1 rounded-full">
            <ShoppingCart className="h-4 w-4" /> Adicionar
          </Button>
        </div>
      </div>
    </div>
  );
}
