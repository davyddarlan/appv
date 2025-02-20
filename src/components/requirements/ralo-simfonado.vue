<template>
    <Question>
        O ambiente possui ralo com tampa escamotável
        <template v-slot:input>
            <radioQuestion id="ralo"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>