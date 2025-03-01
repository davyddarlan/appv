<template>
    <Question>
        O ambiente possui bancada com pia de cuba funda
        <template v-slot:input>
            <radioQuestion v-model="model" id="cuba-funda"></radioQuestion>
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
                message = 'É necessário a existência de uma bancada com pia de cuba funda'
            } else {
                message = 'Não é necessário a existência de uma bancada com pia de cuba funda'
            }

            emit('notify', {
                message,
            })
        }
    })
</script>

<style scoped>
</style>