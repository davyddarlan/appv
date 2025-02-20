<template>
    <Question>
        O material de acabamento do teto é impermeável 
        <template v-slot:input>
            <radioQuestion id="teto"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>