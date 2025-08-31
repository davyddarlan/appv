<template>
    <IonPage>
        <SecondLayout>
            <template v-slot:title>
                FAQ
            </template>
            <template v-slot:content>
                <div id="appv-faq" class="wrapper-content">
                    <ListComponent>
                        <template v-slot:title>O quê é o AEAPF?</template>
                        <template v-slot:content>
                            <p>O APAF é um aplicativo eletrônico para análise de projeto arquitetônico e fiscalização 
                            em estabelecimentos assistenciais de saúde (APAF). 
                            Seu uso tem a função de avaliar as condições de adequação das USF, 
                            permitindo ao profissional da VS identificar as inconformidades, 
                            melhorando sua prática.</p>
                        </template>     
                    </ListComponent>
                </div>
            </template>
        </SecondLayout>
    </IonPage>
</template>

<script setup>
    import SecondLayout from '../components/layout/second-layout.vue'
    import ListComponent from '@/components/list/list.vue'

    import { 
        IonPage,
    } from '@ionic/vue'
</script>

<style scoped>
    #appv-faq.wrapper-content {
        padding: 20px;
    }
</style>