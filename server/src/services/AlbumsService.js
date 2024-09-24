import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"



class AlbumsService {


  async createAlbum(albumData) {
    const album = await dbContext.Albums.create(albumData)
    await album.populate('creator')
    return album
  }

  async getAllAlbums() { // -----------------{ archived: false } as the filter to keep archived albums out
    const albums = await dbContext.Albums.find().sort('-createdAt').populate('creator')
    return albums
  }
  async getAlbumById(albumId) {
    const album = await dbContext.Albums.findById(albumId).populate('creator')
    if (album == null) throw new Error(`No album with id ${albumId}`)
    // if (album.archived) throw new Error(`No Album with that id`)
    return album
  }

  async archiveAlbum(albumId, userId) {
    const albumToArchive = await this.getAlbumById(albumId)

    if (userId != albumToArchive.creatorId) throw new Forbidden("Invalid credentials. The CYBER-POLEECE have been engaged🚓")

    // await albumToArchive.deleteOne()
    albumToArchive.archived = !albumToArchive.archived
    await albumToArchive.save()
    return 'Album has been archived'
  }
}

export const albumsService = new AlbumsService()
