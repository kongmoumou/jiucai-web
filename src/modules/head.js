import { ref } from 'vue-demi'
let currentHead = null

export const install = ({ isClient, router, head }) => {
  if (isClient) {
    router.beforeEach((to) => {
      if (currentHead) {
        head.removeHeadObjs(currentHead)
        head.updateDOM()
      }

      if (to.meta?.head) {
        currentHead = ref(to.meta.head)
        head.addHeadObjs(currentHead)
        head.updateDOM()
      }
    })
  }
}
