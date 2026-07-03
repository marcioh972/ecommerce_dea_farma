import { createFileRoute } from "@tanstack/react-router";
import { Catalog } from "./produtos";

export const Route = createFileRoute("/promocoes")({
  head: () => ({
    meta: [
      { title: "Promoções — DeA Farma" },
      { name: "description", content: "Produtos com desconto ativo para farmácias e clínicas." },
      { property: "og:title", content: "Promoções da Semana — DeA Farma" },
      { property: "og:description", content: "Ofertas exclusivas B2B em medicamentos e dermocosméticos." },
    ],
  }),
  component: () => <Catalog onlyPromo title="Promoções da semana" />,
});
