import { createApp } from 'vue-demi'
import 'virtual:windi.css'
// import './styles/main.css'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'layouts-generated'
import { createRouter, createWebHistory } from 'vue-router'
import { createHead } from '@vueuse/head'
import $ from 'jquery'
import App from './App.vue'

import '~/styles/iconfont/iconfont.css'
import '~/styles/base.css'
import '~/styles/common.css'

// eslint-disable-next-line import/order
import { ElSkeleton, ElSkeletonItem } from "element-plus";
import 'element-plus/lib/theme-chalk/el-skeleton.css'
import 'element-plus/lib/theme-chalk/el-skeleton-item.css'

window.layui.config(
  {
    dir: '/vendors/layui/',
  },
)

window.$ = $

const app = createApp(App)

app.config.globalProperties.VITE_OSS_URL = import.meta.env.VITE_OSS_URL ?? ''

const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})
app.use(router)

const head = createHead()
app.use(head)

// Element
app.use(ElSkeleton)
app.use(ElSkeletonItem)

app.mount('#app')

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/[!_]*.[tj]s')).forEach((i) => {
  i.install?.({ isClient: true, router, app, head })
})
