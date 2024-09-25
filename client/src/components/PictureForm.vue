<script setup>
import { AppState } from '@/AppState.js';
import { picturesService } from '@/services/PicturesService.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()


const pictureData = ref({
imgUrl: '',
albumId: null
})

async function createPicture(){
  try {
    // pictureData.value.albumId = route.params.albumId
    pictureData.value.albumId = AppState.activeAlbum.id
    await picturesService.createPicture(pictureData.value)
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<template>
<form @submit.prevent="createPicture()">
<div class="mb-3">
  <label for="picture-url">Picture Url</label>
  <input v-model="pictureData.imgUrl" class="form-control" type="url" name="picture-url" id="picture-url" required maxlength="500">
</div>
<button class="btn btn-success">Add Picture</button>

</form>
</template>


<style lang="scss" scoped>

</style>
