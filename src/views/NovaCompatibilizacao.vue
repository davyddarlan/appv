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
                <span v-if="!isEdit">Perfil da unidade de saúde da família</span>
                <span v-else="isEdit">Editar perfil da unidade de saúde da família</span>
            </template>
            <template v-slot:content>
                <div id="appv-nova-compatibilizacao" class="wrapper">
                    <h3 v-if="!isEdit" style="margin-top: 0; font-weight: bold;">
                        Preencha o formulário abaixo para iniciar a análise da USF (Unidade de Saúde da Família):
                    </h3>
                    <h3 v-if="isEdit" style="margin-top: 0; font-weight: bold;">
                        Preencha o formulário abaixo caso queira reconfigurar o perfil de análise da USF (Unidade de Saúde da Família):
                    </h3>
                    <Question>
                        Dê um nome para identificação desta unidade de saúde da família
                        <template v-slot:input>
                            <IonInput v-model="data.name.value" type="text" fill="outline" placeholder="Nome da unidade"></IonInput>
                        </template>
                    </Question>
                    <Question>
                        Esta unidade de saúde é composta por quantas equipes?
                        <template v-slot:input>
                            <ion-select v-model="data.lengthTeam.value" label="Número de equipes" placeholder="Selecione o número de equipes">
                                <ion-select-option value="1">1 Equipe</ion-select-option>
                                <ion-select-option value="2">2 Equipes</ion-select-option>
                                <ion-select-option value="3">3 Equipes</ion-select-option>
                                <ion-select-option value="4">4 Equipes</ion-select-option>
                                <ion-select-option value="5">5 Equipes</ion-select-option>
                            </ion-select>
                            <!--<IonInput v-model="data.lengthTeam.value" type="number" fill="outline" placeholder="Número de equipes"></IonInput>-->
                        </template>
                    </Question>
                    <Question>
                        Esta unidade de saúde da família realiza atividades odontológicas?
                        <template v-slot:input>
                            <RadioQuestion v-model="data.odontologico.value"></RadioQuestion>
                        </template>
                    </Question>
                    <Question>
                        Qual o tipo de parecer técnico que deseja obter?
                        <template v-slot:input>
                            <ion-select v-model="data.isInLoco.value" label="Tipo de parecer" placeholder="Selecione o objetivo">
                                <ion-select-option value="0">Análise de um projeto de USF</ion-select-option>
                                <ion-select-option value="1">Fiscalização de uma USF existente</ion-select-option>
                            </ion-select>
                        </template>
                    </Question>
                    <IonButton 
                        :disabled="disabled" 
                        @click="methods.iniciar" 
                        id="appv-nova-compatibilizacao" 
                        class="iniciar-btn" 
                        expand="block"
                        v-if="!isEdit"
                        >Inicializar compatibilização
                    </IonButton>
                    <IonButton 
                        :disabled="disabled" 
                        id="appv-nova-compatibilizacao" 
                        class="iniciar-btn" 
                        expand="block"
                        v-if="isEdit"
                        >Salvar alteração
                    </IonButton>
                </div>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, computed } from 'vue'
    import { useRouter, useRoute } from 'vue-router'  

    import Question from '../components/question/question.vue'
    import RadioQuestion from '../components/question/radio-question-v2.vue'

    import { 
        IonIcon,
        IonPage,
        IonInput,
        IonButton,
        IonSelect,
        IonSelectOption,
    } from '@ionic/vue'

    import { 
        closeOutline
    } from 'ionicons/icons'

    import MainLayout from '@/components/layout/main-layout.vue'

    const router = useRouter()
    const route = useRoute()
    const data = inject('questions').project
    const storage = inject('storage')

    const isEdit = computed(() => {
        if (route.query.edit) {
            return true
        } else {
            return false
        }
    })

    const disabled = computed(() => {
        return data.isInLoco.value == null 
        || !data.lengthTeam.value 
        || data.lengthTeam.value == 0
        || data.name.value == null
        || !data.name.value
        || data.odontologico.value == null
    })

    const methods = {
        iniciar: () => {
            storage.createProject({
                name: data.name.value,
                lengthTeam: +data.lengthTeam.value,
                isInLoco: data.isInLoco.value,
                odontologico: data.odontologico.value,
            }).then((dataReturn) => {
                data.projectId.value = dataReturn.key
            
                router.push({
                    path: '/map',
                })
            })
        },
        editProject: () => {

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