<template>
    <div ref="inputWrapper" class="appv-input-wrapper">
        <div class="appv-input-radio">
            <input ref="trueValue" v-model="radioValue" type="radio" value="1" :name="randomData.commonData" :id="randomData.yesData">
            <label :for="randomData.yesData">SIM</label>
        </div>
        <div class="appv-input-radio">
            <input ref="falseValue" v-model="radioValue" type="radio" value="0" :name="randomData.commonData" :id="randomData.noData">
            <label :for="randomData.noData">NÃO</label>
        </div>
    </div>
</template>

<script setup>
    import { defineEmits, ref, watch, defineModel, onMounted, } from 'vue'
    import { Random } from '../../composables/random'

    const model = defineModel({
        default: null,
    })

    const radioValue = ref(null)

    const trueValue = ref(null)
    const falseValue = ref(null)

    const emits = defineEmits(['setData'])

    watch(() => radioValue.value, (data) => {
        if (data == 0) {
            model.value = 0
        }

        if (data == 1) {
            model.value = 1
        }
    })

    watch(() => model.value, (data) => {
        if (data == 0) {
            radioValue.value = 0
            falseValue.value.checked = true
        }

        if (data == 1) {
            radioValue.value = 1
            trueValue.value.checked = true
        }

        if (data == null) {
            trueValue.value.checked = false
            falseValue.value.checked = false
        }    
        
        emits('setData', data)
    })

    onMounted(() => {
        if (model.value == 1) {
            trueValue.value.checked = true
        }

        if (model.value == 0) {
            falseValue.value.checked = true
        }
    })

    const randomData = {
        yesData: Random(5),
        noData: Random(5),
        commonData: Random(5),
    }
</script>

<style scoped>
    .appv-input-radio input[type=radio] {
        margin-right: 8px;
    }

    .appv-input-radio label {
        text-transform: uppercase;
    }
</style>