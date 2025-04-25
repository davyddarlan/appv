<template>
    <Wrapper>
        <div id="appv-layout" class="header">
            <slot name="title"></slot>
        </div>
        <div id="appv-layout" class="content">
            <slot name="content"></slot>
        </div>
    </Wrapper>
</template>

<script setup lang="ts">    
    import Wrapper from './wrapper.vue'
</script>

<style scoped>
    #appv-layout.header {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px;
        background: #e33922;
        border-bottom: 1px solid #ffffff;
        padding: 0 20px 0 20px;
        overflow: hidden;
        font-family: "Livvic", serif;
        font-size: 1.5em;
        font-weight: 600;
        color: #ffffff;
    }

    #appv-layout.content {
        width: 100%;
        height: calc(100% - 60px);
        overflow-y: auto;
        background: #f4f1f1;
        font-size: 1.2em;
        color: #420000;
        font-family: "Open Sans", serif;
    }
</style>