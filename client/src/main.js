import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import { createApp, onMounted } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import './registerGlobalSocketHandlers'
import { router } from './router'
import { logger } from './utils/Logger.js'

const root = createApp(App)
async function init() {
  root.directive('cool', {
    mounted: () => {
      logger.log('This is cool')
    }
  })
  await registerGlobalComponents(root)
  root
    .use(router)
    .mount('#app')

}
init()
