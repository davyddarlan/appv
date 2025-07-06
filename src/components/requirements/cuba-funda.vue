<template>
    <Question>
        O ambiente possui bancada com pia de cuba funda
        <template v-slot:input>
            <radioQuestion v-model="model" id="cuba-funda"></radioQuestion>
        </template>
        <template v-slot:sub>
            <template v-if="model">
                <div class="question">
                    <p class="statement">A pia possui torneira que dispense o uso das mãos para ligar e desligar</p>
                    <radioQuestion v-model="torneiraData" id="automacao-torneira"></radioQuestion>
                </div>
            </template>
        </template>
    </Question>
</template>

<script setup> 
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'

    import { defineModel, defineEmits, watch, ref } from 'vue'

    const model = defineModel({
        default: null,
    })

    const torneiraData = ref(null)

    const emits = defineEmits(['setData'])

    watch(() => model.value, (data) => {
        emits('setData', [data, torneiraData.value])
    })

    watch(() => torneiraData.value, (data) => {
        emits('setData', [model.value, data])
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