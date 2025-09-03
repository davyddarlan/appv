<template>
    <IonPage>
        <SecondLayout>
            <template v-slot:title>
                FAQ
            </template>
            <template v-slot:content>
                <div id="appv-faq" class="wrapper-content">
                    <ListComponent>
                        <template v-slot:title>O quê é o Visa Estrutural?</template>
                        <template v-slot:content>
                            <div id="appv-faq" class="content-faq">
                                O Visa Estrutual é um aplicativo eletrônico para análise de projeto arquitetônico e fiscalização 
                                em estabelecimentos assistenciais de saúde. 
                                Seu uso tem a função de avaliar as condições de adequação das USF, 
                                permitindo ao profissional da VS identificar as inconformidades, 
                                melhorando sua prática.
                            </div>
                        </template>     
                    </ListComponent>
                    <ListComponent>
                        <template v-slot:title>Como acessar uma análise?</template>
                        <template v-slot:content>
                            <div id="appv-faq" class="content-faq">
                                Para acessar análises anteriores, vá até o menu de navegação inferior do aplicativo e 
                                e selecione a opção "projetos". A tela listará uma série de análises.
                            </div>
                        </template>     
                    </ListComponent>
                    <ListComponent>
                        <template v-slot:title>Como alterar os dados de perfil de uma USF?</template>
                        <template v-slot:content>
                            <div id="appv-faq" class="content-faq">
                                Ao acessar um projeto, na tela "menu para análise de projeto e fiscalização", busque 
                                pelo ícone de engrenagem na cor azul, presente no canto inferior direito da tela. 
                                Ao clicar no ícone, você será levado a tela de edição de perfil de unidade de saúde da 
                                família.
                            </div>
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

    #appv-faq.content-faq {
        padding: 20px;
    }
</style>