<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.goToHome" :icon="closeOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Informações da unidade
            </template>
            <template v-slot:subheader>
                Perfil da unidade de saúde da família
            </template>
            <template v-slot:content>
                <div id="appv-nova-compatibilizacao" class="wrapper">
                    <Question>
                        Dê um nome para identificação desta unidade de saúde da família
                        <template v-slot:input>
                            <IonInput v-model="data.name.value" type="text" fill="outline" placeholder="Nome da unidade"></IonInput>
                        </template>
                    </Question>
                    <Question>
                        Esta unidade de saúde é composta por quantas equipes?
                        <template v-slot:input>
                            <IonInput v-model="data.lengthTeam.value" type="number" fill="outline" placeholder="Número de equipes"></IonInput>
                        </template>
                    </Question>
                    <Question>
                        Esta análise de projeto arquitetônico está sendo feita In Loco?
                        <template v-slot:input>
                            <RadioQuestion v-model="data.isInLoco.value"></RadioQuestion>
                        </template>
                    </Question>
                    <IonButton 
                        :disabled="disabled" 
                        @click="methods.iniciar" 
                        id="appv-nova-compatibilizacao" 
                        class="iniciar-btn" 
                        size="full"
                        >Inicializar compatibilização
                    </IonButton>
                </div>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref, onMounted, computed } from 'vue'
    import { useRouter } from 'vue-router'  

    import Question from '../components/question/question.vue'
    import RadioQuestion from '../components/question/radio-question-v2.vue'

    import { 
        IonIcon,
        IonPage,
        IonInput,
        IonButton,
    } from '@ionic/vue'

    import { 
        closeOutline
    } from 'ionicons/icons'

    import MainLayout from '@/components/layout/main-layout.vue'

    const router = useRouter()
    const data = inject('questions').project

    const disabled = computed(() => {
        return data.isInLoco.value == null 
        || !data.lengthTeam.value 
        || data.lengthTeam.value == 0
        || data.name.value == null
        || !data.name.value
    })

    const methods = {
        iniciar: () => {
            router.push({
                path: '/map',
            })
        },
        goToHome: () => {
            router.go(-1)
        },
    }
</script>

<style scoped>
    #appv-nova-compatibilizacao.wrapper {
        padding: 20px;
    }

    #appv-nova-compatibilizacao.iniciar-btn {
        margin-top: 20px;
    }
</style>