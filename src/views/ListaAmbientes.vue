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
                    <div id="appv-info" class="wrapper">
                        <IonIcon id="appv-info" class="icon" :icon="informationCircleOutline"></IonIcon>
                        <p id="appv-info" class="info">
                            Clique em um dos ambientes abaixo para preencher o formulário de requisitos técnico:
                        </p>
                    </div>
                    <template v-for="(room, key, index) in questionDatabase.valuesRequirements.value">
                        <div id="appv-block" class="wrapper">
                            <div @click="methods.openRequirements(key, index)" id="appv-block" class="title">
                                <p class="title">Ambiente {{ index + 1 }}</p>
                                <p class="progress">{{ methods.getPercentage(key) }} preenchido</p>
                            </div>
                            <div @click="methods.removeRoomItem(key, index, modalParams)" id="appv-block" class="button">
                                <IonIcon :icon="trashOutline"></IonIcon>
                            </div>
                        </div>
                    </template>
                    <IonButton @click="methods.addRoom(questionDatabase, modalParams)" expand="block" id="appv-button" class="button">Adicionar um novo ambiente</IonButton>
                    <IonAlert
                        :is-open="alertController.isOpen.value"
                        :header="alertController.title"
                        :message="alertController.message"
                        :buttons="alertController.buttons"
                        @didDismiss="alertController.didDismiss($event)"
                    ></IonAlert>
                    <IonToast
                        :is-open="toastController.isOpen.value"
                        :message="toastController.message"
                        :duration="toastController.duration"
                        @didDismiss="toastController.didDismiss"
                    ></IonToast>
                </div>
                <RequirementsModal :open="modal" @close="modal = false">
                    <template v-slot:title>
                        Ambiente {{ modalParams.countRoom + 1 }}
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
    import { inject, ref, computed } from 'vue'
    import { useRouter, useRoute } from 'vue-router'

    import { 
        IonPage,
        IonIcon,
        IonButton,
        IonAlert,
        IonToast,
    } from '@ionic/vue'

    import { 
        chevronBackOutline,
        trashOutline,
        informationCircleOutline,
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
        roomIndex: null,
        groupQuestion: group,
        projectId: database.project.projectId.value,
        theBiggestIndex: 0,
        countRoom: null
    })

    const alertController = {
        title: 'Atenção!',
        message: 'Você realmente deseja remover este ambiente?',
        buttons: [
            {
                text: 'REMOVER',
                role: 'confirm',
            },
            {
                text: 'NÃO',
                role: 'cancel',
            },
        ],
        isOpen: ref(false),
        didDismiss: (event) => {
            alertController.isOpen.value = false
            const role = event.detail.role

            if (role == 'confirm') {
                methods.removeRoom(questionDatabase, modalParams.value.roomIndex, modalParams.value)
            }
        }
    }

    const toastController = {
        isOpen: ref(false),
        duration: 0,
        message: '',
        didDismiss: () => {
            toastController.isOpen.value = false
        }
    }

    const methods = {
        getPercentage: (index) => {
            let countItens = 0
            let countSets = 0
            let list = questionDatabase.valuesRequirements.value[index].reqs

            for (let key in list) {
                countItens++

                if (list[key] != null) {
                    countSets++
                }
            }

            return countSets / countItens * 100 + '%'
        },
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

                    // captura do maior index
                    if (i > modalParams.value.theBiggestIndex) {
                        modalParams.value.theBiggestIndex = i
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
                    
                }).catch((error) => {
                    
                })
            } else {
                // reinicializa o theBiggestIndex 
                modalParams.value.theBiggestIndex = 0

                // preencher os ambientes existetes
                for (let element in database) {
                    // captura do maior index
                    if (+element > modalParams.value.theBiggestIndex) {
                        modalParams.value.theBiggestIndex = +element
                    }

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
        addRoom: (database, modalParams) => {
            const requirements = {
                reqs: {},
            }

            const namespace = modalParams.projectId + '_' + modalParams.groupQuestion + '_REQS'

            for (let i = 0; i < database.requirements.length; i++) {
                const data = database.requirements[i].answerSheet

                if (Array.isArray(data)) {
                    requirements['reqs'][database.requirements[i].view] = methods.fillArray(data.length)
                } else {
                    requirements['reqs'][database.requirements[i].view] = null
                }
            }

            storage.createNewReq(namespace, database.id, modalParams.theBiggestIndex + 1, requirements).then(() => {
                database.lengthRoom.value = +database.lengthRoom.value + 1
                database.valuesRequirements.value[modalParams.theBiggestIndex + 1] = requirements

                // atualizar the biggestdata
                modalParams.theBiggestIndex += 1 
            })
        },
        fillArray: (legnth) => {
            const vector = []

            for (let i = 0; i < length; i++) {
                vector.push(null)
            }

            return vector
        },
        removeRoomItem: (key, indexRoom, modalParams) => {
            alertController.isOpen.value = true
            alertController.message = `Você realmente deseja remover o ambiente ${indexRoom + 1}`
            modalParams.roomIndex = key
        },
        removeRoom: (database, index, modalParams) => {
            const namespace = modalParams.projectId + '_' + modalParams.groupQuestion + '_REQS' 
            let countRoons = 0

            const entity = {
                hashId: database.id,
                reqId: index,
            }

            storage.removeReq(namespace, entity).then((data) => {
                delete database.valuesRequirements.value[index]
                database.lengthRoom.value = +database.lengthRoom.value - 1
                                
                for (let i in database.valuesRequirements.value) {
                    countRoons++
                }    
                
                if (!countRoons) {
                    modalParams.theBiggestIndex = 0

                    router.go(-1)
                }

                toastController.isOpen.value = true
                toastController.message = 'O ambiente foi removido'
                toastController.duration = 2000
            })
        },
        openRequirements: (keyQuestion, indexQuestion) => {
            modal.value = true
            modalParams.value.indexQuestion = keyQuestion
            modalParams.value.countRoom = indexQuestion
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
        display: flex;
        width: 100%;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        background: #ffffff;
        border-radius: 4px;
        cursor: pointer;
        margin-bottom: 15px;
        align-items: center;
        vertical-align: center;
    }

    #appv-block.title, #appv-block.button {
        float: left;
    }

    #appv-block.title {
        width: calc(100% - 50px);
        padding: 15px;
    }

    #appv-block.button {
        text-align: center;
        line-height: 50px;
        width: 50px;
        height: 50px;
    }

    #appv-block.title .title, 
    #appv-block.title .progress {
        margin: 0;
    }

    #appv-block.title .title {
        font-weight: bold;
        text-transform: uppercase;
        font-size: 0.8em;
    }

    #appv-block.title .progress {
        font-size: 0.7em;
    }

    #appv-button.button {
        margin-top: 20px;
    }

    #appv-info.wrapper {  
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    #appv-info.icon {
        width: 50px;
        height: 50px;
    }

    #appv-info.icon,
    #appv-info.info { float: left; }

    #appv-info.info {
        width: calc(100% - 50px);
        height: auto;
        font-weight: bold;
        font-size: 0.8em;
        margin-left: 10px;
    }
</style>