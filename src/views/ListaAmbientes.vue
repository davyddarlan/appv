<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.goBackNavigation" :icon="chevronBackOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Verificar requisitos
            </template>
            <template v-slot:subheader>
                {{ questionDatabase.title }}
            </template>
            <template v-slot:content>
                <div id="appv-content">
                    <template v-for="(room, index) in questionDatabase.valuesRequirements.value">
                        <div id="appv-block" class="wrapper">
                            <div @click="methods.openRequirements(index)" id="appv-block" class="title">Ambiente {{ index + 1 }}</div>
                            <div @click="methods.removeRoom(questionDatabase, index)" id="appv-block" class="button">
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
                                    v-model="questionDatabase.valuesRequirements.value[modalParams.indexQuestion][index]"
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

    const router = useRouter()
    const route = useRoute()

    const { group, index } = route.query

    const questionDatabase = database['project']['data'][group]['questions'][index]

    const modal = ref(false)
    const modalParams = ref({
        indexQuestion: 0,
    })

    const methods = {
        goBackNavigation: () => {
            router.go(-1)
        },
        fillValuesRequirements: (database, lengthRoons, requirements) => {
            if (!database.length) {
                for (let i = 0; i < lengthRoons; i++) {
                    database.push([])

                    for (let j = 0; j < requirements.length; j++) {
                        if (requirements[j].answerSheet instanceof Array) {
                            let arrayValues = []
                            let dataLength = requirements[j].answerSheet.length

                            for (let k = 0; k < dataLength; k++) {
                                arrayValues.push(null)
                            }

                            database[i].push(arrayValues)
                        } else {
                            database[i].push(null)    
                        }
                    }
                }  
            }
        },
        addRoom: (database) => {
            const requirements = []

            for (let i = 0; i < database.requirements.length; i++) {
                requirements.push(null)
            }

            database.lengthRoom.value = +database.lengthRoom.value + 1
            database.valuesRequirements.value.push(requirements)
        },
        removeRoom: (database, index) => {
            database.lengthRoom.value = +database.lengthRoom.value - 1
            database.valuesRequirements.value.splice(index, 1)

            if (!database.lengthRoom.value) {
                router.go(-1)
                database.lengthRoom.value = ' '

            }
        },
        openRequirements: (indexQuestion) => {
            modal.value = true
            modalParams.value.indexQuestion = indexQuestion
        },
    }

    methods.fillValuesRequirements(
        questionDatabase.valuesRequirements.value,
        questionDatabase.lengthRoom.value, 
        questionDatabase.requirements
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