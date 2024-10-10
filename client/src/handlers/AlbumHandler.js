import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class AlbumHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_ALBUM', this.onCreatedAlbum)
  }

  onCreatedAlbum() {
    logger.log('Someone created an album!')
    Pop.toast('Someone created an album!')
  }
}

export const albumHandler = new AlbumHandler()