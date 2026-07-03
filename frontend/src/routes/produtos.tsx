import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { CATEGORIES, LABS, PRODUCTS, type Product } from "@/lib/mock/catalog";
import { ProductCard } from "@/components/site/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal, PackageSearch } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { brl } from "@/lib/format";

const searchSchema = z.object({
  q: z.string().optional(),
  categoria: z.string().optional(),
});

export const Route = createFileRoute("/produtos")({
  validateSearch: (s) => searchSchema.parse(s),
  head: () => ({
    meta: [
      { title: "Produtos — DeA Farma" },
      { name: "description", content: "Catálogo completo de medicamentos e produtos para farmácias e clínicas." },
      { property: "og:title", content: "Catálogo de Produtos — DeA Farma" },
      { property: "og:description", content: "Milhares de SKUs de laboratórios brasileiros com preços B2B." },
    ],
  }),
  component: ProdutosPage,
});

const SORTS = [
  { v: "relevancia", label: "Relevância" },
  { v: "menor", label: "Menor preço" },
  { v: "maior", label: "Maior preço" },
  { v: "vendidos", label: "Mais vendidos" },
  { v: "novidades", label: "Novidades" },
];

function ProdutosPage() {
  const { q, categoria } = Route.useSearch();
  return <Catalog initialQ={q} initialCat={categoria} onlyPromo={false} title="Todos os produtos" />;
}

export function Catalog({
  initialQ,
  initialCat,
  onlyPromo,
  title,
}: {
  initialQ?: string;
  initialCat?: string;
  onlyPromo: boolean;
  title: string;
}) {
  const [priceMax] = useState(200);
  const [price, setPrice] = useState<[number, number]>([0, 200]);
  const [labs, setLabs] = useState<string[]>([]);
  const [cats, setCats] = useState<string[]>(initialCat ? [initialCat] : []);
  const [types, setTypes] = useState<string[]>([]);
  const [presc, setPresc] = useState<string>("todos");
  const [inStock, setInStock] = useState(false);
  const [sort, setSort] = useState(onlyPromo ? "desconto" : "relevancia");
  const [term] = useState(initialQ ?? "");

  const filtered = useMemo(() => {
    let list: Product[] = PRODUCTS.slice();
    if (onlyPromo) list = list.filter((p) => p.originalPrice);
    if (term) {
      const t = term.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(t) || p.lab.toLowerCase().includes(t),
      );
    }
    if (labs.length) list = list.filter((p) => labs.includes(p.lab));
    if (cats.length) list = list.filter((p) => cats.includes(p.category));
    if (types.length) list = list.filter((p) => types.includes(p.type));
    if (presc !== "todos") list = list.filter((p) => p.prescription === presc);
    if (inStock) list = list.filter((p) => p.stock > 0);
    list = list.filter((p) => p.pricePerBox >= price[0] && p.pricePerBox <= price[1]);
    switch (sort) {
      case "menor": list.sort((a, b) => a.pricePerBox - b.pricePerBox); break;
      case "maior": list.sort((a, b) => b.pricePerBox - a.pricePerBox); break;
      case "vendidos": list.sort((a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller)); break;
      case "novidades": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      case "desconto": list.sort(
        (a, b) =>
          ((b.originalPrice ?? b.pricePerBox) - b.pricePerBox) / (b.originalPrice ?? 1) -
          ((a.originalPrice ?? a.pricePerBox) - a.pricePerBox) / (a.originalPrice ?? 1),
      ); break;
    }
    return list;
  }, [term, labs, cats, types, presc, inStock, price, sort, onlyPromo]);

  const toggle = (arr: string[], v: string, set: (a: string[]) => void) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const Filters = (
    <div className="space-y-6">
      <FilterBlock title="Preço por caixa">
        <Slider
          value={price}
          onValueChange={(v) => setPrice([v[0], v[1]] as [number, number])}
          min={0}
          max={priceMax}
          step={5}
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>{brl(price[0])}</span>
          <span>{brl(price[1])}</span>
        </div>
      </FilterBlock>

      <FilterBlock title="Laboratório">
        <div className="space-y-2">
          {LABS.map((l) => (
            <label key={l.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={labs.includes(l.name)}
                onCheckedChange={() => toggle(labs, l.name, setLabs)}
              />
              {l.name}
            </label>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Categoria">
        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
          {CATEGORIES.map((c) => (
            <label key={c.slug} className="flex items-center gap-2 text-sm cursor-pointer">
              <Checkbox
                checked={cats.includes(c.slug)}
                onCheckedChange={() => toggle(cats, c.slug, setCats)}
              />
              {c.name}
            </label>
          ))}
        </div>
      </FilterBlock>

      <FilterBlock title="Tipo">
        {["Genérico", "Similar", "Referência"].map((t) => (
          <label key={t} className="flex items-center gap-2 text-sm cursor-pointer">
            <Checkbox
              checked={types.includes(t)}
              onCheckedChange={() => toggle(types, t, setTypes)}
            />
            {t}
          </label>
        ))}
      </FilterBlock>

      <FilterBlock title="Prescrição">
        <RadioGroup value={presc} onValueChange={setPresc}>
          {[
            ["todos", "Todos"],
            ["Livre", "Venda livre"],
            ["Prescrição", "Com prescrição"],
            ["Controlado", "Controlado"],
          ].map(([v, l]) => (
            <label key={v} className="flex items-center gap-2 text-sm cursor-pointer">
              <RadioGroupItem value={v} id={`p-${v}`} />
              <Label htmlFor={`p-${v}`} className="font-normal cursor-pointer">
                {l}
              </Label>
            </label>
          ))}
        </RadioGroup>
      </FilterBlock>

      <FilterBlock title="Disponibilidade">
        <label className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox checked={inStock} onCheckedChange={(v) => setInStock(!!v)} />
          Somente em estoque
        </label>
      </FilterBlock>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"} encontrados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden gap-2">
                <SlidersHorizontal className="h-4 w-4" /> Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[85%] sm:w-96 overflow-y-auto">
              <SheetHeader><SheetTitle>Filtros</SheetTitle></SheetHeader>
              <div className="mt-6">{Filters}</div>
            </SheetContent>
          </Sheet>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {onlyPromo && <SelectItem value="desconto">Maior desconto</SelectItem>}
              {SORTS.map((s) => (
                <SelectItem key={s.v} value={s.v}>{s.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">{Filters}</aside>

        <div>
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border p-12 text-center">
              <div className="mx-auto h-14 w-14 grid place-items-center rounded-full bg-secondary">
                <PackageSearch className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="mt-4 font-semibold">Nenhum produto encontrado</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Ajuste os filtros ou tente outra busca.
              </p>
            </div>
          ) : (
            <div className="grid gap-4 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}
