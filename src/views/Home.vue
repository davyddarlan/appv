<template>
    <IonPage>
        <div id="appv-home" class="wrapper">
            <div id="appv-home" class="content">
                <h1 class="logo">
                    <span>VISA</span><span>ESTRUTURAL</span>
                </h1>
                <button @click="methods.createProject" class="start">Analisar USF</button>
            </div>
        </div> 
    </IonPage>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    import { inject } from 'vue'
    import { onIonViewWillEnter } from '@ionic/vue'
    
    import {
        IonPage,
    } from '@ionic/vue'
 
    const router = useRouter()
    const storage = inject('storage')
    const questions = inject('questions')

    onIonViewWillEnter(() => {
        storage.resetQuestionsData(questions.project)
    })

    const methods = {
        createProject: () => {
            router.push('/nova-compatibilizacao')
        },
    }
</script>

<style scoped>
    #appv-home.wrapper {
        position: relative;
        display: grid;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #e33922;
        background-size: contain;
        background-repeat: no-repeat;
    }

    #appv-home.content {
        display: grid;
        justify-content: center;
    }

    #appv-home.content .logo {
        font-family: "Livvic", serif;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 30px;
        border-left: 8px solid #4a5d88;
        padding-left: 15px;
    }

    #appv-home.content .start {
        font-size: 'Open Sans';
        font-size: 1.4em;
        padding: 10px 12px 10px 12px;
        border-radius: 5px;
        color: #ffffff;
        background: #4a5d88;
        text-transform: uppercase;
    }

    .logo span:first-child,
    .logo span:last-child {
        display: block;
    }

    .logo span:first-child {
        font-size: 3em;
        line-height: 0.9em;
    }

    .logo span:last-child {
        font-size: 1.5em;
    }
</style>