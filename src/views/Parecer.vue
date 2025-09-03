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
                <div id="appv-parecer" class="wrapper">
                    <div id="appv-parecer" class="result-data">
                        <p>Para o resultado desta análise, foram consultados <b>{{ totalRequisitos }}</b> requisitos,
                        dos quais, <b>{{ percenteCompativel.toPrecision(4) + '%' }} ({{ statistics.compativel }})</b> estão conformes e <b>{{ percenteIncompativel.toPrecision(4) + '%' }}
                            ({{ statistics.incompativel }})</b> inconformes.</p>
                    </div>
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>
                    <template v-for="(room, indexSection) in dataAnalyseFilter">
                        <ListComponent>
                            <template v-slot:title>{{ room.title }}</template>
                            <template v-slot:content>
                                <div id="appv-parecer" class="appv-data-info">
                                    {{ room.reqRoom }}
                                </div>
                                <div v-for="(x, indexRoom) in room.roons" id="appv-parecer" class="requirement">
                                    <div id="appv-parecer" class="wrapper-requirement" @click="methods.seeRequirements(indexSection, indexRoom)">
                                        <div class="position">{{ indexRoom + 1 }}</div>
                                        <p class="text">{{ x.title }}</p>
                                    </div>
                                </div>
                            </template>     
                        </ListComponent>
                    </template>
                </div>
                <ListaImcompatibilidadeModal :open="modal" @close="modal = false">
                    <template v-slot:title>
                        Incompatibilidades
                    </template>
                    <template v-slot:subheader>
                        {{ dataAnalyseFilter[getDataRoom.section].title }}
                    </template>
                    <template v-slot:content>
                        <div id="appv-modal-parecer" class="wrapper">
                            <h1 id="appv-modal-parecer" class="title">O ambiente <b>{{ dataAnalyseFilter[getDataRoom.section].title }} {{ dataAnalyseFilter[getDataRoom.section].roons[getDataRoom.room].index }}</b> possui as seguintes incompatibilidades:</h1>
                            <template v-for="(alerts, index) in dataAnalyseFilter[getDataRoom.section].roons[getDataRoom.room].roons">
                                <template v-if="alerts.status == 2">
                                    <ListComponent>
                                        <template v-slot:title>Incompatibilidade {{ index + 1 }}</template>
                                        <template v-slot:content>
                                            <div id="appv-parecer" class="requirement">
                                                <p class="text">{{ alerts.feedback }}</p>
                                            </div>
                                        </template>     
                                    </ListComponent>
                                </template>
                            </template>
                        </div>
                    </template>
                </ListaImcompatibilidadeModal>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref, onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router'  

    import Analyse from '../composables/analyse.js'

    import { 
        IonIcon,
        IonPage,
    } from '@ionic/vue'

    import { 
        chevronBackOutline
    } from 'ionicons/icons'

    import MainLayout from '@/components/layout/main-layout.vue'
    import ListComponent from '@/components/list/list.vue'
    import ListaImcompatibilidadeModal from './ListaImcompatibilidade.vue'

    const router = useRouter()
    const data = inject('questions')

    // teste por ambiente
    
    const question = data.project.data.ADM.questions[0]
    const modal = ref(false)
    const dataAnalyse = ref(null)
    const dataAnalyseFilter = ref(null)
    let getStatisticsResult = null
    const getDataRoom = ref({
        section: null,
        room: null,
    })

    const statistics = ref({
        compativel: 0,
        incompativel: 0,
    })

    const totalRequisitos = computed(() => {
        return statistics.value.compativel + statistics.value.incompativel
    })

    const percenteCompativel = computed(() => {
        return statistics.value.compativel / (statistics.value.compativel + statistics.value.incompativel) * 100
    })

    const percenteIncompativel = computed(() => {
        return statistics.value.incompativel / (statistics.value.compativel + statistics.value.incompativel) * 100
    })

    // fim da área de teste

    onMounted(() => {
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Conformidade', 'Inconformidade'],
                datasets: [{
                    label: 'Requisitos',
                    data: [statistics.value.compativel, statistics.value.incompativel],
                    borderWidth: 1,
                    backgroundColor: [
                        '#4a5d88',
                        '#e33922',
                    ],
                    hoverOffset: 4,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })

    const methods = {
        goBackNavigation: () => { 
            router.go(-1) 
        },
        seeRequirements: (section, room) => {
            modal.value = true
            
            getDataRoom.value.section = section
            getDataRoom.value.room = room
        },
        listQuestions: (questionDb, project) => {
            const listGroup = ['ADM', 'AC', 'AO', 'AP']
            const analyseResult = []

            for (let i = 0; i < listGroup.length; i++) {
                let questionsLength = questionDb[listGroup[i]].questions.length

                for (let j = 0; j < questionsLength; j++) {
                    let getRoons = Analyse.analyse(questionDb[listGroup[i]].questions[j], project)
                
                    analyseResult.push(getRoons)
                }
            } 

            return analyseResult
        },
        problems: (data) => {
            let isProblem = false 

            for (let i = 0; i < data.length; i++) {
                if (data[i] != null) {
                    isProblem = true
                    break
                }
            }

            return isProblem
        },
        getStatistics: (data) => {
            let compativel = 0
            let incompativel = 0

            for (let i = 0; i < data.length; i++) {
                if (data[i].reqRoom == null) {
                    compativel++
                } else {
                    incompativel++
                }

                if (data[i].roons.length) {
                    for (let j = 0; j < data[i].roons.length; j++) {
                        for (let z = 0; z < data[i].roons[j].length; z++) {
                            if (data[i].roons[j][z].status == 1) {
                                compativel++
                            } else if (data[i].roons[j][z].status == 2) {
                                incompativel++
                            }
                        }
                    }
                }
            }

            return {
                compativel,
                incompativel,
            }
        },
        getFilterQuestions: (data) => {
            const newList = []
            let status = false
            let roons = []
            
            for (let i = 0; i < data.length; i++) {
                if (data[i].reqRoom != null) {
                    status = true
                }

                // verificar roons
                if (data[i].roons.length) {      
                    // percorrer cada conjunto de salas
                    for (let j = 0; j < data[i].roons.length; j++) {
                        for (let z = 0; z < data[i].roons[j].length; z++) {
                            if (data[i].roons[j][z].status == 2) {
                                status = true

                                roons.push({
                                    index: (j + 1),
                                    title: 'Ambiente ' + (j + 1),
                                    roons: data[i].roons[j],
                                })

                                break
                            }
                        }
                    }
                }

                if (status) {
                    newList.push({
                        title: data[i].title,
                        reqRoom: data[i].reqRoom,
                        roons: roons,
                    })

                    roons = []  
                    status = false
                }
            }

            console.log(newList)

            return newList 
        }
    }  
    
    dataAnalyse.value = methods.listQuestions(data.project.data, data.project)
    dataAnalyseFilter.value = methods.getFilterQuestions(dataAnalyse.value)
    getStatisticsResult = methods.getStatistics(dataAnalyse.value)
    
    statistics.value.compativel = getStatisticsResult.compativel
    statistics.value.incompativel = getStatisticsResult.incompativel
</script>

<style scoped>
    #appv-parecer.wrapper,
    #appv-modal-parecer.wrapper {
        padding: 20px;
    }

    #appv-modal-parecer.title { margin-bottom: 30px; }

    #appv-parecer.requirement {
        display: flex;
        align-items: center;
        width: 100%;
        height: auto;
        padding: 5px 15px 5px 15px;
        border-bottom: 1px solid rgba(50, 50, 93, 0.25);
    }

    #appv-parecer.requirement .position {
        width: 40px;
        height: 40px;
        background: #e33922;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        font-weight: bold;
        color: #ffffff;
    }

    #appv-parecer.requirement .text {
        width: calc(100% - (40px + 20px));
        margin-left: 20px; 
    }

    #appv-parecer.requirement .position,
    #appv-parecer.requirement .text { float: left; }

    #appv-parecer.appv-data-info {
        padding: 20px;
    }

    #appv-parecer.appv-data-info:empty {
        padding: 0;
    }

    #appv-parecer.wrapper-requirement {
        display: flex;
        align-items: center;
    }

    #myChart {
        margin-bottom: 20px;
    }

    #appv-parecer.result-data {
        margin-bottom: 10px;
    }

    #appv-parecer.result-data p {
        margin: 0;
    }
</style>