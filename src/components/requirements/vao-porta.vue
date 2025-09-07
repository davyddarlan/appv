<template>
    <Question>
        Qual a largura do vão da porta deste ambiente
        <IonIcon v-if="isChecked" id="checkRequirements" :icon="checkmarkDoneSharp"></IonIcon>
        <template v-slot:input>
            <IonInput v-model="model[0]" type="number" fill="outline" placeholder="Largura do vão da porta"></IonInput>
        </template>
        <template v-slot:sub>
            <div class="question">
                <p class="statement">Qual a altura do vão da porta deste ambiente</p>
                <IonInput v-model="model[1]" type="number" fill="outline" placeholder="Altura do vão da porta"></IonInput>
            </div>
        </template>
    </Question>
</template>

<script setup> 

    import Question from '../question/question.vue'
    import { IonInput } from '@ionic/vue';
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
        default: [null, null],
    })

    const emits = defineEmits(['setData'])

    watch(() => model.value[0], (data) => {
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