export class DadosChecklist {

    local: string;
    periodo_inicio: string;
    periodo_fim: string;
    equipamento: string;
    modelo: string;
    fabricante: string;
    operador: string;
    inspetor: string;
}

export class Checklist {
    nomeChecklist: string;
}

export class ChecklistDTO{
    cabecalhoChecklist: DadosChecklist;
    checklists: Checklist[];
}
