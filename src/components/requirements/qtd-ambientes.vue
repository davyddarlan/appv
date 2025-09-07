<template>
    <Question>
        Qual a quantidade de ambientes?
        <IonIcon v-if="isChecked" id="checkRequirements" :icon="checkmarkDoneSharp"></IonIcon>
        <template v-slot:input>
            <IonInput v-model="model" type="number" fill="outline" placeholder="Quantidade de espaços"></IonInput>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineModel, computed } from 'vue'
    import { IonInput } from '@ionic/vue';
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