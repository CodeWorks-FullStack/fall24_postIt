import { dbContext } from "../db/DbContext.js"
import { albumsService } from "./AlbumsService.js"




class PicturesService {
  async getPicturesInAlbum(albumId) {
    // --------------------------------------------{ albumId: '767898467df6df7sjfhsk}
    const pictures = await dbContext.Pictures.find({ albumId: albumId }).populate('creator')
    return pictures
  }
  async createPicture(pictureData) {

    const album = await albumsService.getAlbumById(pictureData.albumId)
    if (album.archived == true) throw new Error("Album has been archived")

    const picture = await dbContext.Pictures.create(pictureData)
    await picture.populate('creator')
    return picture
  }

}

export const picturesService = new PicturesService()
