<template>
    <Question>
        Qual é a altura do pé-direito
        <template v-slot:input>
            <IonInput v-model="model" type="number" fill="outline" placeholder="Tamanho da área física"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineEmits, ref, watch, defineModel, } from 'vue'
    import Question from '../question/question.vue'
    import { IonInput } from '@ionic/vue' 

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
            let message

            message = 'É preciso que o pé-direito tenha uma altura maior ou superior a ' + props.answerSheet + 'm'

            emit('notify', {
                message,
            })
        }
    })
</script>

<style scoped>
</style>