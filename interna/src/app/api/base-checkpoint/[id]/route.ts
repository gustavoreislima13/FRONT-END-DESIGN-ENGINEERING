import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoVeiculo } from "@/types/cadastro";

//READ
export async function GET(request:Request, {params}:{params:{placa:string}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-cp.json', 'utf-8');
        
        const veiculos:TipoVeiculo[] = JSON.parse(file);

        const veiculo = veiculos.find( p => p.placa ==  params.placa);

        return NextResponse.json(veiculo);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do veiculo : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{placa:string}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-cp.json', 'utf-8');
        
        const veiculos:TipoVeiculo[] = JSON.parse(file);

        const indice = veiculos.findIndex( p => p.placa ==  params.placa);

        if(indice != -1){
            veiculos.splice(indice,1);
            
            const listaJson = JSON.stringify(veiculos);

            await fs.writeFile(process.cwd() + '/src/data/banco-cp.json', listaJson);

            return NextResponse.json({msg:"veiculo excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do veiculo : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-cp.json', 'utf-8');

        const veiculos: veiculo[] = JSON.parse(file);

        const {aluno,materia,nota,data,feedback} = await request.json();

        const indice = veiculos.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            const veiculo = {aluno,materia,nota,data,feedback} as veiculo;

            veiculo.id = params.id;

            veiculos.splice(indice,1,veiculo);
                        
            const listaJson = JSON.stringify(veiculos);

            await fs.writeFile(process.cwd() + '/src/data/banco-cp.json', listaJson);

            return NextResponse.json({msg:"veiculo atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do veiculo : " + error }, { status: 500 });
    }

}