<template>
    <div id="appv-subheader" class="subheader">
        <h1 id="appv-subheader" class="title">
            <slot>Teste</slot>
        </h1>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
    #appv-subheader.subheader {
        display: flex;
        align-items: end;
        width: 100%;
        height: 120px;
        padding: 0 20px 10px 20px;
        background: #e33922;
    }

    #appv-subheader.title {
        margin: 0;
        padding: 0;
        font-family: "Livvic", serif;
        text-transform: uppercase;
        font-weight: bold;
        color: #ffffff;
    }
</style>