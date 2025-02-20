<template>
    <Question>
        Qual a quantidade de ambientes?
        <template v-slot:input>
            <IonInput type="number" fill="outline" placeholder="Quantidade de espaços"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { IonInput } from '@ionic/vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>