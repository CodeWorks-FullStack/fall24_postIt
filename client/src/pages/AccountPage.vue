<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from '@/utils/Pop.js';
import { watchersService } from '@/services/WatchersService.js';
import AlbumCard from '@/components/AlbumCard.vue';

const account = computed(() => AppState.account)

const watcherAlbums = computed(()=> AppState.accountWatchedAlbums)

onMounted(()=>{
  getAccountWatchedAlbums()
})

async function getAccountWatchedAlbums(){
  try {
    await watchersService.getAccountWatchedAlbums()
  } catch (error) {
    // Pop.error(error)
    Pop.toast("Could not get Account", 'error', 'center')
  }
}

async function deleteWatcher(watcherId){
  try {
    const confirmed = await Pop.confirm("ARE YOU SURE YOU WANT TO STOP WATCHING", "WHAT IF IT'S ABOUT PUGS?", "YES Leave", 'question')
    const confirmed2 = await Pop.confirm("REALLY?", "WHAT IF IT'S ABOUT PUGS?", "YES Leave", 'question')
    if(!confirmed || !confirmed2) return

    await watchersService.deleteWatcher(watcherId)
    Pop.toast("Stopped watching", 'success', 'center', 5000, false)
  } catch (error) {
    Pop.error(error)
  }
}

</script>

<template>
  <div class="about container">
    <div v-if="account">
      <h1>Welcome {{ account.name }}</h1>
      <img class="rounded" :src="account.picture" alt="" />
      <p>{{ account.email }}</p>

      <section class="row g-3">
        <div v-for="watcher in watcherAlbums" :key="watcher.id" class="col-md-4 position-relative">
          <!-- {{ watcher.album }} -->
            <!-- {{ watcher.id }} -->
          <AlbumCard :album="watcher.album"/>
          <button @click="deleteWatcher(watcher.id)" class="btn btn-danger position-absolute top-0 right-0 ">Leave <i class="mdi mdi-minus"></i></button>
        </div>
      </section>
    </div>
    <div v-else>
      <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
    </div>
  </div>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}
</style>
