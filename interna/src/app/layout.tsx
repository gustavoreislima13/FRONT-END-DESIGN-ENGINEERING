import "./globals.css";
import type { Metadata } from "next";
import Cabecalho from "./components/Cabecalho/Cabecalho";
import Rodape from "./components/Rodape/rodape";
import Cadastro from "./cadastro/cad-cadastro/page";

export const metadata: Metadata = {
  title: "Porto",
  description: "dashboard de clientes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
      >
        <Cabecalho/>
        {children}
        <Cadastro/>
        <Rodape/>
      </body>
    </html>
  );
}
