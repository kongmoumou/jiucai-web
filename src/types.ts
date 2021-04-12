import { App } from 'vue-demi'
import { Router } from 'vue-router'

interface Context {
  isClient: boolean
  router: Router
  app: App
}

export type UserModule = (ctx: Context) => void
