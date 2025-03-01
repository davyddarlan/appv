<template>
    <Question>
        O ambiente possui ventilação natural ou mecânica 
        <template v-slot:input>
            <radioQuestion v-model="model" id="ventilacao"></radioQuestion>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch, defineModel, } from 'vue'
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
                message = 'A ventilação natural ou mecânica é obrigatória'
            } else {
                message = 'A ventilação natural ou mecânica não é obrigatória'
            }

            emit('notify', {
                message,
            })
        }
    })
</script>

<style scoped>
</style>