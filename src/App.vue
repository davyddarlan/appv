<template>
  <ion-app>
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
