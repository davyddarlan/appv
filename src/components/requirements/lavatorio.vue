<template>
    <Question>
        O ambiente possuí lavatório 
        <template v-slot:input>
            <radioQuestion v-model="model" id="lavatorio"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch, defineModel } from 'vue'
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'

    const props = defineProps({
        answerSheet: {
            required: true,
        }
    })

    const emit = defineEmits(['notify'])

    const model = defineModel({
        default: null,
    })

    watch(() => model.value, (data) => {
        if (props.answerSheet != data) {
            let message

            if (props.answerSheet) {
                message = 'O uso do lavatório é obrigatório'
            } else {
                message = 'O ambiente possui um lavatório, porém não é necessário'
            }

            emit('notify', {
                message,
            })
        }
    })
</script>

<style scoped>
</style>