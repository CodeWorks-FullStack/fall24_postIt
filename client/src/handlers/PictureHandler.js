import { AppState } from "@/AppState.js";
import { Picture } from "@/models/Picture.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";


class PictureHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_PICTURE', this.onCreatedPicture)
      .on('CREATED_PICTURE_FOR_YOUR_ALBUM', this.notifyCreator)
  }

  onCreatedPicture(payload) {
    const newPicture = new Picture(payload)
    Pop.toast(`${newPicture.creator.name} just added a picture!`)
    AppState.albumPictures.push(newPicture)
  }

  notifyCreator(payload) {
    const picture = new Picture(payload)
    Pop.toast(`${picture.creator.name} just added a picture to your ${picture.album.title} album!`)
  }
}
export const pictureHandler = new PictureHandler()