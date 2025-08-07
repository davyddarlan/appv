<template>
    <Question>
        O ambiente possuí lavatório 
        <template v-slot:input>
            <radioQuestion v-model="model[0]" id="lavatorio"></radioQuestion>
        </template>
        <template v-slot:sub>
            <template v-if="model[0]">
                <div class="question">
                    <p class="statement">O lavatório possui torneira que dispense o uso das mãos para ligar e desligar</p>
                    <radioQuestion v-model="model[1]" id="automacao-torneira"></radioQuestion>
                </div>
            </template>
        </template>
    </Question>
</template>

<script setup> 
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'

    import { defineModel, defineEmits, ref, watch } from 'vue'

    const model = defineModel({
        default: [0, 0],
    })

    const emits = defineEmits(['setData'])

    watch(() => model.value[0], (data) => {
        if (!data) {
            model.value[1] = 0
        } else {
            model.value[1] = null
        }

        emits('setData', [model.value[0], model.value[1]])
    })

    watch(() => model.value[1], (data) => {
        emits('setData', [model.value[0], model.value[1]])
    })
</script>

<style scoped>
    .appv-question-sub .question {
        border-top: 1px solid rgba(50, 50, 93, 0.25);
        margin-top: 20px;
    }

    .appv-question-sub .question:empty {
        border-top: none;
        margin-top: 0;
    }

    .appv-question-sub .statement {
        font-weight: 600;
    }
</style>