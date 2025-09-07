<template>
    <IonModal :is-open="data">
        <MainLayout>
            <template v-slot:header-button>
                <IonIcon  @click="methods.closeModal" :icon="chevronBackOutline"></IonIcon>
            </template>
            <template v-slot:header-title>
                <slot name="title"></slot>
            </template>
            <template v-slot:subheader>
                <slot name="subheader"></slot>
            </template>
            <template v-slot:content>
                <slot name="content"></slot>
            </template>
        </MainLayout>
    </IonModal>
</template>

<script setup>
    import { defineProps, ref, defineEmits, watch, inject } from 'vue'

    import {
        IonModal,
        IonIcon,
    } from '@ionic/vue'

    import { chevronBackOutline } from 'ionicons/icons';

    import MainLayout from '../components/layout/main-layout.vue'

    const props = defineProps({
        open: {
            type: Boolean,
            required: true,
            default: false,
        },
    })

    const emits = defineEmits(['close'])

    const data = ref(props.open)

    watch(() => props.open, (status) => {
        data.value = status
    })

    const methods = {
        closeModal: () => {
            data.value = false

            emits('close')
        }
    }
</script>

