<script setup>
import { AppState } from '@/AppState.js';
import ModalWrapper from '@/components/ModalWrapper.vue';
import PictureForm from '@/components/PictureForm.vue';
import { albumsService } from '@/services/AlbumsService.js';
import { picturesService } from '@/services/PicturesService.js';
import { watchersService } from '@/services/WatchersService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const album = computed(()=> AppState.activeAlbum)

const pictures = computed(()=> AppState.albumPictures)

const watcherProfiles = computed(() => AppState.albumWatcherProfiles)

// NOTE these computed properties are pretty dense but consider them as verbose examples checks for each action you want to take. Each if is a potential condition that would NOT allow you to complete said action.
const canAddPicture = computed(()=> {
//  if(AppState.activeAlbum == null) return false
 if(AppState.activeAlbum?.archived== true) return false // if archived, you Cannot Add Picture
 if(AppState.identity == null) return false // if 'not logged in', you Cannot Add Picture
 return true // reaching 'return true' a the end means you meet ALL the above conditions and you canAddPicture
})

// NOTE this checks, are you NOT logged in, are you NOT in the array. If both true then you are logged in, and you are in the array = return true
const isWatchingAlbum = computed(()=>{
if(AppState.identity == null) return false
const youInWatchers = AppState.albumWatcherProfiles.find(watcher=> watcher.accountId == AppState.account?.id)
if(!youInWatchers) return false
  return true
})

// NOTE are you NOT logged in, are you already watching, is the album archived?
const canCreateWatch = computed(()=>{
  if(AppState.identity == null) return false
  if(isWatchingAlbum.value) return false
  if(AppState.activeAlbum?.archived == true) return false
  return true
})

// NOTE computed could be used to verify multiple conditions and create a more verbose bool
const thereIsAnAlbum = computed(() => {
  if(album.value == null) return false
  if(album.value != null) return true
  return 'idk'
})

onMounted(()=>{
  getAlbumById()
  getAlbumPictures()
  getAlbumWatchers()
})

async function getAlbumById(){
  try {
    await albumsService.getAlbumById(route.params.albumId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getAlbumPictures(){
  try {
    await picturesService.getAlbumPictures(route.params.albumId)
  } catch (error) {
    Pop.error(error)
  }
}

async function getAlbumWatchers(){
  try {
await watchersService.getAlbumWatchers(route.params.albumId)
  } catch (error) {
    Pop.error(error)
  }
}

async function createWatcher(){
  try {
    // NOTE creating the post payload. So our data has KEY:VALUE pairs
    const watcherData = {
      albumId: route.params.albumId
    }
    await watchersService.createWatcher(watcherData)
  } catch (error) {
    Pop.error(error)
  }
}

</script>


<template>
<div class="container">
  <!-- NOTE the v-if is important to make sure the IS an album to render -->
  <section v-if="album" class="row py-4 mt-4 album-details justify-content-center align-items-end" :style="{backgroundImage: `url(${album.coverImg})`}">
    <div class="col-10 bg-dark-glass rounded p-3">
      <div class="text-center">
        <h1>{{ album.title }} <span v-if="album.archived" class="bg-dark text-danger py-2 px-3 rounded-pill">archived</span></h1>
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
  <section class="row my-3">
    <!-- SECTION album watchers -->
    <div class="col-md-4">
      <section class="row" v-if="album">
        <div class="col-12 text-primary" v-if="isWatchingAlbum">You are watching!</div>
        <div class="col-8 bg-dark-glass p-4 text-center fw-bold">
          Watchers {{album.watcherCount}}
        </div>
        <button :disabled="!canCreateWatch" @click="createWatcher()" class="col-4 btn btn-info">
          JOIN <i class="mdi mdi-account-plus"></i>
        </button>
        <!-- <button v-else class="col-4 btn btn-danger">
          Watching <i class="mdi mdi-heart"></i>
        </button> -->

        <div  class="col-12">
          <section class="row">
            <div v-for="watcher in watcherProfiles" :key="watcher.id" class="col-4">
              <img class="watcher-img" :src="watcher.profile.picture" alt="" :title="watcher.profile.name">
            </div>
          </section>
        </div>
      </section>
    </div>

    <div class="col-md-8">
      <!-- <PictureForm/> -->
       <ModalWrapper id="picture-form">
        <PictureForm/>
       </ModalWrapper>
       <button :disabled="!canAddPicture" data-bs-toggle="modal" data-bs-target="#picture-form" class="btn btn-primary fab">Add Picture <i class="mdi mdi-camera-plus"></i></button>
      <section class="row g-2">

        <div v-for="picture in pictures" :key="picture.id" class="col-3">
          <img class="img-fluid" :src="picture.imgUrl" alt="">
        </div>

      </section>
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

.fab{
  position: fixed;
  bottom: 2em;
  right: 2em;
}

.watcher-img{
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  object-position: center;
}
</style>
