import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import fileUpload from 'express-fileupload'
import { imageUploadService } from "../services/ImageUploadService.js";

export class ImageUploadController extends BaseController {
  constructor() {
    super('api/upload')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .use(fileUpload())
      .post('/image', this.uploadImage)
      .post('/sharp', this.uploadWithSharp)
  }


  async uploadImage(request, response, next) {
    try {
      console.log(request.files)
      const imageData = request.files.image
      const userId = request.userInfo.id
      const image = await imageUploadService.uploadImage(imageData, userId)
      response.send(image)
    } catch (error) {
      next(error)
    }
  }

  async uploadWithSharp(request, response, next) {
    try {
      console.log(request.files)
      const imageData = request.files.image
      const userId = request.userInfo.id
      const image = await imageUploadService.uploadWithSharp(imageData, userId)
      response.send(image)
    } catch (error) {
      next(error)
    }
  }
}
