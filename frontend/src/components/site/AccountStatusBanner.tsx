import { useAccount } from "@/lib/stores";
import { AlertCircle, Clock, XCircle } from "lucide-react";

export function AccountStatusBanner() {
  const status = useAccount((s) => s.status);

  if (status === "pending") {
    return (
      <div className="bg-primary-soft border-b border-primary/20">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-2 text-sm text-primary">
          <Clock className="h-4 w-4 shrink-0" />
          <span>
            <strong>Cadastro em análise.</strong> Você pode navegar pelo catálogo;
            as compras serão liberadas em até 2 dias úteis.
          </span>
        </div>
      </div>
    );
  }
  if (status === "rejected") {
    return (
      <div className="bg-destructive/10 border-b border-destructive/20">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-2 text-sm text-destructive">
          <XCircle className="h-4 w-4 shrink-0" />
          <span>
            <strong>Cadastro não aprovado.</strong> Fale com nosso comercial para
            regularizar: (11) 4000-0000.
          </span>
        </div>
      </div>
    );
  }
  if (status === "guest") {
    return (
      <div className="bg-secondary border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-2 flex items-center gap-2 text-xs text-muted-foreground">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          Venda exclusiva a pessoas jurídicas do setor farmacêutico. Faça login
          ou cadastre sua farmácia.
        </div>
      </div>
    );
  }
  return null;
}