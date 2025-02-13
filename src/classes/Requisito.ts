export interface RequisitoInterface {
    nome: string,
    gabarito: any,
}

export class Requisito {
    nome: string;

    constructor(nome: string) {
        this.nome = nome;
    }
}