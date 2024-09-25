import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Picture } from "@/models/Picture.js"



class PicturesService {
  async createPicture(pictureData) {
    const response = await api.post('api/pictures', pictureData)
    logger.log('✨🖼️📡', response.data)
    const createdPicture = new Picture(response.data)
    AppState.albumPictures.push(createdPicture)
  }

  async getAlbumPictures(albumId) {
    const response = await api.get(`api/albums/${albumId}/pictures`)
    logger.log('🖼️📡', response.data)
    const pictures = response.data.map(picData => new Picture(picData))
    AppState.albumPictures = pictures
  }

}

export const picturesService = new PicturesService()
