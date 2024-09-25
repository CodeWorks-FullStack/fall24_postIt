import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { watchersService } from "../services/WatchersService.js";



export class WatchersController extends BaseController {
  constructor() {
    super('api/watchers')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createWatcher)
      .delete('/:watcherId', this.deleteWatcher)
  }

  async createWatcher(request, response, next) {
    try {
      const watcherData = request.body
      const userInfo = request.userInfo
      watcherData.accountId = userInfo.id
      const watcher = await watchersService.createWatcher(watcherData)
      response.send(watcher)
    } catch (error) {
      next(error)
    }
  }

  async deleteWatcher(request, response, next) {
    try {
      const watcherId = request.params.watcherId
      const userId = request.userInfo.id
      const message = await watchersService.deleteWatcher(watcherId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}
