"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation"; 
import { TipoVeiculo } from "@/types/types";

export default function EditarVeiculo() {
    const navigate = useRouter();
    const params = useParams();
    const placa = params.placa;

    const [veiculo, setVeiculo] = useState<TipoVeiculo>({
        placa: "",
        modelo: "",
        cor: "",
        marca: "",
        clientes_cpf: "",
    });

    useEffect(() => {
        const chamadaApi = async () => {
            const response = await fetch(`http://localhost:8080/guardainshields/veiculos/${placa}`);
            const marca = await response.json();
            setVeiculo(marca);
        };
        if (placa) {
            chamadaApi();
        }
    }, [placa]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch(`http://localhost:8080/guardainshields/veiculos/${placa}`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(veiculo)
            });

            if (response.ok) {
                alert("Veiculo atualizado com sucesso!");
                setVeiculo({
                    placa: "",
                    modelo: "",
                    cor: "",
                    marca: "",
                    clientes_cpf: "",
                });
                navigate.push("/veiculo");
            }

        } catch (error) {
            console.error("Erro na atualização do veiculo...", error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">Editar veiculo</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Placa</label>
                        <input
                            type="text"
                            name="placa"
                            value={veiculo.placa}
                            onChange={(evento) => setVeiculo({ ...veiculo, placa: evento.target.value })}
                            placeholder="Digite a placa do veiculo"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">modelo</label>
                        <input
                            type="text"
                            name="modelo"
                            value={veiculo.modelo}
                            onChange={(evento) => setVeiculo({ ...veiculo, modelo: evento.target.value })}
                            placeholder="Digite a matéria da avaliação"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">cor</label>
                        <input
                            type="text"
                            name="cor"
                            value={veiculo.cor}
                            onChange={(evento) => setVeiculo({ ...veiculo, cor: evento.target.value })}
                            placeholder="Digite a cor da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">marca</label>
                        <input
                            type="text"
                            name="marca"
                            value={veiculo.marca}
                            onChange={(evento) => setVeiculo({ ...veiculo, marca: evento.target.value })}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Cpf do cliente</label>
                        <input
                            type="text"
                            name="clientes_cpf"
                            value={veiculo.clientes_cpf}
                            onChange={(evento) => setVeiculo({ ...veiculo, clientes_cpf: evento.target.value })}
                            placeholder="Digite o clientes_cpf da avaliação"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold"
                        >
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
