export type TipoCadastro =	{
    "cpf": string;
    "nome": string;
    "telefone": number;
    "email": string;
    "senha": string;
}

export type TipoVeiculo = {
    "placa": string;
    "modelo": string;
    "cor": string;
    "marca": string;
    "clientes_cpf": string;
}

export type TipoAgendamento = {
    "id_agendamento": number;
    "data_agenda": Date;
    "tipo_servico": string,
    
}