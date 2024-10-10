import { Account } from "./Account.js"
import { Album } from "./Album.js"




export class Picture {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.albumId = data.albumId
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
    this.album = data.album ? new Album(data.album) : null
  }
}
