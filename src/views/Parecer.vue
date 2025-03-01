<template>
    <ion-page>
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon @click="methods.goBackNavigation" :icon="chevronBackOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                Parecer técnico
            </template>
            <template v-slot:subheader>
                Resultado da análise
            </template>
            <template v-slot:content>
                <div id="appv-parecer" class="wrapper">
                    <div>
                        <canvas id="myChart"></canvas>
                    </div>
                    <ListComponent>
                        <template v-slot:title>Sala administrativa de gerência</template>
                        <template v-slot:content>
                            <div v-for="(x, index) in 3" id="appv-parecer" class="requirement">
                                <div class="position">{{ index + 1 }}</div>
                                <p class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </template>     
                    </ListComponent>
                    <ListComponent>
                        <template v-slot:title>Sala de nebulização</template>
                        <template v-slot:content>
                            <div v-for="(x, index) in 2" id="appv-parecer" class="requirement">
                                <div class="position">{{ index + 1 }}</div>
                                <p class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </template> 
                    </ListComponent>
                    <ListComponent>
                        <template v-slot:title>Consultório odontológico</template>
                        <template v-slot:content>
                            <div v-for="(x, index) in 1" id="appv-parecer" class="requirement">
                                <div class="position">{{ index + 1 }}</div>
                                <p class="text">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                            </div>
                        </template> 
                    </ListComponent>
                </div>
            </template>
        </MainLayout>
    </ion-page>
</template>

<script setup>
    import { inject, ref, onMounted } from 'vue'
    import { useRouter } from 'vue-router'  

    import { 
        IonIcon,
        IonPage,
    } from '@ionic/vue'

    import { 
        chevronBackOutline
    } from 'ionicons/icons'

    import MainLayout from '@/components/layout/main-layout.vue'
    import ListComponent from '@/components/list/list.vue'

    const router = useRouter()
    const data = inject('questions')

    onMounted(() => {
        const ctx = document.getElementById('myChart');

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Compatível', 'Incompatível'],
                datasets: [{
                    label: 'Requisitos',
                    data: [50, 20],
                    borderWidth: 1,
                    backgroundColor: [
                        '#4a5d88',
                        '#e33922',
                    ],
                    hoverOffset: 4,
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    })

    const methods = {
        goBackNavigation: () => { 
            router.go(-1) 
        },
    }   
</script>

<style scoped>
    #appv-parecer.wrapper {
        padding: 20px;
    }

    #appv-parecer.requirement {
        display: flex;
        align-items: center;
        width: 100%;
        height: auto;
        padding: 5px 15px 5px 15px;
        border-bottom: 1px solid rgba(50, 50, 93, 0.25);
    }

    #appv-parecer.requirement .position {
        width: 40px;
        height: 40px;
        background: #4a5d88;
        border-radius: 50%;
        text-align: center;
        line-height: 40px;
        font-weight: bold;
        color: #ffffff;
    }

    #appv-parecer.requirement .text {
        width: calc(100% - (40px + 20px));
        margin-left: 20px; 
    }

    #appv-parecer.requirement .position,
    #appv-parecer.requirement .text { float: left; }

    #myChart {
        margin-bottom: 20px;
    }
</style>