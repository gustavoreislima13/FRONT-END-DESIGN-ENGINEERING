import Agendamento from "../agendamento/page";
import CadastroCliente from "../cadastro/page";
import Chamado from "../chamado/page";
import Cabecalho from "../components/Cabecalho/Cabecalho";
import Rodape from "../components/Rodape/rodape";
import Veiculo from "../veiculo/page";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
    description: "Dashboard de Clientes",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="pt-br">
            <body className="bg-gray-900 text-white flex flex-col min-h-screen">
                {/* Cabeçalho */}
                <Cabecalho />
                
                {/* Container Principal */}
                <div className="flex flex-1">
                    {/* Sidebar */}
                    <aside className="w-64 bg-gray-800 p-6">
                        <h2 className="text-2xl font-bold mb-8">Menu</h2>
                        <ul className="space-y-4">
                            <li>
                                <a href="/veiculo/cad-veiculo" className="text-pink-400 hover:underline">Veículos</a>
                            </li>
                            <li>
                                <a href="/agendamento/page" className="text-pink-400 hover:underline">Agendamentos</a>
                            </li>
                            <li>
                                <a href="/chamado/cad-chamado" className="text-pink-400 hover:underline">Chamados</a>
                            </li>
                            <li>
                                <a href="/cadastro/cad-cadastro" className="text-pink-400 hover:underline">Cadastro de Clientes</a>
                            </li>
                        </ul>
                    </aside>

                    {/* Conteúdo Principal */}
                    <main className="flex-1 p-8 space-y-6">
                        {children}

                        <section id="veiculo" className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Veículos</h2>
                            <Veiculo />
                        </section>

                        <section id="agendamento" className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Agendamentos</h2>
                            <Agendamento />
                        </section>

                        <section id="chamado" className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Chamados</h2>
                            <Chamado />
                        </section>

                        <section id="cadastro-cliente" className="bg-gray-800 p-6 rounded-lg shadow-lg">
                            <h2 className="text-xl font-semibold mb-4">Cadastro de Clientes</h2>
                            <CadastroCliente />
                        </section>
                    </main>
                </div>

                {/* Rodapé */}
                <Rodape />
            </body>
        </html>
    );
}
