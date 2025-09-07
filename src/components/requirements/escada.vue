<template>
    <Question>
        O ambiente possui escada para maca
        <IonIcon v-if="isChecked" id="checkRequirements" :icon="checkmarkDoneSharp"></IonIcon>
        <template v-slot:input>
            <radioQuestion v-model="model" id="escada"></radioQuestion>
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
        if (model.value != null) {
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
        default: null,
    })

    const emits = defineEmits(['setData'])

    watch(() => model.value, (data) => {
        emits('setData', data)
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