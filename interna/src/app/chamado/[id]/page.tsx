"use client";

import { TipoChamado } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarChamado({ params }: { params: { id_chamado: number } }) {
    
    const navigate = useRouter();
    const [chamado, setChamado] = useState<TipoChamado>({
        id_chamado: 0.0,
        descricao: "",
        tipo_servico: "",
        data_chamado: "",
        clientes_cpf: "",
});

useEffect(() => {
    const chamadaApi = async () => {
    const response = await fetch(
        `/http://localhost:8080/guardianshields/chamado${params.id_chamado}`
    );
    const data = await response.json();
    setChamado(data);
    };
    chamadaApi();
}, [params]);

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
        const response = await fetch(`/http://localhost:8080/guardianshields/chamado${params.id_chamado}`,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(chamado)            
        });

            if(response.ok){
                alert("chamado atualizado com sucesso!");
                setChamado({
                    id_chamado: 0.0,
                    descricao: "",
                    tipo_servico: "",
                    data_chamado: "",
                    clientes_cpf: "",
                });
                navigate.push("/dashboard");
            }

    } catch (error) {
        console.error("Erro na atualização do chamado...", error);
    }
}

return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-10 px-4">
    <h1 className="text-3xl md:text-4xl font-bold text-pink-400 mb-6">Editar chamado</h1>
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="idDesc" className="block text-sm font-medium mb-1">descreva seu chamado:</label>
                <input
                    type="text"
                    name="descricao"
                    id="idDesc"
                    value={chamado.descricao}
                    onChange={(e)=> setChamado({...chamado, descricao: e.target.value})}
                    placeholder="Digite a descrição do chamado"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idServico" className="block text-sm font-medium mb-1">tipo de serviço:</label>
                <input
                    type="text"
                    name="tipo_servico"
                    id="idServico"
                    value={chamado.tipo_servico}
                    onChange={(e)=> setChamado({...chamado, tipo_servico: e.target.value})}
                    placeholder="Digite o tipo de serviço"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idData" className="block text-sm font-medium mb-1">data chamado:</label>
                <input
                    type="date"
                    name="data_chamado"
                    id="idData"
                    value={chamado.data_chamado}
                    onChange={(e)=> setChamado({...chamado, data_chamado: e.target.value})}
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idCpf" className="block text-sm font-medium mb-1">CPF do cliente:</label>
                <input
                    type="text"
                    name="clientes_cpf"
                    id="idCpf"
                    value={chamado.clientes_cpf}
                    onChange={(e)=> setChamado({...chamado, clientes_cpf: e.target.value})}
                    placeholder="Digite o  cpf do cliente"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <button
                    type="submit"
                    className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition font-semibold focus:outline-none focus:ring-2 focus:ring-pink-400"
                >
                    Atualizar
                </button>
            </div>
        </form>
    </div>
</div>

);
}