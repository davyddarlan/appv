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
                <div id="appv" class="wrapper-content">
                    <ion-card v-for="project in projects">
                        <ion-card-header>
                        <ion-card-title>Projeto: {{ project.data.name }}</ion-card-title>
                        <ion-card-subtitle>{{ methods.getStatusProject(project.data.isInLoco) }}</ion-card-subtitle>
                        </ion-card-header>
                        <div style="margin: 10px;">
                            <ion-button size="small" class="project-btn" fill="clear" @click="methods.accessProject(project.key)">Acessar</ion-button>
                            <ion-button size="small" class="project-btn delete" fill="clear" @click="methods.removeProjectHandler(project.key)">Remover</ion-button>
                        </div>
                    </ion-card>
                </div>
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
        IonAlert,
        IonToast,
    } from '@ionic/vue'

    const storage = inject('storage')
    const questions = inject('questions')
    const projects = ref({})
    const router = useRouter()    // loading page
    const isLoadList = ref(true)

    const alertController = {
        title: 'Atenção!',
        message: 'Você realmente deseja remover este projeto?',
        buttons: [
            {
                text: 'NÃO',
                role: 'cancel',
            },
            {
                text: 'REMOVER',
                role: 'confirm',
            },
        ],
        isOpen: ref(false),
        didDismiss: (event) => {
            alertController.isOpen.value = false
            const role = event.detail.role

            if (role == 'confirm') {
                methods.removeProject(alertController.key)
            }
        },
        key: null,
    }

    const toastController = {
        isOpen: ref(false),
        duration: 0,
        message: '',
        didDismiss: () => {
            toastController.isOpen.value = false
        }
    }

    const hasProject = computed(() => {
        let count = 0; 

        for (let i in projects.value) {
            count++
        }

        return count
    })

    const methods = {
        getStatusProject: (data) => {
            return +data ? 'Fiscalização de USF' : 'Análise de projeto USF'
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
                toastController.isOpen.value = true
                toastController.message = 'O projeto foi removido'
                toastController.duration = 2000
            }, (error) => {
                
            })
        },
        removeProjectHandler: (key) => {
            alertController.isOpen.value = true
            alertController.key = key
        },
    }

    onIonViewWillEnter(() => {
        methods.listProjects(projects.value)
    })
</script>

<style scoped>
    .appv-load {
        display: flex;
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

    .project-btn.delete {
        --background: #e33922;
    }

    ion-card-title {
        font-weight: bold;
        font-size: 1.5em;
        text-transform: uppercase;
        color: #420000;
    }
</style>