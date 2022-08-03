import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@view/HomePage/HomePage.vue'),
  },
  {
    path: '/About',
    component: () => import('@view/AboutPage/AboutPage.vue'),
  },
  {
    path: '/ArticleDetails/:id?',
    name: 'ArticleDetails',
    meta: { title: '详情' },
    component: () => import('@view/ArticleDetails/ArticleDetails.vue'),
  },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
router.beforeEach((to, from) => {
  console.log('to', to)
  console.log('from', from)
  if (to.name === 'ArticleDetails') {
    console.log('是的')
    if (!to.params.id) {
      console.log('奶奶滴不传参数是吧')
      return { name: 'Home' }
    }
  }
})

export default router
