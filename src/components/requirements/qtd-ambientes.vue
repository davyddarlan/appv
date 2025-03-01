<template>
    <Question>
        Qual a quantidade de ambientes?
        <template v-slot:input>
            <IonInput v-model="model" type="number" fill="outline" placeholder="Quantidade de espaços"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch, defineModel, } from 'vue'
    import { IonInput } from '@ionic/vue';
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
            emit('notify', {
                message: `
                    A quantidade de ambientes está inconforme
                `
            })
        }
    })
</script>

<style scoped>
</style>