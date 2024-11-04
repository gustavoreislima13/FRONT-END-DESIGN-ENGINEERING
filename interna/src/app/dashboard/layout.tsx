import Agendamento from "../agendamento/page";
import CadastroCliente from "../cadastro/page";
import Chamado from "../chamado/page";
import Cabecalho from "../components/Cabecalho/Cabecalho";
import Rodape from "../components/Rodape/rodape";
import Veiculo from "../veiculo/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
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
        <Veiculo/>
        <Agendamento/>
        <Chamado/>
        <CadastroCliente/>
        <Rodape/>
        </body>
    </html>
    );
}
