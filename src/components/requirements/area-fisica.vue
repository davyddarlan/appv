<template>
    <Question>
        Qual a área física do espaço
        <template v-slot:input>
            <IonInput v-model="model" type="number" fill="outline" placeholder="Tamanho da área física"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineEmits, defineModel, watch } from 'vue'
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
        if (data < props.answerSheet) {
            emit('notify', {
                message: 'A área física do ambiente deve ser maior ou igual a ' + props.answerSheet + 'm²'
            })
        }
    })
</script>

<style scoped>
</style>