<template>
    <IonPage>
        <SecondLayout>
            <template v-slot:title>
                Lista de projetos
            </template>
            <template v-slot:content>
                <div v-if="isLoadList" class="appv-load">
                    <p>
                        <ion-spinner></ion-spinner>
                        Carregando lista...
                    </p>
                </div>
                <ion-card v-for="project in projects">
                    <ion-card-header>
                    <ion-card-title>{{ project.data.name }}</ion-card-title>
                    <ion-card-subtitle>{{ methods.getStatusProject(project.data.isInLoco) }}</ion-card-subtitle>
                    </ion-card-header>

                    <ion-card-content>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </ion-card-content>

                    <ion-button fill="clear" @click="methods.accessProject(project.key)">Acessar</ion-button>
                    <ion-button fill="clear" @click="methods.removeProject(project.key)">Apagar</ion-button>
                </ion-card>
            </template>
        </SecondLayout>
    </IonPage>
</template>

<script setup>
    import SecondLayout from '../components/layout/second-layout.vue'
    import { inject, ref } from 'vue'
    import { useRouter } from 'vue-router' 
    
    import { 
        IonPage,
        IonCard,
        IonCardHeader,
        IonCardTitle,
        IonCardSubtitle,
        IonCardContent,
        IonButton,
        IonSpinner,
    } from '@ionic/vue'

    const storage = inject('storage')
    const questions = inject('questions')
    const projects = ref({})
    const router = useRouter()    // loading page
    const isLoadList = ref(true)

    const methods = {
        getStatusProject: (data) => {
            return data ? 'Fiscalização de USF' : 'Análise de projeto USF'
        },
        listProjects: (table) => {
            storage.listProjects().then((data) => {
                data.forEach((data, key) => {
                    if (/^e\d+$/.test(key))
                    table[key] = {
                        data,
                        key,
                    }
                });

                setTimeout(() => {
                    isLoadList.value = false
                }, 500)
            })
        },
        accessProject: (key) => {
            storage.accessProject(key).then((data) => {
                storage.setQuestionsData(data, questions.project, key).then(() => {
                    router.push({
                        path: '/map',
                    })
                })
            }, (error) => {
                console.log(error)
            })
        },
        removeProject: (key) => {
            storage.deleteProject(key).then((data) => {
                delete projects.value[key]
            }, (error) => {
                console.log(error)
            })
        },
    }

    methods.listProjects(projects.value)
</script>

<style scoped>
    .appv-load {
        display: grid;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        align-items: center;
        justify-content: center;
    }

    .appv-load ion-spinner {
        vertical-align: middle;
        margin-right: 10px;
    }
</style>