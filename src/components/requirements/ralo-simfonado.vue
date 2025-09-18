<template>
    <Question>
        O ambiente possui ralo sifonado
        <IonIcon v-if="isChecked" id="checkRequirements" :icon="checkmarkDoneSharp"></IonIcon> 
        <template v-slot:input>
            <radioQuestion v-model="model[0]" id="ralo"></radioQuestion>
        </template>
        <template v-slot:sub>
            <template v-if="model[0]">
                <div class="question">
                    <p class="statement">O ralo sifonado possui tampa escamoteável</p>
                    <radioQuestion v-model="model[1]" id="tampa-escamoteavel"></radioQuestion>
                </div>
            </template>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineModel, defineEmits, watch, computed } from 'vue'
    import radioQuestion from '../question/radio-question-v2.vue';
    import Question from '../question/question.vue'
    import { checkmarkDoneSharp } from 'ionicons/icons'
    import { IonIcon } from '@ionic/vue'

    const isChecked = computed(() => {
        if (model.value[0] != null && model.value[1] != null) {
            return true 
        } 

        return false
    })

    const props = defineProps({
        answerSheet: {
            required: true,
        }
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
    #checkRequirements {
        position: absolute;
        top: -13px;
        right: 10px;
        color: green;
        font-size: 2em;
    }
</style>