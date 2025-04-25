<template>
    <IonPage>
        <SecondLayout>
            <template v-slot:title>
                Lista de projetos
            </template>
        </SecondLayout>
    </IonPage>
</template>

<script setup>
    import SecondLayout from '../components/layout/second-layout.vue'
    import { inject } from 'vue'

    const storage = inject('storage')

    storage.listProjects()

    import { 
        IonPage,
    } from '@ionic/vue'
</script>