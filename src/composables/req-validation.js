import Roons from './roons.js'

export default {
    ReqAreaFisica: (answerSheet, value) => {
        let feedback = null

        if (value < answerSheet) {
            feedback = 'A área física do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
        }

        return feedback
    },
    ReqLavatorio: (answerSheet, value) => {
        let feedback = null

        if (answerSheet[0] && value[0] == false) {
            feedback = 'O ambiente precisa de um lavatório'
        }

        if (answerSheet[0] && value[0]) {
            if (answerSheet[1] && value[1] == false) {
                feedback = 'É precisso que a torneira do lavatório possua um mecanismo que dispense o uso das mãos para ligar e deligar.'    
            }
        }

        return feedback
    },
    ReqVentilacao: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'A ventilação natural ou mecânica é obrigatória'
        }

        return feedback
    },
    ReqPiso: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que o piso seja feito de material impermeável'
        }

        return feedback
    },
    ReqParede: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que a parede seja feita de material impermeável'
        }

        return feedback
    },
    ReqTeto: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que o teto seja feito de material impermeável'
        }

        return feedback
    },
    ReqForro: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que o forro seja feito de material impermeável'
        }

        return feedback
    },
    ReqRodape: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que o roda-pé seja feito de material impermeável'
        }

        return feedback
    },
    ReqRalo: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ralo sinfonado com tampa escamotável'
        }

        return feedback
    },
    ReqPeDireito: (answerSheet, value) => {
        let feedback = null

        if (value < answerSheet) {
            feedback = 'É preciso que o pé-direito tenha uma altura igual ou superior a ' + answerSheet + 'm'
        }

        return feedback
    },
    ReqCubaFuda: (answerSheet, value) => {
        let feedback = null

        if (answerSheet[0] && value[0] == false) {
            feedback = 'O ambiente precisa de uma bancada com uma pia de cuba funda.'
        }

        if (answerSheet[0] && value[0]) {
            if (answerSheet[1] && value[1] == false) {
                feedback = 'É precisso que a torneira da bancada com pia de cuba funda possua um mecanismo que dispense o uso das mãos para ligar e deligar.'
            }
        }

        return feedback
    },
    ReqGasesMedicinais: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É necessário que haja a presença de gases medicinais no ambiente'
        }

        return feedback
    },
    ReqLuminaria: (answerSheet, value) => {
        let feedback = null

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
        }

        return feedback
    },
    ReqQtdAmbientes: (tamanhoEquipe, ambienteExiste, quantidadeAmbientes, idAmbiente, odontologico) => {
        let feedback = null

        if (!ambienteExiste) {
            feedback = 'O ambiente deve existir na composição de uma USF'

            if (odontologico == false) {
                console.log('passou nessa área')
                
                if (idAmbiente == Roons.ESCOVARIO) {
                    return null
                }

                if(idAmbiente == Roons.COMPRESSOR_ODONTOLOGICO) {
                    return null
                }

                if(idAmbiente == Roons.BOMBA_VACUO) {
                    return null
                }
            }

            if (idAmbiente == Roons.ESCOVARIO) {
                return null
            }

            if (idAmbiente == Roons.SALA_UTILIDADES) {
                return null
            }
        } else {
            if (tamanhoEquipe < 1) {
                feedback = 'A quantidade deste ambiente é inferior ao quantitativo necessário'   
            }

            if (idAmbiente == Roons.BANHEIRO_FUNCIONARIOS) {
                if (tamanhoEquipe >= 4 && quantidadeAmbientes < 2) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                } 
            }

            if (idAmbiente == Roons.SANITARIO_PACIENTES) {
                if (tamanhoEquipe == 2 || tamanhoEquipe == 3 && quantidadeAmbientes < 2) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }

                if (tamanhoEquipe >= 4 && quantidadeAmbientes < 4) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }
            }

            if (idAmbiente == Roons.CONSULTORIO_ODONTOLOGICO) {
                if (tamanhoEquipe == 2 && quantidadeAmbientes < 2) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }

                if (tamanhoEquipe == 3 && quantidadeAmbientes < 3) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }

                if (tamanhoEquipe >= 4 && quantidadeAmbientes < 4) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }
            }

            if (idAmbiente == Roons.CONSULTORIO_MEDICO) {
                if (tamanhoEquipe == 2 || tamanhoEquipe == 3 && quantidadeAmbientes < 3) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }

                if (tamanhoEquipe == 4 && quantidadeAmbientes < 4) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }

                if (tamanhoEquipe == 5 && quantidadeAmbientes < 5) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }
            }

            if (idAmbiente == Roons.CONSULTORIO_MEDICO_SANITARIO) {
                if (tamanhoEquipe == 3 && quantidadeAmbientes < 2) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }

                if (tamanhoEquipe == 4 || tamanhoEquipe == 5 && quantidadeAmbientes < 3) {
                    feedback = 'O quantitativo deste ambiente é menor do que o esperado para o número de equipes desta USF'
                }
            }
        }

        return feedback
    }
}