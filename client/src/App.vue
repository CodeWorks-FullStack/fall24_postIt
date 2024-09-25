<script setup>
import Navbar from './components/Navbar.vue';
import { AppState } from './AppState.js';
import { onMounted } from 'vue';
import Pop from './utils/Pop.js';
onMounted(()=>{
  Pop.toast("Crypto wallet found", 'success', 'bottom', 750)
})
</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer class=" text-light">
    Made with Pugs by Pugs
  </footer>
</template>

<style lang="scss">
@import '@/assets/scss/main.scss';
:root {
  --main-height: calc(100vh - 32px - 64px);
}

footer {
  display: grid;
  place-content: center;
  height: 32px;
}
</style>
