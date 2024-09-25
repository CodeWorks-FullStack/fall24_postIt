import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { WatcherAlbum, WatcherProfile } from "@/models/Watcher.js"
import { AppState } from "@/AppState.js"



class WatchersService {
  async getAccountWatchedAlbums() {
    const response = await api.get('account/watching')
    logger.log('🛡️👁️📡', response.data)
    const watcherAlbums = response.data.map(watcherData => new WatcherAlbum(watcherData))
    AppState.accountWatchedAlbums = watcherAlbums
  }
  async createWatcher(watcherData) {
    const response = await api.post('api/watchers', watcherData)
    logger.log('✨👁️📡', response.data)
    const createdWatcher = new WatcherProfile(response.data)
    AppState.albumWatcherProfiles.push(createdWatcher)
    AppState.activeAlbum.watcherCount++
  }
  async getAlbumWatchers(albumId) {
    const response = await api.get(`api/albums/${albumId}/watchers`)
    logger.log('👁️📸📡', response.data)
    const albumWatchers = response.data.map(watcherData => new WatcherProfile(watcherData))
    AppState.albumWatcherProfiles = albumWatchers
  }

  async deleteWatcher(watcherId) {
    const repsonse = await api.delete(`api/watchers/${watcherId}`)
    logger.log('💣👁️📡', repsonse.data)
    const indexToDelete = AppState.accountWatchedAlbums.findIndex(watcher => watcher.id == watcherId)
    AppState.accountWatchedAlbums.splice(indexToDelete, 1)
  }

}

export const watchersService = new WatchersService()
