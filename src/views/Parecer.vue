<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.goBackNavigation" :icon="chevronBackOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Parecer técnico
            </template>
            <template v-slot:subheader>
                Resultado da análise
            </template>
            <template v-slot:content>
                <div id="appv-card" class="wrapper">
                    <h3 id="appv-card" class="title">FORAM IDENTIFICADAS {{ results.length }} INCONFORMIDADES:</h3>
                    <div v-for="result in results" id="appv-card" class="card">{{ result.message }}</div>
                </div>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'  

    import { 
        IonIcon,
        IonPage,
    } from '@ionic/vue'

    import { 
        chevronBackOutline,
    } from 'ionicons/icons'

    import MainLayout from '@/components/layout/main-layout.vue'

    const router = useRouter()
    const data = inject('questions')
    const results = ref([])

    const methods = {
        goBackNavigation: () => { 
            router.go(-1) 
        },
        analyse: (rules) => {
            let result = null 

            results.value.splice(0)

            for (let i = 0; i < rules.length; i++) {
                result = rules[i]()

                if (result != undefined) {
                    results.value.push(result)
                }
            }
        }
    }

    // VARIAVEIS
    const AMB_ODONTOLOGICO = data['PA'].questions[0].value
    const TEM_CONSULTORIO = data['AO'].questions[0].value
    const AREA_COMPRESSO = data['AO'].questions[2].value
    const AREA_BOMBA = data['AO'].questions[3].value
    const ESCOVARIO = data['AO'].questions[1].value
    const GINECOLOGICO = data['PA'].questions[3].value
    const CONSULTORIO_SANITARIO = data['AC'].questions[2].value

    // REGRAS
    const REGRA_1 = () => {
        if (AMB_ODONTOLOGICO == false && TEM_CONSULTORIO == true) {
            return {
                result: false,
                message: `Existe um consultório odontológico, mas as atividades 
                odontológicas não fazem parte da proposta assitencial.`
            }
        }

        if (AMB_ODONTOLOGICO == true && TEM_CONSULTORIO == false) {
            return {
                result: false,
                message: `A proposta assistencial prevê atividades odontológicas,
                mas não há um consultório odontológico.`
            }
        }
    }

    const REGRA_2 = () => {
        if (AMB_ODONTOLOGICO == false && AREA_COMPRESSO == true) {
            return {
                result: false,
                message: `Existe uma área técnica para área de compressor odontológico, 
                mas a odontologia não fazem parte da proposta assitencial.`
            }
        }

        if (AMB_ODONTOLOGICO == true && AREA_COMPRESSO == false) {
            return {
                result: false,
                message: `A proposta assistencial prevê atividades odontológicas,
                mas não há uma área de compressor odontológico.`
            }
        }
    }

    const REGRA_3 = () => {
        if (AMB_ODONTOLOGICO == false && AREA_BOMBA == true) {
            return {
                result: false,
                message: `Existe uma área técnica para bomba vácuo, 
                mas a odontologia não fazem parte da proposta assitencial.`
            }
        }

        if (AMB_ODONTOLOGICO == true && AREA_BOMBA == false) {
            return {
                result: false,
                message: `A proposta assistencial prevê atividades odontológicas,
                mas não há uma área técnica para bomba vácuo.`
            }
        }
    }

    const REGRA_4 = () => {
        if (AMB_ODONTOLOGICO == false && ESCOVARIO == true) {
            return {
                result: false,
                message: `Há um área de escovário, porém as atividades odontológicas 
                não fazem parte da proposta assistencial.`
            }
        }
    }

    const REGRA_5 = () => {
        if (GINECOLOGICO == true && CONSULTORIO_SANITARIO == false) {
            return {
                result: false,
                message: `As atividades ginecológicas necessitam de um sanitário anexo ao consultório`
            }
        }
    }

    const REGRAS = [
        REGRA_1,
        REGRA_2,
        REGRA_3,
        REGRA_4,
        REGRA_5,
    ]

    onMounted(() => {
        methods.analyse(REGRAS)
    })
</script>

<style scoped>
    #appv-card.card {
        background: #ffffff;
        padding: 20px;
        border-radius: 4px;
        margin: 15px 0 15px 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    }

    #appv-card.title {
        margin-bottom: 30px;
    }

    #appv-card.wrapper {
        width: 100%;
        padding: 10px 20px 10px 20px;
    }
</style>