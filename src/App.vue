<template>
  <ion-app>
    <div id="bar" class="overlay"></div>
    <BottomMenu>
      <ion-router-outlet />
    </BottomMenu>
  </ion-app>
</template>

<script setup>
  import BottomMenu from './components/layout/bottom-menu.vue'

  import { 
    IonApp, 
    IonRouterOutlet,
  } from '@ionic/vue';
</script>

<style scoped>
  #bar.overlay {
    width: 100%;
    height: 40px;
    background: #e33922;
  }
</style>