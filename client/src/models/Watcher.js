import { Account } from "./Account.js"
import { Album } from "./Album.js"
import { Profile } from "./Profile.js"


export class Watcher {
  constructor(data) {
    this.id = data.id
    this.albumId = data.albumId
    this.accountId = data.accountId
    // this.profile = new Account(data.profile)
  }
}

export class WatcherProfile extends Watcher {
  constructor(data) {
    super(data)
    this.profile = new Profile(data.profile)
  }
}

export class WatcherAlbum extends Watcher {
  constructor(data) {
    super(data)
    this.album = new Album(data.album)
  }
}
