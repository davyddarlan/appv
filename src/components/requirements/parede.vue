<template>
    <Question>
        O material de acabamento da parede é impermeável 
        <template v-slot:input>
            <radioQuestion v-model="model" id="parede"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineModel } from 'vue'
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'

    const props = defineProps({
        answerSheet: {
            required: true,
        }
    })

    const model = defineModel({
        default: null,
    })
</script>

<style scoped>
</style>