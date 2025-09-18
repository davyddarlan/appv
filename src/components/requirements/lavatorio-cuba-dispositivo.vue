<template>
    <Question>
        O ambiente possui lavatório
        <IonIcon v-if="isChecked" id="checkRequirements" :icon="checkmarkDoneSharp"></IonIcon>
        <template v-slot:input>
            <radioQuestion v-model="model[0]" id="lavatorio-cuba-disp1"></radioQuestion>
        </template>
        <template v-slot:sub>
            <div class="question">
                <p class="statement">O lavatório possui um dispositivo que dispense o uso das mão para ligar e desligar a torneira</p>
                <radioQuestion v-model="model[1]" id="lavatorio-cuba-disp2"></radioQuestion>
            </div>
            <div class="question">
                <p class="statement">O ambiente possui bancada com pia de cuba funda</p>
                <radioQuestion v-model="model[2]" id="lavatorio-cuba-disp3"></radioQuestion>
            </div>
            <div class="question">
                <p class="statement">A pia de cuba funda possui um dispositivo que dispense o uso das mãos para ligar e desligar a torneira</p>
                <radioQuestion v-model="model[3]" id="lavatorio-cuba-disp4"></radioQuestion>
            </div>
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
        if (model.value[0] != null && model.value[1] != null && model.value[2] != null && model.value[3] != null) {
            return true 
        } 

        return false
    })

    const model = defineModel({
        default: [0, 0, 0, 0],
    })

    const emits = defineEmits(['setData'])

    watch(() => model.value[0], (data) => {
        if (!data) {
            model.value[1] = 0
        }

        emits('setData', [model.value[0], model.value[1], model.value[2], model.value[3]])
    })

    watch(() => model.value[1], (data) => {
        emits('setData', [model.value[0], model.value[1], model.value[2], model.value[3]])
    })

    watch(() => model.value[2], (data) => {
        if (!data) {
            model.value[3] = 0
        }

        emits('setData', [model.value[0], model.value[1], model.value[2], model.value[3]])
    })

    watch(() => model.value[3], (data) => {
        emits('setData', [model.value[0], model.value[1], model.value[2], model.value[3]])
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