<template>
    <Question>
        O ambiente possui ventilação natural ou mecânica 
        <template v-slot:input>
            <radioQuestion id="ventilacao"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>