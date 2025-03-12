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
                    <Question v-for="question in pagination.list.value">
                        {{ question.statement }}
                        <template v-slot:input>
                            <RadioQuestion v-model="question.value"></RadioQuestion>
                        </template>
                        <template v-slot:sub>
                            <div v-if="question.value && question.isThereLengthRoom" class="appv-question-sub">
                                <p>Digite a quantidade de ambientes</p>
                                <IonInput v-model="question.lengthRoomValue" type="number" fill="outline" placeholder="Quantidade de ambientes"></IonInput>
                            </div>
                        </template>
                        <template v-slot:control>
                            <IonButton v-if="question.requirements && question.value && +question.lengthRoomValue" @click="methods.openModal(question.index)" size="small" id="open-modal" expand="block">Verificar requisitos</IonButton>
                        </template>
                    </Question>
                </div>
            </template>
        </MainLayout>
        <IonModal :is-open="modalStatus">
            <MainLayout>
                <template v-slot:header-button>
                    <IonIcon @click="methods.closeModal()" :icon="closeOutline"></IonIcon>
                </template>
                <template v-slot:header-title>
                    Requisitos de ambiente
                </template>
                <template v-slot:subheader>
                    {{ titleRequirements }}
                </template>
                <template v-slot:content>
                    <div id="appv-modal" class="wrapper">
                        <template v-for="requirement in componentsRequirements">
                            <component v-model="requirement.value" @notify="methods.getNotify" :is="requirement.view" :answerSheet="requirement.answerSheet"></component>
                        </template>
                    </div>
                </template>
            </MainLayout>
        </IonModal>
    </ion-page>
</template>

<script setup>
    import { inject, ref, onMounted, watch } from 'vue'
    import { useRouter, useRoute } from 'vue-router'  

    import { 
        IonIcon,
        IonPage,
        IonButton,
        IonModal,
        IonInput,
    } from '@ionic/vue'

    import { 
        chevronBackOutline,
        caretBackOutline,
        caretForwardOutline,
        closeOutline,
    } from 'ionicons/icons'
    
    import MainLayout from '../components/layout/main-layout.vue'
    import Question from '../components/question/question.vue'
    import RadioQuestion from '../components/question/radio-question-v2.vue'

    const router = useRouter()
    const route = useRoute()
    const questionsStorage = inject('questions')

    const modalStatus = ref(false)

    const { groupQuestions } = route.query
    const questionGroup = questionsStorage[groupQuestions]
    const componentsRequirements = ref(null)
    const titleRequirements = ref(null)

    const pagination = {
        questionsLength: questionGroup.questions.length,
        perPage: 2,
        total: null,
        currentPage: ref(1),
        list: ref([]),
    }

    pagination.total = Math.ceil(pagination.questionsLength / pagination.perPage)

    const methods = {
        setStatusQuestion: (data) => {           
            questionsStorage[groupQuestions].questions[data.index].value = data.value          
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
                    requirements: questionGroup.questions[i].requirements ? true : false,
                    isThereLengthRoom: questionGroup.questions[i].lengthRoom ? true : false,
                    lengthRoomValue: questionGroup.questions[i].lengthRoom,
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
        openModal: (questionId) => {
            componentsRequirements.value = questionGroup.questions[questionId].requirements
            titleRequirements.value = questionGroup.questions[questionId].title

            modalStatus.value = true
        },
        closeModal: () => {
            modalStatus.value = false
        },
        getNotify: (data) => {
            console.log(data.message)
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