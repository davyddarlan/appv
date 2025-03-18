<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.closeProject" :icon="closeOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Compatibilização
            </template>
            <template v-slot:subheader>
                Trilha de compatibilização
            </template>
            <template v-slot:content>
                <!-- início conteúdo -->
                <div id="appv-box-wrapper">
                    <div @click="methods.goToQuestions(grupo)" v-for="grupo in questionsStorage.project.data" class="box ion-activatable" :class="{ lock: grupo.lock}">
                        <IonIcon v-if="grupo.lock" class="lock-icon" :icon="lockClosedSharp"></IonIcon>
                        <IonIcon v-if="!grupo.lock && grupo.percentage == 100" class="right-icon" :icon="checkmarkDoneSharp"></IonIcon>
                        <span class="progress" v-if="!grupo.lock">100% concluído</span>
                        <span class="title">{{ grupo.title }}</span>
                        <IonRippleEffect></IonRippleEffect>
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
    } from '@ionic/vue'

    import { 
        closeOutline,
        lockClosedSharp,
        checkmarkDoneSharp,
    } from 'ionicons/icons';
    
    import MainLayout from '@/components/layout/main-layout.vue';

    const questionsStorage = inject('questions')

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
        closeProject: () => {
            router.replace('/')  
        },
    }
</script>

<style scoped>
    #appv-box-wrapper {
        padding: 30px 20px 10px 20px;
        --color-bar: #4a5d88;
        --width-bar: 6px;
        --height-bar: 30px;
        --y-position: 20%;
        --space-between-boxes: 60px;
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
        font-weight: 600;
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

    #appv-box-wrapper .box:nth-child(odd)::before {
        content: '';
        position: absolute;
        right: -30px;
        top: 50%;
        transform: translateY(-3px);
        width: 30px;
        height: var(--width-bar);
        background: var(--color-bar);
    }

    #appv-box-wrapper .box:nth-child(odd)::after {
        content: '';
        position: absolute;
        width: var(--width-bar);
        height: var(--height-bar);
        left: var(--y-position);
        transform: translatex(-3px);
        top: calc(var(--space-between-boxes) / 2 * -1);
        background: var(--color-bar);
    }

    #appv-box-wrapper .box:last-child::before {
        display: none;
    }

    #appv-box-wrapper .box:first-child::after {
        display: none;
    }

    #appv-box-wrapper .box:nth-child(even) {
        position: relative;
        background: #e7e8ec;
        margin-left: 15px;
        width: calc(50% - 15px);       
    }

    #appv-box-wrapper .box:nth-child(even)::before {
        content: '';
        position: absolute;
        width: var(--width-bar);
        height: var(--height-bar);
        background: var(--color-bar);
        right: var(--y-position);
        bottom: calc(var(--space-between-boxes) / 2 * -1);
        transform: translateX(-3px);
    }

    #appv-box-wrapper .box:nth-child(even)::after {
        content: '';
        position: absolute;
        bottom: calc((var(--height-bar) + var(--width-bar)) * -1);
        left: calc(0% - 30px - (100% - 20%));
        width: calc((100% + 30px + (100% - 20%)) - (20% + 3px));
        height: var(--width-bar);
        background: var(--color-bar);
    }
</style>