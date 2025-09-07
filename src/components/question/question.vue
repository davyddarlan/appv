<template>
    <div class="appv-question-container">
        <div class="appv-question">
            <div class="appv-question-text">
                <p><slot></slot></p>
            </div>
            <div class="appv-question-options">
                <slot name="input"></slot>
                <div class="appv-question-sub">
                    <slot name="sub"></slot>
                </div>
            </div>
        </div>
        <div class="appv-question-control">
            <slot name="control"></slot>
        </div>
    </div>
</template>

<script setup></script>

<style scoped>
    .appv-question-container {
        position: relative;
        margin: 15px 0 15px 0;
        box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
        background: #ffffff;
        border-radius: 4px;
    }

    .appv-question { padding: 20px; } 

    .appv-question .appv-question-text p { margin: 0; }

    .appv-question .appv-question-text {
        margin-bottom: 10px;
        font-weight: 600;
    }

    .appv-question-control {
        display: flex;
        align-items: center;
        width: 100%;
        height: 60px; /* 60px */
        border-top: 1px solid rgba(50, 50, 93, 0.25);
        padding: 0 10px 0 10px;
    }

    .appv-question-control:empty {
        height: 0;
        border-top: none;
    }

    .appv-question-sub { margin-top: 10px; }

    .appv-question-sub:empty { margin-top: 0; }
</style>