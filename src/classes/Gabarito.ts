import { Ambiente, AmbienteInterface } from './Ambiente';

// ambientes

const AmbienteA: AmbienteInterface = new Ambiente('Ambiente A');
const AmbienteB: AmbienteInterface = new Ambiente('Ambiente B');
const AmbienteC: AmbienteInterface = new Ambiente('Ambiente C');
const AmbienteD: AmbienteInterface = new Ambiente('Ambiente D');
const AmbienteE: AmbienteInterface = new Ambiente('Ambiente E');

AmbienteC.setAmbiente(AmbienteD);
AmbienteC.setAmbiente(AmbienteE);

export const Gabarito = {
    list: [
        AmbienteA,
        AmbienteB,
        AmbienteC,
    ]
}