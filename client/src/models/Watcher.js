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
// NOTE we create two different versions of our watcher, that each include a different possibility
// this way we know which version of the many to many we are looking at

// Sometimes the watcher has the profile populated
export class WatcherProfile extends Watcher {
  constructor(data) {
    super(data)
    this.profile = new Profile(data.profile)
  }
}

// Sometimes the watcher has the album populated
export class WatcherAlbum extends Watcher {
  constructor(data) {
    super(data)
    this.album = new Album(data.album)
  }
}
