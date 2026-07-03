import { Instagram, Facebook, Linkedin, ShieldCheck } from "lucide-react";
import logoAsset from "@/assets/logotipo.png?url";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-8 md:grid-cols-4">
        <div>
          <img src={logoAsset} alt="DeA Farma" className="h-10 w-auto" />
          <p className="mt-4 text-sm text-muted-foreground">
            Distribuidora farmacêutica regularizada. Atendimento exclusivo a
            farmácias, drogarias e clínicas em todo o Brasil.
          </p>
          <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck className="h-4 w-4 text-primary" />
            AFE / ANVISA — Empresa regularizada
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Institucional</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Sobre a DeA Farma</li>
            <li>Política de privacidade</li>
            <li>Termos de uso</li>
            <li>Trabalhe conosco</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Contato</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>SAC: (11) 4000-0000</li>
            <li>WhatsApp: (11) 90000-0000</li>
            <li>atendimento@deafarma.com.br</li>
            <li>Seg. a sex., 8h às 18h</li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">Siga a DeA Farma</h4>
          <div className="mt-3 flex gap-3">
            <a className="p-2 rounded-full bg-background border border-border hover:text-primary" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
            <a className="p-2 rounded-full bg-background border border-border hover:text-primary" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            <a className="p-2 rounded-full bg-background border border-border hover:text-primary" aria-label="LinkedIn"><Linkedin className="h-4 w-4" /></a>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            CNPJ: 00.000.000/0001-00
          </p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 py-4 text-xs text-muted-foreground text-center">
          Venda exclusiva a pessoas jurídicas do setor farmacêutico. Sob prescrição
          médica quando aplicável. Ao persistirem os sintomas, um médico deverá ser
          consultado. © {new Date().getFullYear()} DeA Farma.
        </div>
      </div>
    </footer>
  );
}
