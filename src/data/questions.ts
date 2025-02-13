export default {
    PA: {
        title: 'Proposta Assistencial',
        lock: false,
        percentage: 100,
        group: 'PA',
        questions: [
            {
                statement: `
                    A unidade de saúde da família realiza consultas 
                    e procedimentos odontológicos
                `,
                value: null,
            },
            {
                statement: `
                    A atividade de coleta de exames laboratoriais 
                    é realizado por esta unidade
                `,
                value: null,
            },
            {
                statement: `
                    A sala de esterilização e estocagem de materiais esterilizados é centralizada em uma unidade de 
                    esterilização vinculada a unidades de referência ou hospital
                `,
                value: null,
            },
            {
                statement: `Serão realizadas atividades ginecológicas nesta unidade`,
                value: null,
            },
        ]
    },
    ADM: {
        title: 'Administrativo',
        lock: false,
        percentage: 100,
        group: 'ADM',
        questions: [
            {
                statement: `Existe sala administrativa de gerência`,
                value: null,                  
            },
            {
                statement: `Existe sala de reuniões`,
                value: null,                  
            },
            {
                statement: `Existe sala administrativa de agentes comuniários de saúde`,
                value: null,                 
            },
            {
                statement: `Existe sala de arquivo e prontuário médico`,
                value: null,                 
            },
            {
                statement: `Existe almoxarifado`,
                value: null,                 
            }
        ]
    },
    AC: {
        title: 'Atendimento Clínico',
        lock: false,
        percentage: 100,
        group: 'AC',
        questions: [
            {
                statement: `Existe farmácia`,
                value: null, 
            },
            {
                statement: `Existe consultório médico`,
                value: null, 
            },
            {
                statement: `Existe consultório médico com sanitário anexo`,
                value: null, 
            },
            {
                statement: `Existe sala de procedimentos`,
                value: null, 
            },
            {
                statement: `Existe sala de vacinas`,
                value: null, 
            },
            {
                statement: `Existe sala para coleta`,
                value: null, 
            },
            {
                statement: `Existe sala para classificação de amostras`,
                value: null, 
            },
            {
                statement: `Existe sala de nebulização`,
                value: null, 
            },
            {
                statement: `Existe sala de curativos`,
                value: null, 
            },
        ],
    },
    AO: {
        title: 'Atendimento odontológico',
        lock: false,
        percentage: 100,
        group: 'AO',
        questions: [
            {
                statement: `Existe consultório odontológico`,
                value: null, 
            },
            {
                statement: `Existe escovário`,
                value: null, 
            },
            {
                statement: `Existe área técnica para compressor de ar odontológico`,
                value: null, 
            },
            {
                statement: `Existe área técnica para bomba vácuo`,
                value: null, 
            }
        ]
    },
    AP: {
        title: 'Apoio',
        lock: false,
        percentage: 100,
        group: 'AP',
        questions: [
            {
                statement: `Existe banheiro para funcionários`,
                value: null, 
            },
            {
                statement: `Existe vestiário para funcionários`,
                value: null, 
            },
            {
                statement: `Existe copa`,
                value: null, 
            },
            {
                statement: `Existe sala de recepção`,
                value: null, 
            },
            {
                statement: `Existe sala de espera`,
                value: null, 
            },
            {
                statement: `Existe sanitário de pacientes`,
                value: null, 
            },
            {
                statement: `Existe depósito de material de limpeza m(DML)`,
                value: null, 
            },
            {
                statement: `Existe central de material esterilizada simplificada`,
                value: null, 
            },
            {
                statement: `Existe sala de utilidades`,
                value: null, 
            },
            {
                statement: `Existe abrigo de resíduos de serviços de saúde`,
                value: null, 
            },
        ]
    },
    OUTROS: {
        title: 'Adicionar ambientes',
        lock: false,
        percentage: 100,
        page: 'outros',
    },
    PC: {
        title: 'Parecer técnico',
        lock: false,
        percentage: 98,
        page: 'parecer',
    },
}