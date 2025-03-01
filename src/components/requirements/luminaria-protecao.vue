<template>
    <Question>
        O ambiente possui luminárias com proteção contra quedas, acidentes e explosões
        <template v-slot:input>
            <radioQuestion v-model="model" id="luminaria"></radioQuestion>
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

    const model =defineModel({
        default: null,
    })

    watch(() => model.value, (data) => {
        if (props.answerSheet != data) {
            let message

            if (props.answerSheet) {
                message = 'É preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            } else {
                message = 'Não é preciso que o ambiente possua luminárias com proteção contra quedas, acidentes e explosões'
            }

            emit('notify', {
                message,
            })
        }
    })
</script>

<style scoped>
</style>