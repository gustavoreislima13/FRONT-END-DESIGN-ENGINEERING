"use client";

import { TipoVeiculo } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditarVeiculo({ params }: { params: { placa: string } }) {
    
    const navigate = useRouter();
    const [veiculo, setVeiculo] = useState<TipoVeiculo>({
        "placa": "",
        "modelo": "",
        "cor": "",
        "marca": "",
        "clientes_cpf": "",
});

useEffect(() => {
    const chamadaApi = async () => {
    const response = await fetch(
        `/http://localhost:8080/guardianshields/veiculos${params.placa}`
    );
    const data = await response.json();
    setVeiculo(data);
    };
    chamadaApi();
}, [params]);

const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();

    try {
        const response = await fetch(`/http://localhost:8080/guardianshields/veiculo${params.placa}`,{
            method: 'PUT',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(veiculo)            
        });

            if(response.ok){
                alert("veiculo atualizado com sucesso!");
                setVeiculo({
                    "placa": "",
                    "modelo": "",
                    "cor": "",
                    "marca": "",
                    "clientes_cpf": "",
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="idPlaca" className="block text-sm font-medium mb-1">placa:</label>
                <input
                    type="text"
                    name="placa"
                    id="idPlaca"
                    value={veiculo.placa}
                    onChange={(e)=> setVeiculo({...veiculo, placa: e.target.value})}
                    placeholder="Digite a placa do veiculo"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idNome" className="block text-sm font-medium mb-1">modelo:</label>
                <input
                    type="text"
                    name="modelo"
                    id="idModelo"
                    value={veiculo.modelo}
                    onChange={(e)=> setVeiculo({...veiculo, modelo: e.target.value})}
                    placeholder="Digite o modelo do veiculo"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idTel" className="block text-sm font-medium mb-1">cor:</label>
                <input
                    type="text"
                    name="cor"
                    id="idCor"
                    value={veiculo.cor}
                    onChange={(e)=> setVeiculo({...veiculo, cor: e.target.value})}
                    placeholder="Digite a cor do veiculo"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idEmail" className="block text-sm font-medium mb-1">marca:</label>
                <input
                    type="text"
                    name="marca"
                    id="idMarca"
                    value={veiculo.marca}
                    onChange={(e)=> setVeiculo({...veiculo, marca: e.target.value})}
                    placeholder="Digite a marca do veiculo"
                    required
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
            </div>
            <div>
                <label htmlFor="idSenha" className="block text-sm font-medium mb-1">CPF do cliente:</label>
                <input
                    type="text"
                    name="clientes_cpf"
                    id="idCpf"
                    value={veiculo.clientes_cpf}
                    onChange={(e)=> setVeiculo({...veiculo, clientes_cpf: e.target.value})}
                    placeholder="Digite a senha com até 6 digitos"
                    className="w-full px-4 py-2 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
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