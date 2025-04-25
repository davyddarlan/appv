<template>
    <IonPage>
        <div id="appv-home" class="wrapper">
            <div id="appv-home" class="content">
                <h1 class="logo">APPV</h1>
                <button @click="methods.createProject" class="start">Analisar USF</button>
            </div>
        </div> 
    </IonPage>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    
    import {
        IonPage,
    } from '@ionic/vue'
 
    const router = useRouter()

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
        font-size: 5em;
        font-weight: bold;
        color: #ffffff;
        margin-bottom: 20px;
    }

    #appv-home.content .start {
        font-size: 'Open Sans';
        font-size: 1.4em;
        padding: 10px 12px 10px 12px;
        border-radius: 5px;
        color: #ffffff;
        background: #4a5d88;
    }
</style>