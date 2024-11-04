"use client"

import { TipoAgendamento } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react"
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";


export default function Agendamento() {

    const [agendamentos, setAgendamentos] = useState<TipoAgendamento[]>([]);

    const chamadaApiJava = async () => {
        const response = await fetch("http://localhost:8080/guardianshields/agendamento");
        const data = await response.json();
        setAgendamentos(data);
    };
    
    useEffect(() => {
        chamadaApiJava();
    }, []);
    
    const handleDelete = async (id_agendamento: number) => {
        try {
            const response = await fetch(`http://localhost:8080/guardianshields/clientes/${id_agendamento}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("agendamento excluído com sucesso.");
                chamadaApiJava();
            } else {
                console.error("Erro ao excluir o agendamento.");
            }
        } catch (error) {
            console.error("Falha ao remover o agendamento: ", error);
        }
    };
    
    
return (
    <div>
        <h1>agendamentos</h1>
        <table className="tabelaProd">
            <thead>
                <tr>
                    <th>id agendamento</th>
                    <th>data do agendamento</th>
                    <th>tipo de serviço</th>
                    <th>status</th>
                    <th>cpf cliente</th>
                    <th>placa do veiculo</th>
                    <th>Editar | Excluir</th>
                </tr>
            </thead>
            <tbody>
                {agendamentos.map( r=>(
                    <tr key={r.id_agendamento}>
                        <td>{r.id_agendamento}</td>
                        <td>{r.data_agenda}</td>
                        <td>{r.tipo_servico}</td>
                        <td>{r.status}</td>
                        <td>{r.clientes_cpf}</td>
                        <td>{r.veiculos_placa}</td>
                        <td><Link href={`/produtos/${r.id_agendamento}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(r.id_agendamento)}> <Excluir className="inline text-3xl"/></Link> </td>
                    </tr>                    
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        Quantidade de agendamentos: {agendamentos.length}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
)
}