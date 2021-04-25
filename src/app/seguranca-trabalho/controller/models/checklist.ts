export class DadosChecklist {

    local: string;
    periodo_inicio: string;
    periodo_fim: string;
    equipamento: string;
    modelo: string;
    fabricante: string;
    operador: string;
    inspetor: string;
    checklists: Checklist[];
}

export class Checklist {
    nomeChecklist: string;
}
