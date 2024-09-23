import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumsService } from "../services/AlbumsService.js";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:thankYouLevania', this.getAlbumById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createAlbum)
      .delete('/:albumId', this.archiveAlbum)
  }

  async createAlbum(request, response, next) {
    try {
      const albumData = request.body
      const userInfo = request.userInfo // only appears on request that pass through auth middleware
      albumData.creatorId = userInfo.id
      // albumData.banana = 'sandwich'
      const album = await albumsService.createAlbum(albumData)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async getAllAlbums(request, response, next) {
    try {
      const albums = await albumsService.getAllAlbums()
      response.send(albums)
    } catch (error) {
      next(error)
    }
  }

  async getAlbumById(request, response, next) {
    try {
      const albumId = request.params.thankYouLevania
      const album = await albumsService.getAlbumById(albumId)
      response.send(album)
    } catch (error) {
      next(error)
    }
  }

  async archiveAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const userId = request.userInfo.id
      const message = await albumsService.archiveAlbum(albumId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
