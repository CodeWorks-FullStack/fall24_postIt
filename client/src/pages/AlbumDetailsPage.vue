<script setup>
import { AppState } from '@/AppState.js';
import { albumsService } from '@/services/AlbumsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const album = computed(()=> AppState.activeAlbum)

// NOTE computed could be used to verify multiple conditions and create a more verbose bool
const thereIsAnAlbum = computed(() => {
  if(album.value == null) return false
  if(album.value != null) return true
  return 'idk'
})

onMounted(()=>{
  getAlbumById()
})

async function getAlbumById(){
  try {
    await albumsService.getAlbumById(route.params.albumId)
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<template>
<div class="container">
  <!-- NOTE the v-if is important to make sure the IS an album to render -->
  <section v-if="album" class="row py-4 album-details justify-content-center align-items-end" :style="{backgroundImage: `url(${album.coverImg})`}">
    <div class="col-10 bg-dark-glass rounded p-3">
      <div class="text-center">
        <h1>{{ album.title }}</h1>
        <p>{{album.description}}</p>
      </div>
      <div class="d-flex justify-content-between">
        <div class="d-flex align-items-end">
          <span class="bg-info px-2 py-1 rounded-pill">{{ album.category }}</span>
          <button class="btn btn-danger px-2 py-1 rounded-pill ms-3">archive<i class="mdi mdi-close-circle"></i></button>
        </div>
        <div class="d-flex align-items-baseline">
          <span>created by {{ album.creator.name }}</span>
          <img class="creator-img" :src="album.creator.picture" alt="picture of album creator">
        </div>
      </div>
    </div>
  </section>
</div>
</template>


<style lang="scss" scoped>
.album-details{
  height: 25em;
  background-size: cover;
  background-position: center;
}

.creator-img{
  height: 50px;
  width: 50px;
  border-radius: 50px;
  object-fit: cover;
  object-position: center
}

.bg-dark-glass{
  background-color: rgba(0, 0, 0, 0.531);
  backdrop-filter: blur(20px);
}
</style>
