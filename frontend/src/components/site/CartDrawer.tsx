import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart, useAccount } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { brl } from "@/lib/format";

const MIN_ORDER = 500;

export function CartDrawer() {
  const { items, open, setOpen, setQty, remove, subtotal } = useCart();
  const status = useAccount((s) => s.status);
  const total = subtotal();
  const below = total > 0 && total < MIN_ORDER;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <SheetHeader className="px-6 py-4 border-b border-border">
          <SheetTitle>Seu carrinho</SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-3 px-6 text-center">
            <div className="h-16 w-16 grid place-items-center rounded-full bg-secondary">
              <ShoppingBag className="h-7 w-7 text-muted-foreground" />
            </div>
            <p className="font-medium">Seu carrinho está vazio</p>
            <p className="text-sm text-muted-foreground">
              Adicione produtos do catálogo para começar seu pedido.
            </p>
            <Button onClick={() => setOpen(false)}>Ver produtos</Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex gap-3">
                  <img
                    src={product.image}
                    alt=""
                    className="h-16 w-16 rounded-lg object-cover shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium line-clamp-2">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.lab}</div>
                    <div className="mt-1 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          onClick={() => setQty(product.id, qty - 1)}
                          className="h-7 w-7 grid place-items-center"
                          aria-label="Diminuir"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm">{qty}</span>
                        <button
                          onClick={() => setQty(product.id, qty + 1)}
                          className="h-7 w-7 grid place-items-center"
                          aria-label="Aumentar"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <div className="text-sm font-semibold">
                        {brl(qty * product.pricePerBox)}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => remove(product.id)}
                    className="h-8 w-8 grid place-items-center rounded-full hover:bg-accent text-muted-foreground"
                    aria-label="Remover"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border px-6 py-4 space-y-3">
              {below && (
                <div className="rounded-lg bg-warning/15 text-xs text-warning-foreground/90 px-3 py-2">
                  Pedido mínimo de {brl(MIN_ORDER)}. Faltam{" "}
                  <strong>{brl(MIN_ORDER - total)}</strong>.
                </div>
              )}
              {status === "pending" && (
                <div className="rounded-lg bg-primary-soft text-xs text-primary px-3 py-2">
                  Seu cadastro está em análise. Você poderá finalizar o pedido
                  assim que for aprovado.
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-lg font-bold">{brl(total)}</span>
              </div>
              <Button
                className="w-full"
                size="lg"
                disabled={below || status !== "approved"}
              >
                {status === "approved" ? "Finalizar pedido" : "Cadastro em análise"}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
