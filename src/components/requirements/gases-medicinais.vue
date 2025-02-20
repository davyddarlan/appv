<template>
    <Question>
        O ambiente possui gases medicinais
        <template v-slot:input>
            <radioQuestion id="gases-medicinais"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>