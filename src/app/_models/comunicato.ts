export class Comunicato {

    //id: number;
    utente_id: number;
    committente_id: number;
    conferenza_id: number;
    ufficio_pr_id: number;
    abstract:string;
    //committente:string;
    data_scadenza: number;
    flag_pubblico: number;
    lingua_id:number;
    pubblico_dal: string;
    referente: string;
    //titolo:string;
    telefono: string;
    www: string;

    constructor(
        public id:number,
        public titolo:string,
        public committente: string,
        public arg_id: number[],
    ){}
}