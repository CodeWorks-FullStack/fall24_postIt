<script setup>
import { albumsService } from '@/services/AlbumsService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { Modal } from 'bootstrap';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute() // IS WHERE YOU ARE
const router = useRouter() // IS A VEHICLE TO MOVE YOU BETWEEN "PLACES" (PAGES)

const categoryOptions = ['misc', 'animals', 'vibes', 'food', 'games', 'aesthetics']
const albumData = ref({
  title: '',
  coverImg: '',
  category: ''
})

async function createAlbum(){
  try {
    logger.log('creating', albumData.value)
    const createdAlbum = await albumsService.createAlbum(albumData.value)
    resetForm()
    Pop.toast("Album created", 'success', 'top')
    //{name: 'Album Details', params: {albumId: album.id}}
    Modal.getOrCreateInstance('#album-form').hide() // important to hide the modal, before we push or the "fade" gets stuck on the page
    router.push({name: 'Album Details', params: {albumId: createdAlbum.id}})
    // window.open(window.location.origin + '#/album/' + createdAlbum.id)
    // how to open it in a new tab
  } catch (error) {
    Pop.error(error)
  }
}

function resetForm(){
  albumData.value = {
  title: '',
  coverImg: '',
  category: ''
}
}
</script>


<template>
<form @submit.prevent="createAlbum()" class="row">
  <div class="col-12">
    <h2>Create an Album</h2>
  </div>
  <div class="mb-3 col-md-6">
    <label for="album-title">Title</label>
    <input v-model="albumData.title" class="form-control" type="text" required minlength="3" maxlength="25" name="album-title" id="album-title">
  </div>
  <div class="mb-3 col-md-6">
    <label for="album-cover-image">Cover Image</label>
    <input v-model="albumData.coverImg" class="form-control" type="url" required maxlength="500" name="album-cover-image" id="album-cover-image">
  </div>
  <div class="mb-3 col-md-6">
    <label for="album-category">Category</label>
    <select v-model="albumData.category" class="form-control" name="album-category" id="album-category">
      <option disabled value="">-- please select one --</option>
      <option v-for="category in categoryOptions" :key="category" :value="category">{{ category }}</option>
    </select>
  </div>
  <div class="mb-2">
    <button class="w-100 p-5">submit</button>
    <button class="btn" type="button" @click="resetForm()">reset</button>
  </div>
</form>
</template>


<style lang="scss" scoped>

</style>
