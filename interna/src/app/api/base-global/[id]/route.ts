import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { agendamentosolution } from "@/types/global";

//READ
export async function GET(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-gs.json', 'utf-8');
        
        const agendamentos:agendamentosolution[] = JSON.parse(file);

        const global = agendamentos.find( p => p.id ==  params.id);

        return NextResponse.json(global);

    } catch (error) {
        return  NextResponse.json({msg:"Falha na obtenção da GS : "+error},{status:500});
    }

}

//DELETE
export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    try {
        const file = await fs.readFile( process.cwd() + '/src/data/banco-gs.json', 'utf-8');
        
        const agendamentos:agendamentosolution[] = JSON.parse(file);

        const indice = agendamentos.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            agendamentos.splice(indice,1);
            
            const listaJson = JSON.stringify(agendamentos);

            await fs.writeFile(process.cwd() + '/src/data/banco-gs.json', listaJson);

            return NextResponse.json({msg:"GS excluída com sucesso!"});
        }

    } catch (error) {
        return NextResponse.json({msg:"Falha na exclusão da GS : "+error},{status:500})
    }

}


//UPDATE
export async function PUT(request: Request,{params}:{params:{id:number}}) {

    try {

        const file = await fs.readFile(process.cwd() + '/src/data/banco-gs.json', 'utf-8');

        const agendamentos: agendamentosolution[] = JSON.parse(file);

        const {aluno,materia,nota,data,feedback} = await request.json();

        const indice = agendamentos.findIndex( p => p.id ==  params.id);

        if(indice != -1){
            const global = {aluno,materia,nota,data,feedback} as agendamentosolution;

            global.id = params.id;

            agendamentos.splice(indice,1,global);
                        
            const listaJson = JSON.stringify(agendamentos);

            await fs.writeFile(process.cwd() + '/src/data/banco-gs.json', listaJson);

            return NextResponse.json({msg:"GS atualizada com sucesso!"});
        }

    } catch (error) {
        return  NextResponse.json({ error: "Falha na atualização da GS: " + error }, { status: 500 });
    }

}