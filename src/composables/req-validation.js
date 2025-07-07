import Roons from './roons.js'

export default {
    ReqAreaFisica: (answerSheet, value) => {
        let feedback = null

        if (value < answerSheet) {
            feedback = 'A área física do ambiente deve ser maior ou igual a ' + answerSheet + 'm²'
        }

        return feedback
    },
    ReqLavatorio: (answerSheet, value) => {
        let feedback = null

        if (answerSheet[0] == false && value[0]) {
            feedback = 'Embora este ambiente possua lavatório, ele não é necessário.'

            if (answerSheet[1] == false && value[1]) {
                feedback += ' Além disso, não é precisso que se utilize torneiras que dispensem o uso das mãos.'
            }
        }

        if (answerSheet[0] && value[0] == false) {
            feedback = 'O ambiente precisa de um lavatório'

            if (answerSheet[1] && value[1] == false) {
                feedback += ' e também necessita de uma torneira que dispense o uso das mãos para ligas e deligar.'
            }

            if (answerSheet[1] == false && value[1]) {
                feedback += ', mas descarta o uso de torneiras que dispensam o uso das mãos para ligar e desligar.'
            }
        }

        return feedback
    },
    ReqAutomacaoTorneira: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'O uso da torneira que dispense o uso das mãos para ligar ou desligar é obrigatório'
            } else {
                feedback = 'O uso da torneira que dispense o uso das mãos para ligar ou desligar não é obrigatório'
            }
        }

        return feedback
    },
    ReqVentilacao: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'A ventilação natural ou mecânica é obrigatória'
            } else {
                feedback = 'A ventilação natural ou mecânica não é obrigatória'
            }
        }

        return feedback
    },
    ReqPiso: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que o piso seja feito de material impermeável'
            } else {
                feedback = 'Não é preciso que o piso seja feito de material impermeável'
            }
        }

        return feedback
    },
    ReqParede: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que a parede seja feita de material impermeável'
            } else {
                feedback = 'Não é preciso que a parede seja feita de material impermeável'
            }
        }

        return feedback
    },
    ReqTeto: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que o teto seja feito de material impermeável'
            } else {
                feedback = 'Não é preciso que o teto seja feito de material impermeável'
            }
        }

        return feedback
    },
    ReqForro: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que o forro seja feito de material impermeável'
            } else {
                feedback = 'Não é preciso que o forro seja feito de material impermeável'
            }
        }

        return feedback
    },
    ReqRodape: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que o roda-pé seja feito de material impermeável'
            } else {
                feedback = 'Não é preciso que o roda-pé seja feito de material impermeável'
            }
        }

        return feedback
    },
    ReqRalo: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que o ambiente possua ralo sinfonado com tampa escamotável'
            } else {
                feedback = 'Não é preciso que o ambiente possua ralo sinfonado com tampa escamotável'
            }
        }

        return feedback
    },
    ReqPeDireito: (answerSheet, value) => {
        let feedback = null

        if (value < answerSheet) {
            feedback = 'É preciso que o pé-direito tenha uma altura maior ou superior a ' + answerSheet + 'm'
        }

        return feedback
    },
    ReqCubaFuda: (answerSheet, value) => {
        let feedback = null

        if (answerSheet[0] == false && value[0]) {
            feedback = 'Embora este ambiente possua bancada com pia de cuba funda, ela não é necessária.'

            if (answerSheet[1] == false && value[1]) {
                feedback += ' Além disso, não é precisso que se utilize torneiras que dispensem o uso das mãos.'
            }
        }

        if (answerSheet[0] && value[0] == false) {
            feedback = 'O ambiente precisa de uma bancada com pia de cuba funda'

            if (answerSheet[1] && value[1] == false) {
                feedback += '. Também necessita de uma torneira que dispense o uso das mãos para ligas e deligar.'
            }

            if (answerSheet[1] == false && value[1]) {
                feedback += ', mas descarta o uso de torneiras que dispensam o uso das mãos para ligar e desligar.'
            }
        }

        return feedback
    },
    ReqGasesMedicinais: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É necessário que haja a presença de gases medicinais no ambiente'
            } else {
                feedback = 'Não é necessário que haja a presença de gases medicinais no ambiente'
            }
        }

        return feedback
    },
    ReqLuminaria: (answerSheet, value) => {
        let feedback = null

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            } else {
                feedback = 'Não é preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            }
        }

        return feedback
    },
    ReqQtdAmbientes: (tamanhoEquipe, ambienteExiste, quantidadeAmbientes, idAmbiente, odontologico) => {
        let feedback = null

        if (!ambienteExiste) {
            feedback = 'O ambiente deve existir na composição de uma USF'

            if (!odontologico) {
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