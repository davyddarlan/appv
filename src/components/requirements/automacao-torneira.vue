<template>
    <Question>
        O lavatório possui torneira que dispense o uso das mãos para ligar e desligar
        <template v-slot:input>
            <radioQuestion id="automacao-torneira"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>