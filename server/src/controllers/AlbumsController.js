import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { albumsService } from "../services/AlbumsService.js";
import { picturesService } from "../services/PicturesService.js";
import { watchersService } from "../services/WatchersService.js";



export class AlbumsController extends BaseController {
  constructor() {
    super('api/albums')
    this.router
      .get('', this.getAllAlbums)
      .get('/:thankYouLevania', this.getAlbumById)
      .get('/:albumId/pictures', this.getPicturesInAlbum)
      .get('/:albumId/watchers', this.getWatchersByAlbum)
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

  async getPicturesInAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const pictures = await picturesService.getPicturesInAlbum(albumId)
      response.send(pictures)
    } catch (error) {
      next(error)
    }
  }

  async getWatchersByAlbum(request, response, next) {
    try {
      const albumId = request.params.albumId
      const watchers = await watchersService.getWatchersByAlbum(albumId)
      response.send(watchers)
    } catch (error) {
      next(error)
    }
  }
}
