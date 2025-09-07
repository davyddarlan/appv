<template>
    <Question>
        O ambiente possui bancada com pia de cuba funda
        <IonIcon v-if="isChecked" id="checkRequirements" :icon="checkmarkDoneSharp"></IonIcon>
        <template v-slot:input>
            <radioQuestion v-model="model[0]" id="cuba-funda"></radioQuestion>
        </template>
        <template v-slot:sub>
            <template v-if="model[0]">
                <div class="question">
                    <p class="statement">A pia possui torneira que dispense o uso das mãos para ligar e desligar</p>
                    <radioQuestion v-model="model[1]" id="automacao-torneira"></radioQuestion>
                </div>
            </template>
        </template>
    </Question>
</template>

<script setup> 
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'
    import { defineModel, defineEmits, watch, computed } from 'vue'
    import { checkmarkDoneSharp } from 'ionicons/icons'
    import { IonIcon } from '@ionic/vue'

    const isChecked = computed(() => {
        if (model.value[0] != null && model.value[1] != null) {
            return true 
        } 

        return false
    })

    const model = defineModel({
        default: [0, 0],
    })

    const emits = defineEmits(['setData'])

    watch(() => model.value[0], (data) => {
        if (!data) {
            model.value[1] = 0
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

    #checkRequirements {
        position: absolute;
        top: -13px;
        right: 10px;
        color: green;
        font-size: 2em;
    }
</style>