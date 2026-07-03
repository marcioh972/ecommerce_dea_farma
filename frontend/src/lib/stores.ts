import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./mock/catalog";

// --- Cart ---
export type CartItem = { product: Product; qty: number };

type CartState = {
  items: CartItem[];
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (p: Product, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,
      setOpen: (v) => set({ open: v }),
      add: (p, qty = 1) => {
        const items = [...get().items];
        const i = items.findIndex((x) => x.product.id === p.id);
        if (i >= 0) items[i] = { ...items[i], qty: items[i].qty + qty };
        else items.push({ product: p, qty });
        set({ items, open: true });
      },
      remove: (id) => set({ items: get().items.filter((i) => i.product.id !== id) }),
      setQty: (id, qty) =>
        set({
          items: get()
            .items.map((i) => (i.product.id === id ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        }),
      clear: () => set({ items: [] }),
      count: () => get().items.reduce((s, i) => s + i.qty, 0),
      subtotal: () =>
        get().items.reduce((s, i) => s + i.qty * i.product.pricePerBox, 0),
    }),
    { name: "dea-cart" },
  ),
);

// --- Account (mock) ---
export type AccountStatus = "guest" | "pending" | "approved" | "rejected";

type AccountState = {
  status: AccountStatus;
  company: string | null;
  email: string | null;
  login: (opts: { company: string; email: string; status?: AccountStatus }) => void;
  logout: () => void;
  setStatus: (s: AccountStatus) => void;
};

export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      status: "guest",
      company: null,
      email: null,
      login: ({ company, email, status = "approved" }) =>
        set({ company, email, status }),
      logout: () => set({ status: "guest", company: null, email: null }),
      setStatus: (s) => set({ status: s }),
    }),
    { name: "dea-account" },
  ),
);
