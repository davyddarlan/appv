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
                <div class="appv-alert-project" v-if="!hasProject">
                    <p>Não há qualquer projeto criado</p>
                    
                </div>
                <ion-card v-for="project in projects">
                    <ion-card-header>
                    <ion-card-title>{{ project.data.name }}</ion-card-title>
                    <ion-card-subtitle>{{ methods.getStatusProject(project.data.isInLoco) }}</ion-card-subtitle>
                    </ion-card-header>

                    <!--<ion-card-content>
                        Here's a small text description for the card content. Nothing more, nothing less.
                    </ion-card-content>-->

                    <div style="margin: 10px;">
                        <ion-button class="project-btn" fill="clear" @click="methods.accessProject(project.key)">Acessar</ion-button>
                        <ion-button class="project-btn" fill="clear" @click="methods.removeProject(project.key)">Apagar</ion-button>
                    </div>
                </ion-card>
            </template>
        </SecondLayout>
    </IonPage>
</template>

<script setup>
    import SecondLayout from '../components/layout/second-layout.vue'
    import { inject, ref, computed } from 'vue'
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
        onIonViewWillEnter,
    } from '@ionic/vue'

    const storage = inject('storage')
    const questions = inject('questions')
    const projects = ref({})
    const router = useRouter()    // loading page
    const isLoadList = ref(true)

    const hasProject = computed(() => {
        let count = 0; 

        for (let i in projects.value) {
            count++
        }

        return count
    })

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
                
            })
        },
        removeProject: (key) => {
            storage.deleteProject(key).then((data) => {
                delete projects.value[key]
            }, (error) => {
                
            })
        },
    }

    onIonViewWillEnter(() => {
        methods.listProjects(projects.value)
    })
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

    .appv-alert-project {
        width: 100%;
        height: 100%;
        display: flex;
        vertical-align: center;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    .project-btn {
        color: #ffffff;
    }
</style>