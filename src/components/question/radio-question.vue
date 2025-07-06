<template>
    <div ref="inputWrapper" class="appv-input-wrapper">
        <div class="appv-input-radio">
            <input @change="methods.getValue" type="radio" value="1" :name="randomData.commonData" :id="randomData.yesData">
            <label :for="randomData.yesData">SIM</label>
        </div>
        <div class="appv-input-radio">
            <input @change="methods.getValue" type="radio" value="0" :name="randomData.commonData" :id="randomData.noData">
            <label :for="randomData.noData">NÃO</label>
        </div>
    </div>
</template>

<script setup>
    import { defineProps, defineEmits, onMounted, ref, watch } from 'vue'
    import { Random } from '../../composables/random.js'

    const props = defineProps({
        id: {
            required: true,
        },
        value: {
            type: String,
        }
    })

    const emit = defineEmits(['output'])

    const inputWrapper = ref(null)

    onMounted(() => {
        if (props.value === null) {
            methods.clearSelection()
        } else {
            methods.selectInput(props.value)
        }
    })

    watch(() => props.id, (data) => {
        if (props.value === null) {
            methods.clearSelection()
        } else {
            methods.selectInput(props.value)
        }
    })

    const randomData = {
        yesData: Random(5),
        noData: Random(5),
        commonData: Random(5),
    }

    const methods = {
        getValue: (e) => {
            const el = e.target
            const dataValue = el.value

            emit('output', {
                value: dataValue,
                index: props.id.split('_')[1],
            })         
        },
        clearSelection: () => {
            const el = inputWrapper.value.children

            for (let i = 0; i < el.length; i++) {
                el[i].children[0].checked = false
            }
        },
        selectInput: (status) => {
            const el = inputWrapper.value.children

            if (+status) {
                el[0].children[0].checked = true
            }

            if (+status == false) {
                el[1].children[0].checked = true
            }
        }
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