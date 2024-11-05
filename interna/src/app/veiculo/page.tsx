"use client"

import { TipoVeiculo } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react"
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";


export default function Veiculo() {

    const [veiculos, setVeiculos] = useState<TipoVeiculo[]>([]);

    const chamadaApiJava = async () => {
        const response = await fetch("http://localhost:8080/guardianshields/veiculos");
        const data = await response.json();
        setVeiculos(data);
    };
    
    useEffect(() => {
        chamadaApiJava();
    }, []);
    
    const handleDelete = async (placa: string) => {
        try {
            const response = await fetch(`http://localhost:8080/guardianshields/veiculos/${placa}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Veiculo excluído com sucesso.");
                chamadaApiJava();
            } else {
                console.error("Erro ao excluir o veiculo.");
            }
        } catch (error) {
            console.error("Falha ao remover o veiculo: ", error);
        }
    };
    
    
return (
    <div>
        <h1>veiculos</h1>
        <table className="tabelaProd">
            <thead>
                <tr>
                    <th>placa</th>
                    <th>modelo</th>
                    <th>cor</th>
                    <th>marca</th>
                    <th>Cpf do cliente</th>
                    <th>Editar | Excluir</th>
                </tr>
            </thead>
            <tbody>
                {veiculos.map( r=>(
                    <tr key={r.placa}>
                        <td>{r.modelo}</td>
                        <td>{r.cor}</td>
                        <td>{r.marca}</td>
                        <td>{r.clientes_cpf}</td>
                        <td><Link href={`/veiculo/[id]/${r.placa}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(r.placa)}> <Excluir className="inline text-3xl"/></Link> </td>
                    </tr>                    
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        Quantidade de veiculos: {veiculos.length}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
)
}