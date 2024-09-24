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
    this.creator = new Account(data.creator)
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
}
