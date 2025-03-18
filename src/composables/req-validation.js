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

        if (value != answerSheet) {
            if (answerSheet) {
                feedback = 'O uso do lavatório é obrigatório'
            } else {
                feedback = 'O ambiente possui um lavatório, porém não é necessário'
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
            if (props.answerSheet) {
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

        if (answerSheet != value) {
            if (answerSheet) {
                feedback = 'É necessário a existência de uma bancada com pia de cuba funda'
            } else {
                feedback = 'Não é necessário a existência de uma bancada com pia de cuba funda'
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
                message = 'É preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            } else {
                message = 'Não é preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            }
        }

        return feedback
    },
}