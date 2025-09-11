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
                    <div id="appv-info" class="wrapper">
                        <IonIcon id="appv-info" class="icon" :icon="informationCircleOutline"></IonIcon>
                        <p id="appv-info" class="info">
                            <p v-if="!isEdit">Preencha o formulário abaixo para iniciar a análise da USF (Unidade de Saúde da Família)</p>
                            <p v-if="isEdit">Preencha o formulário abaixo para alterar o perfil de análise da USF (Unidade de Saúde da Família)</p>
                        </p>
                    </div>
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
                    <Question>
                        As atividades de recepção, lavagem
                        e descontaminação de instrumentos são realizadas por esta USF
                        <template v-slot:input>
                            <RadioQuestion v-model="data.centralizacao_rep.value"></RadioQuestion>
                        </template>
                    </Question>
                    <Question>
                        A atividade de esterelização de instrumentos é realizada por esta USF
                        <template v-slot:input>
                            <RadioQuestion v-model="data.centralizacao_est.value"></RadioQuestion>
                        </template>
                    </Question>
                    <Question>
                        A armazenagem de medicamentos ocorre de forma centralizada, no município
                        em que esta unidade opera
                        <template v-slot:input>
                            <RadioQuestion v-model="data.centralizacao_armazenagem.value"></RadioQuestion>
                        </template>
                    </Question>
                    <IonButton 
                        :disabled="disabled" 
                        @click="methods.iniciar" 
                        id="appv-nova-compatibilizacao" 
                        class="iniciar-btn" 
                        expand="block"
                        v-if="!isEdit"
                        >Iniciar análise / fiscalização
                    </IonButton>
                    <IonButton 
                        :disabled="formWasChange" 
                        id="appv-nova-compatibilizacao" 
                        class="iniciar-btn" 
                        expand="block"
                        v-if="isEdit"
                        @click="methods.editProject"
                        >Salvar alteração
                    </IonButton>
                    <IonToast
                        :is-open="toastController.isOpen.value"
                        :message="toastController.message"
                        :duration="toastController.duration"
                        @didDismiss="toastController.didDismiss"
                    ></IonToast>
                    <IonAlert
                        :is-open="alertController.isOpen.value"
                        :header="alertController.title"
                        :message="alertController.message"
                        :buttons="alertController.buttons"
                        @didDismiss="alertController.didDismiss($event)"
                    ></IonAlert>
                </div>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, computed, ref, reactive } from 'vue'
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
        IonToast,
        IonAlert,
        onIonViewWillEnter,
    } from '@ionic/vue'

    import { 
        closeOutline,
        informationCircleOutline,
    } from 'ionicons/icons'

    import MainLayout from '@/components/layout/main-layout.vue'

    const router = useRouter()
    const route = useRoute()
    const data = inject('questions').project
    const storage = inject('storage')

    const auxDataForm = reactive({
        isInLoco: null,
        lengthTeam: null,
        name: null,
        odontologico: null,
        centralizacao_rep: null,
        centralizacao_est: null,
        centralizacao_armazenagem: null,
    })

    const toastController = {
        isOpen: ref(false),
        duration: 0,
        message: '',
        didDismiss: () => {
            toastController.isOpen.value = false
        }
    }

    const alertController = {
        title: 'Atenção!',
        message: 'Você realmente deseja sair sem salvar as alterações?',
        buttons: [
            {
                text: 'SIM',
                role: 'confirm',
            },
            {
                text: 'NÃO',
                role: 'cancel',
            },
        ],
        isOpen: ref(false),
        didDismiss: (event) => {
            alertController.isOpen.value = false

            if (event.detail.role == 'confirm') {
                data.isInLoco.value = auxDataForm.isInLoco
                data.lengthTeam.value = auxDataForm.lengthTeam
                data.name.value = auxDataForm.name
                data.odontologico.value = auxDataForm.odontologico
                data.centralizacao_rep.value = auxDataForm.centralizacao_rep
                data.centralizacao_est.value = auxDataForm.centralizacao_est
                data.centralizacao_armazenagem.value = auxDataForm.centralizacao_armazenagem

                router.replace('/map')
            }
        }
    }

    onIonViewWillEnter(() => {
        if (route.query.edit) {
            auxDataForm.isInLoco = data.isInLoco.value,
            auxDataForm.lengthTeam = data.lengthTeam.value,
            auxDataForm.name = data.name.value,
            auxDataForm.odontologico = data.odontologico.value
            auxDataForm.centralizacao_rep = data.centralizacao_rep.value
            auxDataForm.centralizacao_est = data.centralizacao_est.value
            auxDataForm.centralizacao_armazenagem = data.centralizacao_armazenagem.value
        }
    })

    const isEdit = computed(() => {
        if (route.query.edit) {
            return true
        } else {
            return false
        }
    })

    const formWasChange = computed(() => {
        return (auxDataForm.isInLoco == data.isInLoco.value 
        && auxDataForm.lengthTeam == data.lengthTeam.value
        && auxDataForm.name == data.name.value
        && auxDataForm.odontologico == data.odontologico.value
        && auxDataForm.centralizacao_rep == data.centralizacao_rep.value
        && auxDataForm.centralizacao_est == data.centralizacao_est.value
        && auxDataForm.centralizacao_armazenagem == data.centralizacao_armazenagem.value)
        || data.name.value == ''
    })

    const disabled = computed(() => {
        return data.isInLoco.value == null 
        || !data.lengthTeam.value 
        || data.lengthTeam.value == 0
        || data.name.value == null
        || !data.name.value
        || data.odontologico.value == null
        || data.centralizacao_rep.value == null
        || data.centralizacao_est.value == null
        || data.centralizacao_armazenagem.value == null
    })

    const methods = {
        iniciar: () => {
            storage.createProject({
                name: data.name.value,
                lengthTeam: +data.lengthTeam.value,
                isInLoco: data.isInLoco.value,
                odontologico: data.odontologico.value,
                centralizacao_rep: data.centralizacao_rep.value,
                centralizacao_est: data.centralizacao_est.value,
                centralizacao_armazenagem: data.centralizacao_armazenagem.value,
            }).then((dataReturn) => {
                data.projectId.value = dataReturn.key
            
                router.push({
                    path: '/map',
                })
            })
        },
        editProject: () => {
            const updateData = {
                name: data.name.value,
                lengthTeam: data.lengthTeam.value,
                isInLoco: data.isInLoco.value,
                odontologico: data.odontologico.value,
                centralizacao_rep: data.centralizacao_rep.value,
                centralizacao_est: data.centralizacao_est.value,
                centralizacao_armazenagem: data.centralizacao_armazenagem.value,
            }

            storage.updateProject(updateData, data.projectId.value).then(() => {
                toastController.isOpen.value = true
                toastController.message = 'O perfil da USF foi alterado'
                toastController.duration = 2000

                router.replace('/map')
            })
        },
        goToHome: () => {
            if (isEdit.value) {
                if (!formWasChange.value || disabled.value) {
                    alertController.isOpen.value = true
                } else {
                    router.replace('/map')
                }
            } else {
                router.go(-1)   
            }
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

    #appv-info.wrapper {  
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    #appv-info.icon {
        width: 50px;
        height: 50px;
    }

    #appv-info.icon,
    #appv-info.info { float: left; }

    #appv-info.info {
        width: calc(100% - 50px);
        height: auto;
        font-weight: bold;
        font-size: 0.8em;
        margin-left: 10px;
    }

    #appv-info.info * { margin: 0; }
</style>