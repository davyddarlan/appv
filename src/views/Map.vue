<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.closeProject" :icon="closeOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Menu
            </template>
            <template v-slot:subheader>
                Menu para análise de projeto e fiscalização
            </template>
            <template v-slot:content>
                <!-- início conteúdo -->
                <div id="appv-box-wrapper">
                    <h1 id="appv-title" class="title">BEM-VINDO AO MENU DE NAVEGAÇÃO DA USF: <span id="appv-title" class="name">{{ name }}</span></h1>
                    <div>
                        <div @click="methods.goToQuestions(index, grupo)" v-for="(grupo, index) in questionsStorage.project.data" class="box ion-activatable" :class="{ activeParecer: index == 'PC' }">
                            <IonIcon v-if="grupo.percentage != 1 && index == 'PC'" class="lock-icon" :icon="lockClosedSharp"></IonIcon>
                            <IonIcon v-if="grupo.percentage == 1" class="right-icon" :icon="checkmarkDoneSharp"></IonIcon>
                            <span class="progress">{{ methods.formatPercentage(index, grupo.percentage) }} preenchido</span>
                            <span class="title">{{ grupo.title }}</span>
                            <IonRippleEffect></IonRippleEffect>
                        </div>
                    </div>
                    <ion-fab slot="fixed" vertical="bottom" horizontal="end">
                        <ion-fab-button @click="methods.editProfile">
                            <ion-icon :icon="settingsOutline"></ion-icon>
                        </ion-fab-button>
                    </ion-fab>
                </div>
                <IonToast
                    :is-open="toastController.isOpen.value"
                    :message="toastController.message"
                    :duration="toastController.duration"
                    @didDismiss="toastController.didDismiss"
                ></IonToast>
                <!-- fim conteúdo -->
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref } from 'vue'

    import { useRouter } from 'vue-router'

    import { 
        IonIcon,
        IonRippleEffect,
        IonPage,
        IonButton,
        onIonViewWillEnter,
        IonToast,
        IonFab,
        IonFabButton,
    } from '@ionic/vue'

    import { 
        closeOutline,
        lockClosedSharp,
        checkmarkDoneSharp,
        settingsOutline,
        informationCircleOutline,
    } from 'ionicons/icons';
    
    import MainLayout from '@/components/layout/main-layout.vue';

    const questionsStorage = inject('questions')
    const name = questionsStorage.project.name

    const router = useRouter()

    onIonViewWillEnter(() => {
        const group = ['ADM', 'AC', 'AO', 'AP', 'PC']
        const percentage = methods.getPercentage(questionsStorage.project.data)

        for (let i = 0; i < group.length; i++) {
            questionsStorage.project.data[group[i]].percentage = percentage[group[i]]
        }
    })

    const toastController = {
        isOpen: ref(false),
        duration: 0,
        message: '',
        didDismiss: () => {
            toastController.isOpen.value = false
        }
    }

    const methods = {
        getPercentage: (storage) => {
            const group = ['ADM', 'AC', 'AO', 'AP']
            const percetageGroup = {}
            let questionsGroup = null
            let sumTotal = 0

            for (let i = 0; i < group.length; i++) {
                let percentageQuestion = 0
                questionsGroup = storage[group[i]].questions
            
                for (let j = 0; j < questionsGroup.length; j++) {
                    if (questionsGroup[j].value.value == 0) {
                        percentageQuestion++
                    } else if (questionsGroup[j].value.value == 1 && questionsGroup[j].lengthRoom.value > 0) {
                        percentageQuestion += methods.getReqPercentage(questionsGroup[j].valuesRequirements.value, questionsGroup[j].lengthRoom.value)
                    }
                }

                sumTotal += (percentageQuestion / questionsGroup.length)
                percetageGroup[group[i]] = percentageQuestion / questionsGroup.length
            }

            percetageGroup['PC'] = sumTotal / group.length

            return percetageGroup
        },
        getReqPercentage: (reqs, lenthRoom) => {
            let countGroup = 0

            for (let req in reqs) {
                let countReqGroup = 0
                let totalReqGroup = 0
                let groupReqs = reqs[req].reqs
                
                for (let reqKey in groupReqs) {
                    totalReqGroup++

                    if (groupReqs[reqKey] instanceof Array) {
                        let isFill = true 

                        for (let i = 0; i < groupReqs[reqKey].length; i++) {
                            if (groupReqs[reqKey][i] == null) {
                                isFill = false
                                break
                            }
                        }

                        if (!groupReqs[reqKey].length) {
                            isFill = false
                        }

                        if (isFill) {
                            countReqGroup++
                        }
                    } else {
                        if (groupReqs[reqKey] != null) {
                            countReqGroup++
                        }
                    }
                }

                countGroup += countReqGroup / totalReqGroup
            }

            return countGroup / lenthRoom
        },
        formatPercentage: (group, percentage) => {
            percentage *= 100 

            if ((/\d+\./).test(percentage)) {
                percentage = percentage.toFixed(2)
            }

            return percentage + '%'
        },
        goToQuestions: (key, group) => {
            if (key != 'PC') {
                router.push({
                    path: '/questions',
                    query: {
                        groupQuestions: group.group,
                    }
                })
            } else {
                if (group.percentage != 1) {
                    toastController.isOpen.value = true
                    toastController.message = "Acesso restrito: complete o preenchimento de todos os ambientes"
                    toastController.duration = 3000
                } else {
                    router.push('parecer')
                }
            }
        },
        editProfile: () => {
            router.push({
                path: '/nova-compatibilizacao',
                query: {
                    edit: true,
                }
            })
        },
        closeProject: () => {
            router.replace('/')  
        },
    }
