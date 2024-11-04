"use client"

import { TipoCadastro } from "@/types/cadastro";
import { useEffect, useState } from "react"


export default function CadastroCliente() {
    const [cadastros, setCadastros] = useState<TipoCadastro[]>([]);
    useEffect(() => {
        const chamadaApiJava = async ()=>{
            const response = await fetch("http://localhost:8080/guardianshields/clientes");
            const data = await response.json();
            setCadastros(data);
        }
        chamadaApiJava();
    }, [])
    
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
                        <td>Editar|Excluir</td>
                    </tr>                    
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan={6}>
                        Quantidade de remédios : {cadastros.length}
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
)
}