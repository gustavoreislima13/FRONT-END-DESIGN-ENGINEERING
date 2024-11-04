"use client";

import { TipoAgendamento } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadAgendamento() {
    const navigate = useRouter();

    const [agendamento, setAgendamento] = useState<TipoAgendamento>({
        "id_agendamento": 0.0,
        "data_agenda": "",
        "tipo_servico": "",
        "status": "",
        "clientes_cpf":"",
        "veiculos_placa":"",
    });

    const handleChange = (evento: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evento.target;
        setAgendamento({ ...agendamento, [name]: value });
    };

    const handleSubmit = async (evento: React.FormEvent<HTMLFormElement>) => {
        evento.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/guardianshields/agendamento", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendamento),
            });

            if (response.ok) {
                alert("Agendamento cadastrado com sucesso.");
                setAgendamento({
                "id_agendamento": 0.0,
                "data_agenda": "",
                "tipo_servico": "",
                "status": "",
                "clientes_cpf":"",
                "veiculos_placa":"",
                });
                navigate.push('/global-solution');
            }
        } catch (error) {
            console.error("Falha ao realizar agendamento: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">Editar agendamento</h1>
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="idData" className="block text-sm font-medium mb-1">data:</label>
                    <input
                        type="date"
                        name="data_agenda"
                        id="idData"
                        value={agendamento.data_agenda}
                        onChange={(evento) =>handleChange(evento)}
                        placeholder="data"
                        required
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div>
                    <label htmlFor="idServico" className="block text-sm font-medium mb-1">Tipo de Serviço:</label>
                    <input
                        type="text"
                        name="tipo_servico"
                        id="idServico"
                        value={agendamento.tipo_servico}
                        onChange={(evento) =>handleChange(evento)}
                        placeholder="Digite o nome completo"
                        required
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div>
                    <label htmlFor="idTStatus" className="block text-sm font-medium mb-1">Status:</label>
                    <input
                        type="text"
                        name="status"
                        id="idStatus"
                        value={agendamento.status}
                        onChange={(evento) =>handleChange(evento)}
                        placeholder="Digite o seu telefone"
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div>
                    <label htmlFor="idCpf" className="block text-sm font-medium mb-1">Cpf Cliente:</label>
                    <input
                        type="text"
                        name="clientes_cpf"
                        id="idCpf"
                        value={agendamento.clientes_cpf}
                        onChange={(evento) =>handleChange(evento)}
                        placeholder="Digite o cpf do cliente"
                        required
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div>
                    <label htmlFor="idPlaca" className="block text-sm font-medium mb-1">Placa do veiculo:</label>
                    <input
                        type="text"
                        name="veiculos_placa"
                        id="idPlaca"
                        value={agendamento.veiculos_placa}
                        onChange={(evento) =>handleChange(evento)}
                        placeholder="Digite o veiculo"
                        className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                </div>
                <div>
                    <button
                        type="submit"
                        className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
                    >
                        Agendar
                    </button>
                </div>
            </form>
        </div>
    </div>
    
    );
}
