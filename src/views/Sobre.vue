<template>
    <IonPage>
        <SecondLayout>
            <template v-slot:title>
                Sobre o APAF
            </template>
            <template v-slot:content>
                <div id="appv-sobre" class="wrapper">
                    <h1>O quê é o AEAPF?</h1>
                    <p>O APAF é um aplicativo eletrônico para análise de projeto arquitetônico e fiscalização 
                    em estabelecimentos assistenciais de saúde (APAF). 
                    Seu uso tem a função de avaliar as condições de adequação das USF, 
                    permitindo ao profissional da VS identificar as inconformidades, 
                    melhorando sua prática.</p>
                </div>
            </template>
        </SecondLayout>
    </IonPage>
</template>

<script setup>
    import SecondLayout from '../components/layout/second-layout.vue'

    import { 
        IonPage,
    } from '@ionic/vue'
</script>

<style scoped>
    #appv-sobre.wrapper {
        padding: 10px 20px 10px 20px;
    }
</style>