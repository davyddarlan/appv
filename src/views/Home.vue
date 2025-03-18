<template>
    <IonPage>
        <h1>Tela de apresentação</h1>
        <IonButton @click="methods.createProject">Criar novo projeto</IonButton>
    </IonPage>
</template>

<script setup>
    import { useRouter } from 'vue-router'
    
    import {
        IonPage,
        IonButton,
    } from '@ionic/vue'
 
    const router = useRouter()

    const methods = {
        createProject: () => {
            router.push('/nova-compatibilizacao')
        }
    }
</script>