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
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>
                    <template v-for="(room, indexSection) in dataAnalyse">
                        <ListComponent>
                            <template v-slot:title>{{ room.title }}</template>
                            <template v-slot:content>
                                <div id="appv-parecer" class="appv-data-info">
                                    {{ room.reqRoom }}
                                </div>
                                <div v-for="(x, indexRoom) in room.roons" id="appv-parecer" class="requirement">
                                    <div id="appv-parecer" class="wrapper-requirement" @click="methods.seeRequirements(indexSection, indexRoom)">
                                        <div class="position">{{ indexRoom + 1 }}</div>
                                        <p class="text">Ambiente {{ indexRoom + 1 }}</p>
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
                        {{ dataAnalyse[getDataRoom.section].title }}
                    </template>
                    <template v-slot:content>
                        <div id="appv-modal-parecer" class="wrapper">
                            <h1 id="appv-modal-parecer" class="title">O ambiente <b>{{ dataAnalyse[getDataRoom.section].title }} {{ getDataRoom.room + 1 }}</b> possui as seguintes incompatibilidades:</h1>
                            <template v-for="(alerts, index) in dataAnalyse[getDataRoom.section].roons[getDataRoom.room]">
                                <template v-if="alerts">
                                    <ListComponent>
                                        <template v-slot:title>Incompatibilidade {{ index + 1 }}</template>
                                        <template v-slot:content>
                                            <div id="appv-parecer" class="requirement">
                                                <p class="text">{{ alerts }}</p>
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
    import { inject, ref, onMounted } from 'vue'
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
    const getDataRoom = ref({
        section: null,
        room: null,
    })

    // fim da área de teste

    onMounted(() => {
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Compatível', 'Incompatível'],
                datasets: [{
                    label: 'Requisitos',
                    data: [50, 20],
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

                    /*if (getRoons.roons.length) {
                        analyseResult.push(getRoons)
                    } else {
                        analyseResult     
                    }*/

                    analyseResult.push(getRoons)
                }
            } 
            
            console.log(analyseResult)

            return analyseResult
        },
    }  
    
    dataAnalyse.value = methods.listQuestions(data.project.data, data.project)
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
</style>