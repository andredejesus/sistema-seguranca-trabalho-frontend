export class Colaborador {

    id: number;
    nome: string;
    data_nascimento: string;
    rg: string;
    cpf: string;
    dadosEmpresa: DadosEmpresa;
}


export class DadosEmpresa {

    id: number;
    funcao: string;
    lotacao: string;
    departamento: string;
    data_admissao: string;
    situacao: string;
}

export class FiltroColaboradorDTO {

    nome: string;
	rg: string;
	cpf: string;
	data_nascimento: string;
	data_admissao: string;
	funcao: string;
	departamento: string;
	lotacao: string;
	situacao: string;
}
