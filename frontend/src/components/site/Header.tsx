import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { Search, ShoppingCart, User, Menu, X, LogOut, Package, Building2 } from "lucide-react";
import logoAsset from "@/assets/logotipo.png?url";
import { PRODUCTS } from "@/lib/mock/catalog";
import { useCart, useAccount } from "@/lib/stores";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function Header() {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [q, setQ] = useState("");
  const [focus, setFocus] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const count = useCart((s) => s.count());
  const setCartOpen = useCart((s) => s.setOpen);
  const account = useAccount();

  useEffect(() => setMobileOpen(false), [pathname]);

  const suggestions = useMemo(() => {
    if (!q.trim()) return [];
    const term = q.toLowerCase();
    return PRODUCTS.filter(
      (p) => p.name.toLowerCase().includes(term) || p.lab.toLowerCase().includes(term),
    ).slice(0, 6);
  }, [q]);

  const submit = () => {
    navigate({ to: "/produtos", search: { q } as never });
    setFocus(false);
  };

  const navLink = (to: string, label: string) => (
    <Link
      to={to}
      className={`text-sm font-medium transition-colors hover:text-primary ${
        pathname === to ? "text-primary" : "text-foreground/80"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 md:h-20 md:gap-6">
        <Link to="/" className="shrink-0" aria-label="DeA Farma — Início">
          <img src={logoAsset} alt="DeA Farma" className="h-8 md:h-10 w-auto" />
        </Link>

        <nav className="hidden lg:flex items-center gap-6 pl-2">
          {navLink("/", "Início")}
          {navLink("/produtos", "Produtos")}
          {navLink("/promocoes", "Promoções")}
        </nav>

        <div className="relative flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setTimeout(() => setFocus(false), 150)}
              onKeyDown={(e) => e.key === "Enter" && submit()}
              placeholder="Buscar produtos, laboratórios, princípios ativos..."
              className="pl-9 h-10 md:h-11 rounded-full bg-secondary border-transparent focus-visible:bg-background"
            />
          </div>
          {focus && suggestions.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-border bg-popover shadow-lg overflow-hidden z-50">
              {suggestions.map((s) => (
                <button
                  key={s.id}
                  onMouseDown={() => {
                    navigate({ to: "/produtos", search: { q: s.name } as never });
                  }}
                  className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-accent"
                >
                  <img src={s.image} alt="" className="h-9 w-9 rounded object-cover" />
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.lab}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <button
            onClick={() => setCartOpen(true)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent transition-colors"
            aria-label="Abrir carrinho"
          >
            <ShoppingCart className="h-5 w-5" />
            {count > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 min-w-5 rounded-full bg-promo px-1 text-[10px] text-promo-foreground">
                {count}
              </Badge>
            )}
          </button>

          {account.status === "guest" ? (
            <div className="hidden md:flex items-center gap-2">
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Entrar</Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/cadastro">Cadastrar</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="hidden md:inline-flex gap-2">
                  <User className="h-4 w-4" />
                  <span className="max-w-[140px] truncate">{account.company}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="text-xs text-muted-foreground">Conectado como</div>
                  <div className="truncate font-medium">{account.company}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Package className="mr-2 h-4 w-4" /> Meus pedidos
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Building2 className="mr-2 h-4 w-4" /> Meus dados
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => account.logout()}>
                  <LogOut className="mr-2 h-4 w-4" /> Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-3 flex flex-col gap-1">
            <Link to="/" className="py-2 text-sm font-medium">Início</Link>
            <Link to="/produtos" className="py-2 text-sm font-medium">Produtos</Link>
            <Link to="/promocoes" className="py-2 text-sm font-medium">Promoções</Link>
            <div className="h-px bg-border my-2" />
            {account.status === "guest" ? (
              <div className="flex gap-2">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/login">Entrar</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/cadastro">Cadastrar</Link>
                </Button>
              </div>
            ) : (
              <>
                <div className="py-2 text-sm text-muted-foreground">{account.company}</div>
                <Link to="/produtos" className="py-2 text-sm">Meus pedidos</Link>
                <Link to="/produtos" className="py-2 text-sm">Meus dados</Link>
                <button
                  onClick={() => account.logout()}
                  className="py-2 text-left text-sm text-destructive"
                >
                  Sair
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
