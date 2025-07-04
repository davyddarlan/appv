<template>
    <Question>
        Qual a área física do espaço
        <template v-slot:input>
            <IonInput v-model="model" type="number" fill="outline" placeholder="Tamanho da área física"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineModel, defineEmits, watch } from 'vue'
    import { IonInput } from '@ionic/vue';
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