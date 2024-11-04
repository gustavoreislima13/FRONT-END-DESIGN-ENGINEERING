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
    "data_agenda": string;
    "tipo_servico": string;
    "status": string;
    "clientes_cpf":string;
    "veiculos_placa":string;
}

