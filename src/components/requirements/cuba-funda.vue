<template>
    <Question>
        O ambiente possui bancada com pia de cuba funda
        <template v-slot:input>
            <radioQuestion id="cuba-funda"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>