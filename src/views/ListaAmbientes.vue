<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.goBackNavigation" :icon="chevronBackOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Preencher requisitos
            </template>
            <template v-slot:subheader>
                {{ questionDatabase.title }}
            </template>
            <template v-slot:content>
                <div id="appv-content">
                    <p>Clique em um dos ambientes abaixo para preencher o formulário de requisitos técnico:</p>
                    <template v-for="(room, index) in questionDatabase.valuesRequirements.value">
                        <div id="appv-block" class="wrapper">
                            <div @click="methods.openRequirements(index)" id="appv-block" class="title">
                                Ambiente {{ index + 1 }}
                            </div>
                            <div @click="methods.removeRoom(questionDatabase, index, modalParams)" id="appv-block" class="button">
                                <IonIcon :icon="trashOutline"></IonIcon>
                            </div>
                        </div>
                    </template>
                    <IonButton @click="methods.addRoom(questionDatabase)" size="full" id="appv-button" class="button">Adicionar um novo ambiente</IonButton>
                </div>
                <RequirementsModal :open="modal" @close="modal = false">
                    <template v-slot:title>
                        Ambiente {{ modalParams.indexQuestion + 1 }}
                    </template>
                    <template v-slot:subheader>
                        {{ questionDatabase.title }}
                    </template>
                    <template v-slot:content>
                        <div id="appv-content">
                            <template v-for="(requirement, index) in questionDatabase.requirements">
                                <component 
                                    :is="requirement.view" 
                                    :answerSheet="requirement.answerSheet"
                                    v-model="questionDatabase.valuesRequirements.value[modalParams.indexQuestion]['reqs'][requirement.view]"
                                    @setData="methods.getDataRequerements($event, requirement.view, modalParams, questionDatabase.id)"
                                ></component>
                            </template>
                        </div>
                    </template>
                </RequirementsModal>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref } from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    import { 
        IonPage,
        IonIcon,
        IonButton,
    } from '@ionic/vue'

    import { 
        chevronBackOutline,
        trashOutline,
    } from 'ionicons/icons'

    import MainLayout from '../components/layout/main-layout.vue'
    import RequirementsModal from './Requirements.vue'

    const database = inject('questions')
    const storage = inject('storage')

    const router = useRouter()
    const route = useRoute()

    const { group, index } = route.query

    const questionDatabase = database['project']['data'][group]['questions'][index]

    const modal = ref(false)
    const modalParams = ref({
        indexQuestion: 0,
        groupQuestion: group,
        projectId: database.project.projectId.value
    })

    const methods = {
        goBackNavigation: () => {
            router.go(-1)
        },
        fillValuesRequirements: (geralInfo, modalParams) => {
            const database = geralInfo.valuesRequirements.value
            const databaseAux = {}
            const lengthRoons = geralInfo.lengthRoom.value
            const requirements = geralInfo.requirements
            const namespace = modalParams.value.projectId + '_' + modalParams.value.groupQuestion + '_REQS'
            
            let countRoom = 0

            for (let room in database) {
                countRoom++
            }

            if (!countRoom) {
                for (let i = 0; i < lengthRoons; i++) {
                    database[i] = {
                        reqs: {},
                    }

                    databaseAux[i] = {
                        reqs: {},
                    }

                    for (let j = 0; j < requirements.length; j++) {
                        if (requirements[j].answerSheet instanceof Array) {
                            let arrayValues = []
                            let dataLength = requirements[j].answerSheet.length

                            for (let k = 0; k < dataLength; k++) {
                                arrayValues.push(null)
                            }

                            database[i]['reqs'][requirements[j].view] = arrayValues
                            databaseAux[i]['reqs'][requirements[j].view] = arrayValues
                        } else {
                            database[i]['reqs'][requirements[j].view] = null  
                            databaseAux[i]['reqs'][requirements[j].view] = null  
                        }
                    }
                }

                const entity = {
                    [geralInfo.id]: databaseAux,
                }

                storage.createGroupReq(namespace, entity).then((data) => {
                    console.log('o dado foi registrado com sucesso')
                }).catch((error) => {
                    console.log('algo de errado aconteceu')
                })
            } else {
                // preencher os ambientes existetes
                for (let element in database) {
                    for (let i = 0; i < requirements.length; i++) {
                        if (!database[element]['reqs'].hasOwnProperty(requirements[i].view)) {
                            if (requirements[i].answerSheet instanceof Array) {
                                let arrayValues = []
                                let dataLength = requirements[i].answerSheet.length

                                for (let j = 0; j < dataLength; j++) {
                                    arrayValues.push(null)
                                }

                                database[element]['reqs'][requirements[i].view] = arrayValues
                            } else {
                                database[element]['reqs'][requirements[i].view] = null  
                            }
                        }
                    }
                }
            }
        },
        addRoom: (database) => {
            const requirements = {
                reqs: {},
                title: ''
            }

            for (let i = 0; i < database.requirements.length; i++) {
                const data = database.requirements[i].answerSheet

                if (Array.isArray(data)) {
                    requirements['reqs'][database.requirements[i].view] = methods.fillArray(data.length)
                } else {
                    requirements['reqs'][database.requirements[i].view] = null
                }
            }

            database.lengthRoom.value = +database.lengthRoom.value + 1
            database.valuesRequirements.value[database.lengthRoom.value - 1] = requirements
        },
        fillArray: (legnth) => {
            const vector = []

            for (let i = 0; i < length; i++) {
                vector.push(null)
            }

            return vector
        },
        removeRoom: (database, index, modalParams) => {
            const namespace = modalParams.projectId + '_' + modalParams.groupQuestion + '_REQS' 

            const entity = {
                hashId: database.id,
                reqId: index,
            }

            storage.removeReq(namespace, entity).then((data) => {
                database.lengthRoom.value = +database.lengthRoom.value - 1
                database.valuesRequirements.value.splice(index, 1)

                if (!database.lengthRoom.value) {
                    router.go(-1)
                    database.lengthRoom.value = ''
                }
            })
        },
        openRequirements: (indexQuestion) => {
            modal.value = true
            modalParams.value.indexQuestion = indexQuestion
        },
        getDataRequerements: (data, viewName, modalParams, hashId) => {
            const namespace = modalParams.projectId + '_' + modalParams.groupQuestion + '_REQS'

            const entity = {
                hashId: hashId,
                reqId: modalParams.indexQuestion,
                viewId: viewName,
                data,
            }

            storage.createReq(namespace, entity)
        }
    }

    methods.fillValuesRequirements(
        questionDatabase, 
        modalParams
    )
</script>

<style scoped>
    #appv-content {
        padding: 10px 20px 10px 20px;
    }

    #appv-block.wrapper {
        width: 100%;
        height: 60px;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        overflow: hidden;
        background: #ffffff;
        border-radius: 4px;
        cursor: pointer;
        margin-top: 20px;
    }

    #appv-block.button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: inherit;
        
    }

    #appv-block.button ion-icon { font-size: 1.2em; }

    #appv-block.title {
        width: calc(100% - 50px);
        height: inherit;
        line-height: 60px;
        padding-left: 20px;
        padding-right: 20px;
        font-weight: 600;
        text-transform: uppercase;
    }

    #appv-block.button, 
    #appv-block.title { float: left; }

    #appv-button.button { margin-top: 20px; }
</style>