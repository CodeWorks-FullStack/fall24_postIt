import { populate } from "dotenv"
import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class WatchersService {

  async getMyWatchers(userId) {
    //----------------------------------------------{accountId: '45684538923489fjkl'}
    const watchers = await dbContext.Watchers.find({ accountId: userId }).populate('album')
    return watchers
  }
  async getWatchersByAlbum(albumId) {
    //----------------------------------------------{albumId: '65464efgd920dsdrgf68'}
    const watchers = await dbContext.Watchers.find({ albumId: albumId }).populate('profile', 'picture name')
    return watchers
  }
  async createWatcher(watcherData) {
    const watcher = await dbContext.Watchers.create(watcherData)
    await watcher.populate('album')
    await watcher.populate('profile', 'picture name')
    return watcher
  }

  async deleteWatcher(watcherId, userId) {
    const watcherToDelete = await dbContext.Watchers.findById(watcherId)
    if (!watcherToDelete) throw Error(`Could not delete, no watcher with id: ${watcherId}`)
    if (userId != watcherToDelete.accountId) throw new Forbidden(`That's my purse i don't know you!`)

    await watcherToDelete.deleteOne()
    return 'You stopped watching'
  }

}

export const watchersService = new WatchersService()
