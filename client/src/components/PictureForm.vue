<script setup>
import { AppState } from '@/AppState.js';
import { picturesService } from '@/services/PicturesService.js';
import { logger } from '@/utils/Logger.js';
import Pop from '@/utils/Pop.js';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()


const pictureData = ref({
imgUrl: '',
albumId: null,
file: null
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

function selectFile(event){
  try {
    const file = event.target.files[0]
    logger.log(file)
    pictureData.value.imgUrl = URL.createObjectURL(file)
    pictureData.value.file = file
  } catch (error) {
    Pop.error('Bad file selection')
  }
}

</script>


<template>
<form @submit.prevent="createPicture()">
<div class="mb-3">
  <label for="picture-url">Picture Url</label>
  <!--<input v-model="pictureData.imgUrl" class="form-control" type="url" name="picture-url" id="picture-url" required maxlength="500">-->
  <img :src="pictureData.imgUrl" class="img-fluid" alt="">
  <input @change="selectFile" type="file" required accept="image/*" multiple="false">
</div>
<button class="btn btn-success">Add Picture</button>

</form>
</template>


<style lang="scss" scoped>

</style>
