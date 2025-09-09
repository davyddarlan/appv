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
    analyse: function (question, project) {
        const nomeAmbiente = question.title
        const requisitos = question.requirements
        const valores = question.valuesRequirements.value
        const qtdAmbientes = question.lengthRoom
        
        const tamanhoEquipe = +project.lengthTeam.value
        const ambienteExiste = question.value.value
        const quantidadeAmbientes = +question.lengthRoom.value
        const geral = {
            odontologico: project.odontologico.value,
            centralizacao_rep: project.centralizacao_rep.value,
            centralizacao_est: project.centralizacao_est.value,
            centralizacao_armazenagem: project.centralizacao_armazenagem.value,
        }

        const validacaoAmbiente = ReqValidation['ReqQtdAmbientes'](tamanhoEquipe, ambienteExiste, quantidadeAmbientes, question.id, geral)

        const dataResult = {
            title: nomeAmbiente,
            roons: [],
            reqRoom: validacaoAmbiente,
        }

        if (+qtdAmbientes.value) {
            for (let i in valores) {
                const feedback = []

                for (let j = 0; j < requisitos.length; j++) {
                    const validator = requisitos[j].view
                    const answerSheet = requisitos[j].answerSheet
                    const data = valores[i]['reqs'][validator]
    
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