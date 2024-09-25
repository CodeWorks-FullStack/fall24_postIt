<script setup>
import { Album } from '@/models/Album.js';

defineProps({album: {type: Album, required: true}})

</script>


<template>
<RouterLink :to="{name: 'Album Details', params: {albumId: album.id}}">
  <div class="card selectable text-info">
    <img class="card-img-top cover-img" :src="album.coverImg" alt="">
    <div class="card-body text-light">
      <p class="fw-bold">{{ album.title }}</p>
      <div class="d-flex align-items-center" v-if="album.creator">
        <img class="album-creator me-2" :src="album.creator.picture" alt="">
        <span>{{ album.creator.name }}</span>
      </div>
    </div>
  </div>
</RouterLink>
</template>


<style lang="scss" scoped>
.album-creator{
  height: 35px;
  width: 35px;
  border-radius: 35px;
  object-fit: cover;
  object-position: center;
}

.cover-img{
  height: 10em;
  object-fit: cover;
  object-position: center;
}
</style>
