<template>
    <Question>
        {{ props.question.statement }}
        <template v-slot:input>
            <RadioQuestion @setData="methods.getData" v-model="props.question.value"></RadioQuestion>
        </template>
        <template v-slot:sub>
            <div v-if="props.question.value" class="appv-question-sub">
                <p>Digite a quantidade de ambientes</p>
                <IonInput :readonly="props.question.lengthRoomValue > 0" v-model="props.question.lengthRoomValue" type="number" fill="outline" placeholder="Quantidade de ambientes"></IonInput>
            </div>
        </template>
        <template v-slot:control>
            <IonButton v-if="+props.question.lengthRoomValue" @click="emits('pressBtn')" size="small" id="open-modal" expand="block">Preencher requisitos de ambiente</IonButton>
        </template>
    </Question>
</template>

<script setup>
    import { defineProps, defineEmits, watch, onMounted } from 'vue'

    const props = defineProps({
        question: {
            type: Object,
            required: true,
        }
    })

    const emits = defineEmits(['pressBtn', 'setValue', 'setLengthRoom'])

    watch(() => props.question.lengthRoomValue, (data) => {
        emits('setLengthRoom', {
            id: props.question.id,
            value: props.question.value, 
            lengthRoom: +data,
        })
    })

    const methods = {
        getData: (data) => {
            emits('setValue', {
                id: props.question.id,
                value: data,
                lengthRoom: +props.question.lengthRoomValue,
            })
        }
    }

    import Question from './question.vue'
    import RadioQuestion from './radio-question-v2.vue'

    import { 
        IonButton,
        IonInput,
    } from '@ionic/vue'
</script>