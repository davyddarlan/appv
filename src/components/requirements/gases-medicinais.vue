<template>
    <Question>
        O ambiente possui gases medicinais
        <template v-slot:input>
            <radioQuestion v-model="model" id="gases-medicinais"></radioQuestion>
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
                message = 'É necessário que haja a presença de gases medicinais no ambiente'
            } else {
                message = 'Não é necessário que haja a presença de gases medicinais no ambiente'
            }

            emit('notify', {
                message,
            })
        }
    })
</script>

<style scoped>
</style>