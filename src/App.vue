<template>
  <ion-app>
    <ion-tabs>
      <ion-router-outlet />
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="/" href="/">
          <ion-icon :icon="playCircle" />
          <ion-label>Início</ion-label>
        </ion-tab-button>
        <ion-tab-button tab="lista-projetos" href="/lista-projetos">
          <ion-icon :icon="radio" />
          <ion-label>Projetos</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-app>
</template>

<script setup lang="ts">
  import { 
    IonApp, 
    IonRouterOutlet,
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
  } from '@ionic/vue';

  import { 
    playCircle,
    radio,
  } from 'ionicons/icons'
</script>
