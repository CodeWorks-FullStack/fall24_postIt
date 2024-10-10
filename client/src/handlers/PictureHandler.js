import { AppState } from "@/AppState.js";
import { Picture } from "@/models/Picture.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";


class PictureHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_PICTURE', this.onCreatedPicture)
  }

  onCreatedPicture(payload) {
    const newPicture = new Picture(payload)
    Pop.toast(`${newPicture.creator.name} just added a picture!`)
    AppState.albumPictures.push(newPicture)
  }
}
export const pictureHandler = new PictureHandler()