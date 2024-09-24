<script setup>
import { AppState } from '@/AppState.js';
import AlbumCard from '@/components/AlbumCard.vue';
import { albumsService } from '@/services/AlbumsService.js';
import Pop from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';


const filterBy = ref('all')
const albums = computed(()=>{
  if(filterBy.value == 'all'){
    return AppState.albums
  }
  return AppState.albums.filter(album => album.category == filterBy.value)
})

// const filterCategories = ['all', 'animals', 'vibes', 'food', 'games', 'aesthetics', 'misc']
const filterCategories = [
  {text: 'all', bg: 'https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8'},
  {text: 'animals', bg: 'https://plus.unsplash.com/premium_photo-1668114375111-e90b5e975df6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZG9nc3xlbnwwfHwwfHx8MA%3D%3D'},
  {text: 'vibes', bg: 'https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8'},
  {text: 'food', bg: 'https://images.unsplash.com/photo-1460306855393-0410f61241c7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YnVyZ2VyfGVufDB8fDB8fHww'},
  {text: 'games', bg: 'https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8'},
  {text: 'aesthetics', bg: 'https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8'},
  {text: 'misc', bg: 'https://plus.unsplash.com/premium_photo-1690749740487-01bbb8e51e71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIwfHx8ZW58MHx8fHx8'},
]

onMounted(()=>{
  getAllAlbums()
})

async function getAllAlbums(){
  try {
    await albumsService.getAllAlbums()
  } catch (error) {
    Pop.error(error)
  }
}

</script>

<template>
  <div class="container">
    <!-- SECTION filter buttons -->
    <section class="row">
      <p>Find your interest
      </p>
      <hr/>
    </section>
    <section class="row g-3">
      <div v-for="category in filterCategories" :key="category.text" class="col-6 col-md-3">
        <button @click="filterBy = category.text" type="button" class="btn filter-btn p-0 border-0  w-100" :style="{backgroundImage: `url(${category.bg})`}">
          <div class="p-4">
            {{ category.text }}
          </div>
        </button>
      </div>
    </section>


    <!-- SECTION ALBUMs -->
    <section class="row">
      <p>Popular Albums</p>
      <hr/>
    </section>
    <section class="row g-3">
      <div v-for="album in albums" :key="album.id" class="col-6 col-md-4">
        <!-- {{ album.title }}
        <img :src="album.coverImg" alt=""> -->
        <AlbumCard :album="album"/>
      </div>
    </section>

  </div>
</template>

<style scoped lang="scss">
.filter-btn{
  color: white;
  font-weight: 800;
  text-shadow: 0 0 3px black;
  background-position: center;
  background-size: cover;
  div{
    width: 100%;
    height: 100%;
    backdrop-filter: contrast(.8) brightness(.7);
  }
}
</style>
