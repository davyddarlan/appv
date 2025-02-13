import { RequisitoInterface } from "./Requisito";

export interface AmbienteInterface {
    nome: string,
    requisitos: Array<RequisitoInterface>
    ambientes: Array<AmbienteInterface>
    setRequisito: Function,
    setAmbiente: Function,
}

export class Ambiente {
    nome: string;
    requisitos: Array<RequisitoInterface>
    ambientes: Array<AmbienteInterface>

    constructor(nome: string) {
        this.nome = nome;
        this.requisitos = [];
        this.ambientes = [];
    }

    setRequisito(requisito: RequisitoInterface): void {
        this.requisitos.push(requisito);
    }

    setAmbiente(ambiente: AmbienteInterface): void {
        this.ambientes.push(ambiente);
    }
}