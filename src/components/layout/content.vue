<template>
    <div id="appv-content" class="content">
        <slot></slot>
    </div>
</template>

<style scoped>
    #appv-content.content {
        width: 100%;
        height: calc(100% - 180px);
        overflow-y: auto;
        background: #f4f1f1;
        font-size: 1.2em;
        /*padding: 10px 20px 10px 20px;*/
        color: #420000;
        font-family: "Open Sans", serif;
    }
</style>