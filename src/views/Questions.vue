<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.goBackNavigation" :icon="chevronBackOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Questionário
            </template>
            <template v-slot:subheader>
                {{ questionGroup.title }}
            </template>
            <template v-slot:content>
                <div class="appv-header">
                    <div class="title">Bloco de perguntas:</div>
                    <div id="appv-step">
                        <div @click="methods.prevPag" id="left-btn" class="button">
                            <IonIcon :icon="caretBackOutline"></IonIcon>
                        </div>
                        <span id="step">{{ pagination.currentPage }}</span>
                        <span id="divider">/</span>
                        <span id="total-step">{{ pagination.total }}</span>
                        <div @click="methods.nextPag" id="right-btn" class="button">
                            <IonIcon :icon="caretForwardOutline"></IonIcon>
                        </div>
                    </div>
                </div>
                <div class="appv-question-wrapper">
                    <template v-for="question in pagination.list.value" :key="question.id">
                        <RoomQuestion :question="question" 
                            @pressBtn="methods.openRoons({ group: groupQuestions, index: question.index })"
                            @setValue="methods.setValueQuestion"
                            @setLengthRoom="methods.setValueQuestion"
                        ></RoomQuestion>
                    </template>
                    <ion-alert
                        header="Atenção!"
                        sub-header="Como o ambiente anterior continha campos preenchidos, presseguir resultará na perda destas informações."
                        message="Você deseja informar que este ambiente não existe?"
                        :is-open="deleteAlert.isOpen"
                        :buttons="deleteAlert.buttons"
                    ></ion-alert>
                </div>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref, onMounted, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'  

    import { 
        IonIcon,
        IonPage,
        IonAlert,
    } from '@ionic/vue'

    import { 
        chevronBackOutline,
        caretBackOutline,
        caretForwardOutline,
    } from 'ionicons/icons'
    
    import MainLayout from '../components/layout/main-layout.vue'
    import RoomQuestion from '../components/question/room-question.vue'

    const router = useRouter()
    const route = useRoute()
    const questionsStorage = inject('questions')
    const storage = inject('storage')

    const deleteAlert = ref({
        isOpen: false,
        buttons: [
            {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                    deleteAlert.value.isOpen = false
                },
            },
            {
                text: 'Confirmar',
                role: 'confirm',
                handler: () => {
                    deleteAlert.value.isOpen = false
                },
            }
        ]
    })

    const { groupQuestions } = route.query
    const questionGroup = questionsStorage.project.data[groupQuestions]

    const pagination = {
        questionsLength: questionGroup.questions.length,
        perPage: 2,
        total: null,
        currentPage: ref(1),
        list: ref([]),
    }

    pagination.total = Math.ceil(pagination.questionsLength / pagination.perPage)

    const methods = {
        setValueQuestion: (data) => {   
            const databaseName = questionsStorage.project.projectId.value + '_' + groupQuestions
            
            const questionData = {
                [data.id]: {
                    value: data.value,
                    lengthRoom: data.lengthRoom,
                }
            }

            storage.setQuestion(databaseName, questionData).then((result) => {
                if (!data.value) {
                    deleteAlert.value.isOpen = true
                }
            })
        },
        goBackNavigation: () => { 
            router.go(-1) 
        },
        listQuestions: () => {
            const startPosition = (pagination.currentPage.value - 1) * pagination.perPage
            let endPosition = startPosition + pagination.perPage

            if (pagination.total == pagination.currentPage.value) {
                let test = pagination.perPage * pagination.currentPage.value

                if (test > pagination.questionsLength) {
                    test -= pagination.questionsLength
                } else {
                    test = pagination.questionsLength - test
                }

                endPosition = startPosition + pagination.perPage - test
            }

            pagination.list.value.splice(0)

            for (let i = startPosition; i < endPosition; i++) {
                pagination.list.value.push({
                    index: i,
                    statement: questionGroup.questions[i].statement,
                    value: questionGroup.questions[i].value,
                    lengthRoomValue: questionGroup.questions[i].lengthRoom,
                    id: questionGroup.questions[i].id,
                })
            }
        },
        nextPag: () => {
            if (pagination.currentPage.value < pagination.total) {
                pagination.currentPage.value++
            }
        },
        prevPag: () => {
            if (pagination.currentPage.value > 1) {
                pagination.currentPage.value--
            }
        },
        openRoons: (data) => {
            router.push({
                path: '/lista-ambientes',
                query: {
                    group: data.group,
                    index: data.index,
                }
            })
        }
    }

    watch(() => pagination.currentPage.value, (data) => {
        methods.listQuestions()
    })

    onMounted(() => {
        methods.listQuestions()
    })
</script>

<style scoped>
    .appv-header {
        width: 100%;
        height: 50px;
        background: #e7e8ec;
        border-bottom: 1px solid #626264;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px 0 15px;
    }

    .appv-question-wrapper {
        width: 100%;
        height: calc(100% - 50px);
        overflow-y: auto;
        padding: 10px 20px 10px 20px;
    }

    .appv-question-sub p { font-weight: 600; }

    /* steps */
    #right-btn { margin-left: 8px !important; }

    #left-btn { margin-right: 8px !important; }

    #appv-step #title {
        font-weight: bold;
        margin-right: 8px;
    }

    #appv-step .button {
        text-align: center;
        display: inline-block;
        border: 1px solid #626264;
        width: 28px;
        height: 28px;
        margin: 0;
        padding: 0;
        vertical-align: middle;
        background: #ffffff;
    }

    .button ion-icon { height: 26px; }

    #left-btn { margin: 10px; }

    #appv-step #step,
    #appv-step #divider,
    #appv-step #total { margin-right: 2px; }

    /* modal */

    ion-modal ion-button {
        --background: #e33922;
        --color: #ffffff;
    }

    #appv-modal.wrapper {
        width: 100%;
        min-height: 100%;
        background: #e7e8ec;
        padding: 10px 20px 10px 20px;
    }
</style>