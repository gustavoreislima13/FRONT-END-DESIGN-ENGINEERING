import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoVeiculo } from "@/types/cadastro";


//READ ALL
export async function GET() {

    try {
        const file = await fs.readFile(process.cwd() + '/src/data/banco-cp.json', 'utf-8');

        const veiculos:TipoVeiculo[] = JSON.parse(file);

        return NextResponse.json(veiculos);

    } catch (error) {
        return NextResponse.json({ error: "Falha na obtenção da lista de veiculos : " + error }, { status: 500 });
    }

}

//CREATE
export async function POST(request: Request) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-cp.json', 'utf-8');

        const veiculos: TipoVeiculo[] = JSON.parse(file);

        const {placa, modelo, cor, marca, clientes_cpf} = await request.json();
        const veiculo = {placa, modelo, cor, marca, clientes_cpf} as TipoVeiculo;

        veiculos.push(veiculo);

        const listaJson = JSON.stringify(veiculos);

        await fs.writeFile(process.cwd() + '/src/data/banco-cp.json', listaJson);

        return NextResponse.json(veiculo, { status: 201 });

    } catch (error) {
        return  NextResponse.json({ error: "Falha na inserção do veiculo : " + error }, { status: 500 });
    }

}