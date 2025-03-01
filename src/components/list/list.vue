<template>
    <div id="appv-list" class="wrapper">
        <div @click="methods.toggle" id="appv-list" class="header">
            <div class="title">
                <slot name="title"></slot>
            </div>
            <div class="toggle-btn">
                <IonIcon :icon="chevronDownOutline"></IonIcon>
            </div>
        </div>
        <div id="appv-list" class="content" ref="content">
            <div id="appv-list" class="list">
                <slot name="content"></slot>
            </div>
        </div>
    </div>
</template>

<script setup>
        import { ref, watch, onMounted } from 'vue'
        import { IonIcon } from '@ionic/vue'
        import { chevronDownOutline } from 'ionicons/icons'

        const data = ref(false)
        const content = ref(null)



        const methods = {
            toggle: () => {
                if (data.value) {
                    data.value = false
                } else {
                    data.value = true
                }
            }
        }

        watch(() => data.value, (data) => {
            if (data) {
                content.value.style.maxHeight = '1000px'
            } else {
                content.value.style.maxHeight = '0'
            }
        })

        onMounted(() => {
            content.value.style.maxHeight = '0'
        })
</script>

<style scoped>
    #appv-list.wrapper {
        width: 100%;
        height: auto;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        background: #ffffff;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 20px;
    }

    #appv-list.header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        min-height: 60px;
        border-bottom: 1px solid rgba(50, 50, 93, 0.25);
        font-weight: bold;
        font-size: 1.1em;
        padding: 15px 20px 15px 20px;
    }

    #appv-list.header .title {
        margin-right: 20px;
        width: calc(100% - (30px + 20px));
    }

    #appv-list.header .toggle-btn {
        display: flex;
        align-items: center;
        width: 30px;
        height: 50px;
        line-height: 50px;
    }

    #appv-list.content { 
        max-height: 1000px; 
        transition: max-height 0.5s;
    }
</style>