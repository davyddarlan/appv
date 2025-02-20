<template>
    <Question>
        O ambiente é uma área molhada
        <template v-slot:input>
            <radioQuestion id="area-molhada"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>