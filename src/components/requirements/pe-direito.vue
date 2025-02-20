<template>
    <Question>
        Qual é a altura do pé-direito
        <template v-slot:input>
            <IonInput type="number" fill="outline" placeholder="Tamanho da área física"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { IonInput } from '@ionic/vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>