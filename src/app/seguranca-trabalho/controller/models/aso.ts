export class Aso {

    id: number;
    colaborador: string;
    tipo_aso: string;
    data_emissao: string;
    dias_vencimento: number;
    data_vencimento: string;
    situacao:string;
}

export class Colaborador {

    id: number;
    nome: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
}

export class Exame {
    id: number;
    exame: string;
    data_exame: string;
    data_vencimento: string;
    dias_vencimento: string;
    status:string;
    id_aso: number;
}
