<template>
    <Question>
        O ambiente possui ducha para lavagem ou descarga
        <template v-slot:input>
            <radioQuestion v-model="model" id="ducha"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineModel, defineEmits, watch } from 'vue'
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

    const emits = defineEmits(['setData'])

    watch(() => model.value, (data) => {
        emits('setData', data)
    })
</script>

<style scoped>
</style>