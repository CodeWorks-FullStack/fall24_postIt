import { Account } from "./Account.js"


export class Album {
  /** @type {Account} */
  creator
  constructor(data) {
    this.id = data.id
    this.title = data.title
    this.description = data.description
    this.coverImg = data.coverImg
    this.category = data.category
    this.creatorId = data.creatorId
    this.archived = data.archived
    this.creator = data.creator ? new Account(data.creator) : null // This is necessary because, our WatcherAlbum, does not include the creator on it. so this errors out
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
    this.watcherCount = data.watcherCount
  }
}
