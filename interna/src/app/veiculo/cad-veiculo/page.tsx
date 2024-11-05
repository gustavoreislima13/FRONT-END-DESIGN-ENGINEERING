"use client";

import { TipoVeiculo } from "@/types/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CadVeiculo() {
    const navigate = useRouter();
    const [veiculo, setVeiculo] = useState<TipoVeiculo>({
        placa: "",
        modelo: "",
        cor: "",
        marca: "",
        clientes_cpf: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setVeiculo({ ...veiculo, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/guardianshields/veiculos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(veiculo),
            });

            if (response.ok) {
                alert("Veículo cadastrado com sucesso.");
                setVeiculo({
                    placa: "",
                    modelo: "",
                    cor: "",
                    marca: "",
                    clientes_cpf: "",
                });
                navigate.push('/dashboard');
            }
        } catch (error) {
            console.error("Falha ao cadastrar veículo: ", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
            <h1 className="text-3xl font-bold text-blue-400 mb-6">Cadastrar veículos</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Placa</label>
                        <input
                            type="text"
                            name="placa"
                            value={veiculo.placa}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite a placa do veículo"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Modelo</label>
                        <input
                            type="text"
                            name="modelo"
                            value={veiculo.modelo}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite o modelo do veículo"
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Cor</label>
                        <input
                            type="text"
                            name="cor"
                            value={veiculo.cor}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite a cor do veículo"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Marca</label>
                        <input
                            type="text"
                            name="marca"
                            value={veiculo.marca}
                            onChange={(evento) => handleChange(evento)}
                            required
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">CPF do cliente</label>
                        <input
                            type="text"
                            name="clientes_cpf"
                            value={veiculo.clientes_cpf}
                            onChange={(evento) => handleChange(evento)}
                            placeholder="Digite o CPF do cliente"
                            className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition font-semibold"
                        >
                            Cadastrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
