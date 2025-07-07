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
                    <div class="header-map">
                        <p class="title">Você está no menu de projeto e fiscalização: <b>{{ name }}.</b>
                        Siga as etapas dos itens abaixo para obter o parecer técnico desta USF.
                        </p>
                        <div class="button-edit">
                            <ion-button size="small" @click="methods.editProfile">
                                <ion-icon slot="icon-only" :icon="settingsOutline"></ion-icon>
                            </ion-button>
                        </div>
                    </div>
                    <div>
                        <div @click="methods.goToQuestions(grupo)" v-for="grupo in questionsStorage.project.data" class="box ion-activatable" :class="{ lock: grupo.lock}">
                            <IonIcon v-if="grupo.lock" class="lock-icon" :icon="lockClosedSharp"></IonIcon>
                            <IonIcon v-if="!grupo.lock && grupo.percentage == 100" class="right-icon" :icon="checkmarkDoneSharp"></IonIcon>
                            <span class="progress" v-if="!grupo.lock">100% concluído</span>
                            <span class="title">{{ grupo.title }}</span>
                            <IonRippleEffect></IonRippleEffect>
                        </div>
                    </div>
                </div>
                <!-- fim conteúdo -->
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject } from 'vue'

    import { useRouter } from 'vue-router'

    import { 
        IonIcon,
        IonRippleEffect,
        IonPage,
        IonButton,
    } from '@ionic/vue'

    import { 
        closeOutline,
        lockClosedSharp,
        checkmarkDoneSharp,
        settingsOutline,
    } from 'ionicons/icons';
    
    import MainLayout from '@/components/layout/main-layout.vue';

    const questionsStorage = inject('questions')
    const name = questionsStorage.project.name

    const router = useRouter()

    const methods = {
        goToQuestions: (group) => {
            if (!group.lock) {
                if (!group.page) {
                    router.push({
                        path: '/questions',
                        query: {
                            groupQuestions: group.group,
                        }
                    })
                } else {
                    if (group.page == 'parecer') {
                        router.push('parecer')
                    }
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
    }

    #appv-box-wrapper .box .lock-icon {
        position: absolute;
        top: 10px;
        left: 5px;
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

    #appv-box-wrapper .box.lock .title { color: #ddd2d7 !important; }

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
</style>