</script>

<style scoped>
    #appv-box-wrapper {
        display: table;
        padding: 20px;
        --color-bar: #4a5d88;
        --width-bar: 6px;
        --height-bar: 30px;
        --y-position: 20%;
        --space-between-boxes: 30px;
        width: 100%;
        height: 100%;
    }

    #appv-box-wrapper .box {
        width: 50%;
        height: 100px;
        margin-bottom: var(--space-between-boxes);
        float: left;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        font-size: 0.8em;
    }

    #appv-box-wrapper .box .lock-icon {
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.2em;
        color: #474749;
    }

    #appv-box-wrapper .box .right-icon {
        position: absolute;
        right: 10px;
        top: -12px;
        color: #169642;
        font-size: 1.5em;
    }

    #appv-box-wrapper .box.lock { background: #ededf0 !important; }

    #appv-box-wrapper .box.lock .title { 
        color: #ddd2d7 !important; 
    }

    #appv-box-wrapper .box .title {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 10px;
        font-size: 0.8em;
        font-weight: bold;
        text-transform: uppercase;
        color: #474749;
        font-family: "Livvic", serif;
    }

    #appv-box-wrapper .box .progress {
        font-family: "Livvic", serif;
        font-size: 0.6em;
        padding: 10px;
        color: var(--color-bar);
        font-weight: bold;
    }

    #appv-box-wrapper .box:nth-child(odd) {
        position: relative;
        background: #e7e8ec;
        margin-right: 15px;
        width: calc(50% - 15px);       
    }

    #appv-box-wrapper .box:nth-child(even) {
        position: relative;
        background: #e7e8ec;
        margin-left: 15px;
        width: calc(50% - 15px);       
    }

    .header-map {
        width: 100%;
        display: table;
        margin-bottom: 30px;
    }

    .header-map .title {
        font-size: 1.1em;
        margin: 0;
        width: 80%;
        font-style: italic;
        float: left;
    }
    
    .header-map .button-edit {
        float: right;
    }

    .activeParecer {
        background: #e8dc93 !important;
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

    #appv-config.config-area {
        display: table;
        width: 100%;
        margin-bottom: 30px;
    }

    #appv-config.button-txt { margin-left: 5px; }

    #appv-config ion-button { float: right; }

    #appv-title.title { 
        font-size: 1.2em;
        font-weight: bold;
        margin-bottom: 40px;
        border-left: 10px solid #4a5d88;
        padding-left: 10px;
        text-transform: uppercase;
    }

    #appv-title.name {
        text-transform: uppercase;
        color: #4a5d88;
    }
</style>