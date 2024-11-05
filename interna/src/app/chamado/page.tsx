"use client"

import { TipoChamado } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react"
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";


export default function Chamado() {

    const [chamado, setChamado] = useState<TipoChamado[]>([]);

    const chamadaApiJava = async () => {
        const response = await fetch("http://localhost:8080/guardianshields/chamado");
        const data = await response.json();
        setChamado(data);
    };
    
    useEffect(() => {
        chamadaApiJava();
    }, []);
    
    const handleDelete = async (id_chamado: number) => {
        try {
            const response = await fetch(`http://localhost:8080/guardianshields/clientes/${id_chamado}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("chamado excluído com sucesso.");
                chamadaApiJava();
            } else {
                console.error("Erro ao excluir o chamado.");
            }
        } catch (error) {
            console.error("Falha ao remover o chamado: ", error);
        }
    };
    
    
return (
    <div>
        <h1>chamados</h1>
        <table className="tabelaProd">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Descrição</th>
                    <th>tipo de serviço</th>
                    <th>data</th>
                    <th>cpf cliente</th>
                    <th>Editar | Excluir</th>
                </tr>
            </thead>
            <tbody>
                {chamado.map( r=>(
                    <tr key={r.id_chamado}>
                        <td>{r.id_chamado}</td>
                        <td>{r.descricao}</td>
                        <td>{r.tipo_servico}</td>
                        <td>{r.data_chamado}</td>
                        <td>{r.clientes_cpf}</td>
                        <td><Link href={`/chamado/[id]/${r.id_chamado}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(r.id_chamado)}> <Excluir className="inline text-3xl"/></Link> </td>
                    </tr>                    
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        Quantidade de chamados: {chamado.length}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
)
}