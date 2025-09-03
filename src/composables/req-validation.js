import Roons from './roons.js'

export default {
    ReqAreaFisica: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value < answerSheet) {
            feedback = 'A área física do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqLavatorio: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet[0] && value[0] == false) {
            feedback = 'O ambiente precisa de um lavatório'
            status = 2
        }

        if (answerSheet[0] && value[0]) {
            if (answerSheet[1] && value[1] == false) {
                feedback = 'É precisso que a torneira do lavatório possua um mecanismo que dispense o uso das mãos para ligar e deligar.'    
                status = 2
            }
        }   

        return {
            status,
            feedback,
        }
    },
    ReqVentilacao: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'A ventilação natural ou mecânica é obrigatória'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqPiso: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o piso seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqParede: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que a parede seja feita de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqTeto: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o teto seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqForro: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o forro seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqRodape: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o roda-pé seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqRalo: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ralo sinfonado com tampa escamotável'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqPeDireito: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value < answerSheet) {
            feedback = 'É preciso que o pé-direito tenha uma altura igual ou superior a ' + answerSheet + 'm'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqCubaFuda: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet[0] && value[0] == false) {
            feedback = 'O ambiente precisa de uma bancada com uma pia de cuba funda.'
            status = 2
        }

        if (answerSheet[0] && value[0]) {
            if (answerSheet[1] && value[1] == false) {
                feedback = 'É precisso que a torneira da bancada com pia de cuba funda possua um mecanismo que dispense o uso das mãos para ligar e deligar.'
                status = 2
            }
        }

        return {
            status,
            feedback,
        }
    },
    ReqGasesMedicinais: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É necessário que haja a presença de gases medicinais no ambiente'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqLuminaria: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqDispercaoFarma: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value < answerSheet) {
            feedback = 'A área disperção do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqArmazenamentoFarma: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value < answerSheet) {
            feedback = 'A área armazenamento do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqIluminacao: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente seja bem iluminado'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqFiacaoEletrica: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que a fiação elétrica do ambiente esteja embutida ou recoberta'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqVaoPorta: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value[0] < answerSheet[0]) {
            feedback = ('A largura do vão da porta deve ser igual ou superior a ' + answerSheet[0] + 'm.')
            status = 2
        }

        if (value[1] < answerSheet[1]) {
            feedback += (' A altura do vão da porta deve ser igual ou superior a ' + answerSheet[1] + 'm')
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqFiacaoLogica: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value[0]) {
            if (answerSheet && value[1] == false) {
                feedback = 'É preciso que a fiação lógica do ambiente esteja embutida ou recoberta'
                status = 2
            }
        }

        return {
            status,
            feedback,
        }
    },
    ReqFiacaoTelefonica: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value[0]) {
            if (answerSheet && value[1] == false) {
                feedback = 'É preciso que a fiação telefônica do ambiente esteja embutida ou recoberta'
                status = 2
            }
        }

        return {
            status,
            feedback,
        }
    },
    ReqMaca: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua maca'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqEscada: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua escada'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqBaciaSanitaria: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua bacia sanitária'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqChuveiro: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua chuveiro'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqBox: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua box'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqBancadaPia: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua bancada com pia'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqTanque: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua tanque'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqPiaLavagem: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua pia de lavagem'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqPiaDespejo: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua pia de despejo'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqDucha: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ducha'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqSeparacaoResiduos: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua separação para resíduos comuns, químicos e biológicos'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqPontoAgua: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ponto de água'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqProtecaoRoedores: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua proteção contra roedores'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqEquipamentoRx: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua equipamento de raio X'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqEspelho: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua espelhos com altura adequada para crianças, adolescentes e adultos'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqTorneira: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua torneiras'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqCobertura: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que a área técnica seja coberta'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqProtPorta: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que a área técnica seja protegida com porta'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqAutoclave: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (answerSheet && value == false) {
            feedback = 'É preciso que haja um autoclave'
            status = 2
        }

        return {
            status,
            feedback,
        }
    },
    ReqAcessibilidade: (answerSheet, value) => {
        let feedback = null
        let status = 1

        if (value[0]) {
            if (answerSheet && value[1] == false) {
                feedback = 'É preciso que o ambiente possua algum recurso de circulação vertical (rampa, elevador ou plataforma mecânica)'
                status = 2
            }
        }

        return {
            status,
            feedback,
        }
    },
    ReqQtdAmbientes: (tamanhoEquipe, ambienteExiste, quantidadeAmbientes, idAmbiente, odontologico) => {
        let feedback = null
    
        if (!ambienteExiste) {
            feedback = 'O ambiente deve existir na composição de uma USF'

            if (odontologico == false) {                
                if (idAmbiente == Roons.ESCOVARIO) {
                    return null
                }

                if(idAmbiente == Roons.COMPRESSOR_ODONTOLOGICO) {
                    return null
                }

                if(idAmbiente == Roons.BOMBA_VACUO) {
                    return null
                }

                if (idAmbiente == Roons.CONSULTORIO_ODONTOLOGICO) {
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