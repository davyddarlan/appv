import ReqValidation from './req-validation.js'

export default {
    isNullArray: function (vector) {
        let isNull = false

        for (let i = 0; i < vector.length; i++) {
            if (vector[i] === null) {
                isNull = true
                break
            }
        }

        return isNull
    },
    computeAnswer: function (validator, answerSheet, data) {
        return ReqValidation[validator](answerSheet, data)
    },
    analyse: function (question) {
        const nomeAmbiente = question.title
        const requisitos = question.requirements
        const valores = question.valuesRequirements
        const qtdAmbientes = question.lengthRoom

        const dataResult = {
            title: nomeAmbiente,
            roons: [],
        }

        if (+qtdAmbientes.value) {
            for (let i = 0; i < qtdAmbientes.value; i++) {
                const feedback = []
    
                for (let j = 0; j < requisitos.length; j++) {
                    const validator = requisitos[j].view
                    const answerSheet = requisitos[j].answerSheet
                    const data = valores.value[i][j]
    
                    if (Array.isArray(data)) {
                        if (!this.isNullArray(data)) {
                            feedback.push(this.computeAnswer(validator, answerSheet, data))
                        }
                    } else {
                        if (data !== null) {
                            feedback.push(this.computeAnswer(validator, answerSheet, data))
                        }
                    }
                }
    
                dataResult.roons.push(feedback)            
            }
        }

        return dataResult
    }
}