import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"



class ImageUploadService {
  async uploadImage(imageData) {
    const formData = new FormData()
    formData.append('image', imageData)
    const response = await api.post('api/upload/image', formData)
    logger.log('⬆️📡', response.data)
    return response.data.url
  }
}

export const imageUploadService = new ImageUploadService()
