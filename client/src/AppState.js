import { reactive } from 'vue'
import { Album } from './models/Album.js'
import { Picture } from './models/Picture.js'
import { WatcherAlbum, WatcherProfile } from './models/Watcher.js'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  /**@type {import('@bcwdev/auth0provider-client').Identity} */
  identity: null,
  /** @type {import('./models/Account.js').Account} user info from the database*/
  account: null,

  /** @type {WatcherAlbum[]} */
  accountWatchedAlbums: [],


  /** @type {Album[]} */
  albums: [],

  /** @type {Album} */
  activeAlbum: null,

  /** @type {Picture[]} */
  albumPictures: [],


  /** @type {WatcherProfile[]} */
  albumWatcherProfiles: []
})

