import { Account } from "./Account.js"




export class Picture {
  constructor(data) {
    this.id = data.id
    this.imgUrl = data.imgUrl
    this.albumId = data.albumId
    this.creatorId = data.creatorId
    this.creator = new Account(data.creator)
  }
}
