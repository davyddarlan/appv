<template>
    <Question>
        O ambiente possuí lavatório 
        <template v-slot:input>
            <radioQuestion id="lavatorio"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import radioQuestion from '../question/radio-question.vue';
    import Question from '../question/question.vue'
</script>

<style scoped>
</style>