<template>
    <Question>
        O ambiente possui luminárias com proteção contra quedas, acidentes e explosões
        <template v-slot:input>
            <radioQuestion id="luminaria"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>