<template>
    <Question>
        O ambiente possui bancada com pia de cuba funda
        <template v-slot:input>
            <radioQuestion v-model="values[0]" id="cuba-funda"></radioQuestion>
        </template>
        <template v-slot:sub>
            <template v-if="values[0]">
                <div class="question">
                    <p class="statement">A pia possui torneira que dispense o uso das mãos para ligar e desligar</p>
                    <radioQuestion v-model="values[1]" id="automacao-torneira"></radioQuestion>
                </div>
            </template>
        </template>
    </Question>
</template>

<script setup> 
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'

    import { defineModel, ref, watch } from 'vue'

    const model = defineModel()
    const values = ref([null, null])

    watch (() => values.value[0], (data) => {
        if (!data) {
            values.value[1] = 0
        }
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