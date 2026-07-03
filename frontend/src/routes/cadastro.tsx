import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAccount } from "@/lib/stores";
import { toast } from "sonner";
import { Check, Upload, Building2, User, FileText, MapPin, Lock } from "lucide-react";

export const Route = createFileRoute("/cadastro")({
  head: () => ({
    meta: [
      { title: "Cadastro de Farmácia — DeA Farma B2B" },
      {
        name: "description",
        content:
          "Cadastre sua farmácia, drogaria ou clínica na DeA Farma e desbloqueie preços B2B.",
      },
    ],
  }),
  component: CadastroPage,
});

const STEPS = [
  { key: "empresa", label: "Empresa", icon: Building2 },
  { key: "responsavel", label: "Responsável", icon: User },
  { key: "docs", label: "Documentação", icon: FileText },
  { key: "endereco", label: "Endereço", icon: MapPin },
  { key: "senha", label: "Senha", icon: Lock },
];

function CadastroPage() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    razao: "",
    fantasia: "",
    cnpj: "",
    ie: "",
    respNome: "",
    respCpf: "",
    respCargo: "",
    respEmail: "",
    respTel: "",
    cep: "",
    endereco: "",
    numero: "",
    cidade: "",
    uf: "",
    senha: "",
    senha2: "",
  });
  const login = useAccount((s) => s.login);
  const navigate = useNavigate();
  const set = (k: keyof typeof data) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [k]: e.target.value });

  const finalize = () => {
    if (data.senha !== data.senha2) {
      toast.error("As senhas não coincidem");
      return;
    }
    login({
      company: data.fantasia || data.razao || "Sua farmácia",
      email: data.respEmail,
      status: "pending",
    });
    toast.success("Cadastro recebido!", {
      description: "Estamos validando seus dados. Retorno em até 2 dias úteis.",
    });
    navigate({ to: "/" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl md:text-3xl font-bold text-center">Cadastro da sua farmácia</h1>
      <p className="mt-2 text-center text-sm text-muted-foreground">
        Venda liberada após validação manual pela equipe DeA Farma.
      </p>

      <ol className="mt-8 grid grid-cols-5 gap-2">
        {STEPS.map((s, i) => (
          <li key={s.key} className="flex flex-col items-center gap-2">
            <div
              className={`h-10 w-10 grid place-items-center rounded-full text-sm font-semibold ${
                i < step
                  ? "bg-primary text-primary-foreground"
                  : i === step
                    ? "bg-primary text-primary-foreground ring-4 ring-primary-soft"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
            </div>
            <span className="text-[11px] text-center font-medium">{s.label}</span>
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-2xl border border-border bg-card p-6 md:p-8 space-y-4">
        {step === 0 && (
          <>
            <Field label="Razão Social" value={data.razao} onChange={set("razao")} />
            <Field label="Nome Fantasia" value={data.fantasia} onChange={set("fantasia")} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="CNPJ" value={data.cnpj} onChange={set("cnpj")} placeholder="00.000.000/0001-00" />
              <Field label="Inscrição Estadual" value={data.ie} onChange={set("ie")} />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <Field label="Nome do responsável" value={data.respNome} onChange={set("respNome")} />
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="CPF" value={data.respCpf} onChange={set("respCpf")} />
              <Field label="Cargo" value={data.respCargo} onChange={set("respCargo")} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="E-mail" type="email" value={data.respEmail} onChange={set("respEmail")} />
              <Field label="Telefone" value={data.respTel} onChange={set("respTel")} />
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <p className="text-sm text-muted-foreground">
              Envie os documentos que comprovam a regularização da sua empresa.
            </p>
            <FileField label="Alvará Sanitário / Licença de Funcionamento" />
            <FileField label="CRF do farmacêutico responsável (se aplicável)" />
            <FileField label="Cartão CNPJ" />
          </>
        )}

        {step === 3 && (
          <>
            <div className="grid gap-4 md:grid-cols-[140px_1fr]">
              <Field label="CEP" value={data.cep} onChange={set("cep")} />
              <Field label="Endereço" value={data.endereco} onChange={set("endereco")} />
            </div>
            <div className="grid gap-4 md:grid-cols-[120px_1fr_120px]">
              <Field label="Número" value={data.numero} onChange={set("numero")} />
              <Field label="Cidade" value={data.cidade} onChange={set("cidade")} />
              <Field label="UF" value={data.uf} onChange={set("uf")} />
            </div>
          </>
        )}

        {step === 4 && (
          <>
            <Field label="Senha" type="password" value={data.senha} onChange={set("senha")} />
            <Field label="Confirme a senha" type="password" value={data.senha2} onChange={set("senha2")} />
            <p className="text-xs text-muted-foreground">
              Use ao menos 8 caracteres, com letras e números.
            </p>
          </>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
          Voltar
        </Button>
        {step < STEPS.length - 1 ? (
          <Button onClick={() => setStep((s) => s + 1)}>Continuar</Button>
        ) : (
          <Button onClick={finalize}>Enviar cadastro</Button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  const id = label.replace(/\s/g, "-").toLowerCase();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...rest} />
    </div>
  );
}

function FileField({ label }: { label: string }) {
  return (
    <label className="flex items-center gap-3 rounded-xl border border-dashed border-border p-4 cursor-pointer hover:bg-secondary/50">
      <div className="h-10 w-10 grid place-items-center rounded-full bg-primary-soft text-primary">
        <Upload className="h-4 w-4" />
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">PDF, JPG ou PNG — até 5MB</div>
      </div>
      <input type="file" className="hidden" />
    </label>
  );
}
