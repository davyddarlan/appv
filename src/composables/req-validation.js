import Roons from './roons.js'

export default {
    ReqAreaFisica: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqAreaFisica'

        if (value < answerSheet) {
            feedback = 'A área física do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqLavatorio: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqLavatorio'

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
            answerSheet,
            value,
            id,
        }
    },
    ReqVentilacao: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqVentilacao'

        if (answerSheet && value == false) {
            feedback = 'A ventilação natural ou mecânica é obrigatória'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqPiso: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqPiso'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o piso seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqParede: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqParede'

        if (answerSheet && value == false) {
            feedback = 'É preciso que a parede seja feita de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqTeto: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqTeto'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o teto seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqForro: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqForro'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o forro seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqRodape: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqRodape'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o roda-pé seja feito de material impermeável'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqRalo: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqRalo'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ralo sinfonado com tampa escamotável'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqPeDireito: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqPeDireito'

        if (value < answerSheet) {
            feedback = 'É preciso que o pé-direito tenha uma altura igual ou superior a ' + answerSheet + 'm'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqCubaFuda: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqCubaFuda'

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
            answerSheet,
            value,
            id,
        }
    },
    ReqGasesMedicinais: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqGasesMedicinais'

        if (answerSheet && value == false) {
            feedback = 'É necessário que haja a presença de gases medicinais no ambiente'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqLuminaria: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqLuminaria'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqDispercaoFarma: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqDispercaoFarma'

        if (value < answerSheet) {
            feedback = 'A área disperção do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqArmazenamentoFarma: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqArmazenamentoFarma'

        if (value < answerSheet) {
            feedback = 'A área armazenamento do ambiente deve ser igual ou superior a ' + answerSheet + 'm²'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqIluminacao: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqIluminacao'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente seja bem iluminado'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqFiacaoEletrica: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqFiacaoEletrica'

        if (answerSheet && value == false) {
            feedback = 'É preciso que a fiação elétrica do ambiente esteja embutida ou recoberta'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqVaoPorta: (answerSheet, value) => {
        let feedback = ''
        let status = 1
        let id = 'ReqVaoPorta'

        if (value[0] < answerSheet[0]) {
            feedback += ('A largura do vão da porta deve ser igual ou superior a ' + answerSheet[0] + 'm.')
            status = 2
        }

        if (value[1] < answerSheet[1]) {
            feedback += (' A altura do vão da porta deve ser igual ou superior a ' + answerSheet[1] + 'm')
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqFiacaoLogica: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqFiacaoLogica'

        if (value[0]) {
            if (answerSheet && value[1] == false) {
                feedback = 'É preciso que a fiação lógica do ambiente esteja embutida ou recoberta'
                status = 2
            }
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqFiacaoTelefonica: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqFiacaoTelefonica'

        if (value[0]) {
            if (answerSheet && value[1] == false) {
                feedback = 'É preciso que a fiação telefônica do ambiente esteja embutida ou recoberta'
                status = 2
            }
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqMaca: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqMaca'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua maca'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqEscada: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqEscada'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua escada'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqBaciaSanitaria: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqBaciaSanitaria'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua bacia sanitária'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqChuveiro: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqChuveiro'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua chuveiro'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqBox: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqBox'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua box'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqBancadaPia: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqBancadaPia'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua bancada com pia'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqTanque: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqTanque'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua tanque'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqPiaLavagem: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqPiaLavagem'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua pia de lavagem'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqPiaDespejo: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqPiaDespejo'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua pia de despejo'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqDucha: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqDucha'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ducha'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqSeparacaoResiduos: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqSeparacaoResiduos'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua separação para resíduos comuns, químicos e biológicos'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqPontoAgua: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqPontoAgua'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua ponto de água'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqProtecaoRoedores: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqProtecaoRoedores'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua proteção contra roedores'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqEquipamentoRx: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqEquipamentoRx'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua equipamento de raio X'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqEspelho: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqEspelho'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua espelhos com altura adequada para crianças, adolescentes e adultos'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqTorneira: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqTorneira'

        if (answerSheet && value == false) {
            feedback = 'É preciso que o ambiente possua torneiras'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqCobertura: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqCobertura'

        if (answerSheet && value == false) {
            feedback = 'É preciso que a área técnica seja coberta'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqProtPorta: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqProtPorta'

        if (answerSheet && value == false) {
            feedback = 'É preciso que a área técnica seja protegida com porta'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqAutoclave: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqAutoclave'

        if (answerSheet && value == false) {
            feedback = 'É preciso que haja um autoclave'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqAcessibilidade: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqAcessibilidade'

        if (value[0]) {
            if (answerSheet && value[1] == false) {
                feedback = 'É preciso que o ambiente possua algum recurso de circulação vertical (rampa, elevador ou plataforma mecânica)'
                status = 2
            }
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqQtdAmbulanica: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqQtdAmbulanica'

        if (value < answerSheet) {
            feedback = 'É preciso que a quantidade de vagas seja igual ou maior a ' + answerSheet
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqLavatorioaBarra: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqLavatorioaBarra'

        if (value != answerSheet) {
            feedback = 'É preciso que ambiente possua um lavatório com barras'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqBaciaSanitariaBarra: (answerSheet, value) => {
        let feedback = null
        let status = 1
        let id = 'ReqBaciaSanitariaBarra'

        if (value != answerSheet) {
            feedback = 'É preciso que ambiente possua uma bacia sanitária com barras'
            status = 2
        }

        return {
            status,
            feedback,
            answerSheet,
            value,
            id,
        }
    },
    ReqQtdAmbientes: (tamanhoEquipe, ambienteExiste, quantidadeAmbientes, idAmbiente, geral) => {
        let feedback = null
    
        if (!ambienteExiste) {
            feedback = 'O ambiente deve existir na composição de uma USF'

            if (geral.odontologico == false) {                
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

            if (geral.centralizacao_rep == false) {
                if (idAmbiente == Roons.SALA_RECEPCAO_DESCON) {
                    return null
                }
            }

            if (geral.centralizacao_est == false) {
                if (idAmbiente == Roons.SALA_ESTERILIZACAO) {
                    return null
                }
            }

            if (geral.centralizacao_armazenagem == false) {
                if(idAmbiente == Roons.FARMACIA) {
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