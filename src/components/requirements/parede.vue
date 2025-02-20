<template>
    <Question>
        O material de acabamento da parede é impermeável 
        <template v-slot:input>
            <radioQuestion id="parede"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>