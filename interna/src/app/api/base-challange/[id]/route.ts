import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoCadastro } from "@/types/cadastro";

//READ
export async function GET(request:Request, {params}:{params:{cpf:string}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco.json', 'utf-8');
        
        const cadastros:TipoCadastro[] = JSON.parse(file);

        const cadastro = cadastros.find( p => p.cpf ==  params.cpf);

        return NextResponse.json(cadastro);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção do cadastro : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{cpf:string}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco.json', 'utf-8');
        
        const cadastros:TipoCadastro[] = JSON.parse(file);

        const indice = cadastros.findIndex( p => p.cpf ==  params.cpf);

        if(indice != -1){
            cadastros.splice(indice,1);
            
            const listaJson = JSON.stringify(cadastros);

            await fs.writeFile(process.cwd() + '/src/data/banco.json', listaJson);

            return NextResponse.json({msg:"Cadastro excluído com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão do Cadastro : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{cpf:string}}) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco.json', 'utf-8');

        const cadastros: TipoCadastro[] = JSON.parse(file);

        const {cpf, nome, telefone, email, senha} = await request.json();

        const indice = cadastros.findIndex( p => p.cpf ==  params.cpf);

        if(indice != -1){
            const cadastro = {cpf, nome, telefone, email, senha} as TipoCadastro;

            cadastro.cpf = params.cpf;

            cadastros.splice(indice,1,cadastro);
                        
            const listaJson = JSON.stringify(cadastros);

            await fs.writeFile(process.cwd() + '/src/data/banco.json', listaJson);

            return NextResponse.json({msg:"Cadastro atualizado com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização do cadastro : " + error }, { status: 500 });
    }

}