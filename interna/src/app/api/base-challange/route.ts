import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCadastro } from "@/types/cadastro";


//READ ALL
export async function GET() {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/banco.json', 'utf-8');

        const cadastros:TipoCadastro[] = JSON.parse(file);

        return NextResponse.json(cadastros);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de cadastros : " + error }, { status: 500 });
    }
}

//CREATE
export async function POST(request: Request) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco.json', 'utf-8');

        const cadastros: TipoCadastro[] = JSON.parse(file);

        const {cpf, nome, telefone, email, senha} = await request.json();
        const cadastro = {cpf, nome, telefone, email, senha} as TipoCadastro;

        cadastro.cpf = cpf;

        cadastros.push(cadastro);

        const listaJson = JSON.stringify(cadastros);

        await fs.writeFile(process.cwd() + '/src/data/banco.json', listaJson);

        return NextResponse.json(cadastro, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção do Cadastro : " + error }, { status: 500 });
    }

}