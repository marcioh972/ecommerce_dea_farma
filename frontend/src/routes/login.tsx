import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "@/lib/stores";
import { toast } from "sonner";
import logoAsset from "@/assets/logotipo.png?url";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Entrar — DeA Farma B2B" },
      { name: "description", content: "Acesse sua conta B2B na DeA Farma." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");
  const login = useAccount((s) => s.login);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !pwd) return;
    login({ company: "Drogaria Exemplo Ltda.", email: id, status: "approved" });
    toast.success("Bem-vindo(a) de volta!");
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <div className="text-center mb-8">
        <img src={logoAsset} alt="DeA Farma" className="h-12 mx-auto" />
        <h1 className="mt-6 text-2xl font-bold">Acesse sua conta</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Portal exclusivo para farmácias, drogarias e clínicas.
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-card p-6">
        <div className="space-y-2">
          <Label htmlFor="id">E-mail ou CNPJ</Label>
          <Input id="id" value={id} onChange={(e) => setId(e.target.value)} placeholder="voce@farmacia.com.br" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="pwd">Senha</Label>
            <a className="text-xs text-primary hover:underline cursor-pointer">Esqueci minha senha</a>
          </div>
          <Input id="pwd" type="password" value={pwd} onChange={(e) => setPwd(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" size="lg">Entrar</Button>

        <div className="text-center text-sm text-muted-foreground">
          Ainda não tem conta?{" "}
          <Link to="/cadastro" className="text-primary font-medium hover:underline">
            Cadastre sua farmácia
          </Link>
        </div>
      </form>

      <div className="mt-4 text-center text-xs text-muted-foreground">
        Dica de demo: qualquer e-mail e senha entram como conta aprovada.
      </div>
    </div>
  );
}
