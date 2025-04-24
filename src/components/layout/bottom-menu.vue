<template>
    <div id="appv-bottom-menu" class="main-wrapper">
        <div id="appv-bottom-menu" class="main-content">
            <slot></slot>
        </div>
        <div id="appv-bottom-menu" class="bottom-menu" ref="menuItens">
            <div class="item" @click="methods.goTo('/')">
                <ion-icon :icon="homeOutline"></ion-icon>
                Home
            </div>
            <div class="item" @click="methods.goTo('/lista-projetos')">
                <ion-icon :icon="mapOutline"></ion-icon>
                Projetos
            </div>
            <div class="item">
                <ion-icon :icon="informationCircleOutline"></ion-icon>
                Sobre
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, watch } from 'vue'
    import { IonIcon } from '@ionic/vue'
    import { 
        homeOutline,
        mapOutline,
        informationCircleOutline,
    } from 'ionicons/icons'

    import { useRouter } from 'vue-router'

    const router = useRouter()
    const menuItens = ref(null)

    const methods = {
        goTo: (routeName) => {
            router.replace(routeName)
        },
        clearSelections: () => {
            const itens = menuItens.value.children
            const itensLength = itens.length

            for (let i = 0; i < itensLength; i++) {
                itens[i].classList.remove('active')
            }
        },
        selectSection: (routeName) => {
            const itens = menuItens.value.children

            switch (routeName) {
                case '/':
                    itens[0].classList.add('active')
                    break;
                case '/lista-projetos':
                    itens[1].classList.add('active')
                    break
                case '/sobre':
                    itens[2].classList.add('active')
                    break
            }
        }
    }

    watch(() => router.currentRoute.value.path, (data) => {
        if (data != '/' || data != '/lista-projetos' || data != '/sobre') {
            methods.clearSelections()
        }

        methods.selectSection(data)
    })
</script>

<style scoped>
    #appv-bottom-menu.main-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #appv-bottom-menu.main-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: auto;
    }

    #appv-bottom-menu.bottom-menu {
        display: flex;
        justify-content: space-around;
        align-items: center;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 60px;
        background: #ffffff;
        box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    }

    #appv-bottom-menu.bottom-menu .item {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #appv-bottom-menu.bottom-menu .item.active {
        font-weight: bold;
        color: #e33922;
    }    

    #appv-bottom-menu.bottom-menu .item * {
        display: block;
    }

    #appv-bottom-menu.bottom-menu .item ion-icon { margin-bottom: 5px; }
</style>