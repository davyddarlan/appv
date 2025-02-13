<template>
    <div class="appv-question">
        <div class="appv-question-text">
            <p><slot></slot></p>
        </div>
        <div class="appv-question-options">
            <slot name="input"></slot>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped>
    .appv-question {
        background: #ffffff;
        padding: 20px;
        border-radius: 4px;
        margin: 15px 0 15px 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    } 

    .appv-question .appv-question-text p {
        margin: 0;
    }

    .appv-question .appv-question-text {
        margin-bottom: 10px;
        font-weight: 600;
    }
</style>