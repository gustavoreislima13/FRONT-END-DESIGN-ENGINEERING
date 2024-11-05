"use client"

import { TipoCadastro } from "@/types/types";
import Link from "next/link";
import { useEffect, useState } from "react"
import { GrEdit as Editar } from "react-icons/gr";
import { RiDeleteBin2Line as Excluir } from "react-icons/ri";


export default function CadastroCliente() {

    const [cadastros, setCadastros] = useState<TipoCadastro[]>([]);

    const chamadaApiJava = async () => {
        const response = await fetch("http://localhost:8080/guardianshields/cliens");
        const data = await response.json();
        setCadastros(data);
    };
    
    useEffect(() => {
        chamadaApiJava();
    }, []);
    
    const handleDelete = async (cpf: string) => {
        try {
            const response = await fetch(`http://localhost:8080/guardianshields/clientes/${cpf}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert("Produto excluído com sucesso.");
                chamadaApiJava();
            } else {
                console.error("Erro ao excluir o produto.");
            }
        } catch (error) {
            console.error("Falha ao remover o produto: ", error);
        }
    };
    
    
return (
    <div>
        <h1>Cadastros</h1>
        <table className="tabelaProd">
            <thead>
                <tr>
                    <th>cpf</th>
                    <th>nome</th>
                    <th>numero</th>
                    <th>email</th>
                    <th>Editar | Excluir</th>
                </tr>
            </thead>
            <tbody>
                {cadastros.map( r=>(
                    <tr key={r.cpf}>
                        <td>{r.nome}</td>
                        <td>{r.telefone}</td>
                        <td>{r.email}</td>
                        <td><Link href={`/cadastro/[id]/${r.cpf}`}><Editar className="inline text-3xl"/></Link> | 
                        <Link href="#" onClick={()=> handleDelete(r.cpf)}> <Excluir className="inline text-3xl"/></Link> </td>
                    </tr>                    
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        Quantidade de cadastro : {cadastros.length}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
)
}