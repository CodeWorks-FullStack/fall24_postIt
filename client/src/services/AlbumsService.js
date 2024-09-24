import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Album } from "@/models/Album.js"
import { AppState } from "@/AppState.js"



class AlbumsService {
  async getAllAlbums() {
    const response = await api.get('api/albums')
    logger.log('📸📡', response.data)
    const newAlbums = response.data.map(albumData => new Album(albumData))
    AppState.albums = newAlbums
  }

}

export const albumsService = new AlbumsService()
