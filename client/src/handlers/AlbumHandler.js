import { AppState } from "@/AppState.js";
import { Album } from "@/models/Album.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { SocketHandler } from "@/utils/SocketHandler.js";

class AlbumHandler extends SocketHandler {
  constructor() {
    super()
    this
      .on('CREATED_ALBUM', this.onCreatedAlbum)
  }

  onCreatedAlbum(payload) {
    const newAlbum = new Album(payload)
    Pop.toast(`${newAlbum.creator.name} created an album!`)
    AppState.albums.unshift(newAlbum)
  }
}

export const albumHandler = new AlbumHandler()