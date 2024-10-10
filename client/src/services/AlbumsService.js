import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"



class AlbumsService {
  async createAlbum(albumData) {
    const response = await api.post('api/albums', albumData)
    logger.log('✨📸📡', response.data)
    // const createdAlbum = new Album(response.data)
    // AppState.albums.unshift(createdAlbum) // adds to the beginning of the array. HIGHLY dependant on how your API orders content you might want .push instead
    // return createdAlbum
  }
  async getAlbumById(albumId) {
    const response = await api.get(`api/albums/${albumId}`)
    logger.log('👆📸📡', response.data)
    AppState.activeAlbum = new Album(response.data)
  }
  async getAllAlbums() {
    const response = await api.get('api/albums')
    logger.log('📸📡', response.data)
    const newAlbums = response.data.map(albumData => new Album(albumData))
    AppState.albums = newAlbums
  }

}

export const albumsService = new AlbumsService()
