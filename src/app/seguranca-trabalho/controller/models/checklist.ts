export class CabecalhoChecklist {

    local: string;
    periodo_inicio: string;
    periodo_fim: string;
    equipamento: string;
    modelo: string;
    fabricante: string;
    operador: string;
    inspetor: string;
    checklists: ChecklistDTO[];
}

export class Checklist {
    id: string;
    nomeChecklist: string;
    idCabecalhoChecklist: string;
}

export class ChecklistDTO{
    id:string;
	nomeChecklist:string;
}
