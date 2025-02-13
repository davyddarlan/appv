<template>
    <div id="appv-header" class="header">
        <div id="appv-header" class="button ion-activatable">
            <slot name="button"></slot>
            <IonRippleEffect></IonRippleEffect>
        </div>
        <h1 id="appv-header" class="title">
            <slot></slot>
        </h1>
    </div>
</template>

<script setup lang="ts">
    import { IonRippleEffect } from '@ionic/vue';
</script>

<style scoped>
    #appv-header.header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        background: #e33922;
        border-bottom: 1px solid #ffffff;
        padding: 0 20px 0 15px;
        overflow: hidden;
    }

    #appv-header.button {
        display: flex;
        align-items: center;
        width: 32px;
        height: 60px;
        margin-right: 10px;
        font-size: 2em;
        color: #ffffff;
    }

    #appv-header.button ion-icon { font-size: 2em; }

    #appv-header.title {
        font-family: "Livvic", serif;
        margin: 0;
        padding: 0;
        font-size: 1.5em;
        font-weight: 600;
        color: #ffffff;
    }
</style>